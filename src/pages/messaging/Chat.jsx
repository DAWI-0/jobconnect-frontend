import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

import api from "../../services/api";
import { createChatSocket } from "../../services/websocket";

import ConversationList from "../../components/chat/ConversationList";
import ChatWindow from "../../components/chat/ChatWindow";
import MessageInput from "../../components/chat/MessageInput";


// ==================================================
// GET CURRENT USER ID
// ==================================================

function getCurrentUserId() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null;
  }

  try {
    const base64Url = token.split(".")[1];

    const base64 = base64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const payload = JSON.parse(atob(base64));

    return Number(payload.user_id);
  } catch {
    return null;
  }
}


// ==================================================
// CHAT
// ==================================================

export default function Chat() {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const targetUserId = searchParams.get("user");

  const currentUserId = getCurrentUserId();

  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] =
    useState(null);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [connecting, setConnecting] = useState(false);

  const socketRef = useRef(null);


  // ==================================================
  // LOAD CONVERSATIONS
  // ==================================================

  useEffect(() => {
    loadConversations();
  }, [targetUserId]);


  const loadConversations = async () => {
    try {
      setLoading(true);

      const response = await api.get("/conversations/");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setConversations(data);


      // ----------------------------------------------
      // OPEN TARGET CONVERSATION
      // ----------------------------------------------

      if (targetUserId) {
        const targetId = Number(targetUserId);

        const existing = data.find(
          (conversation) =>
            Number(conversation.candidate_user_id) === targetId ||
            Number(conversation.recruiter_user_id) === targetId
        );


        if (existing) {
          await selectConversation(existing);
        } else {
          await createConversation(targetId);
        }
      }

    } catch (error) {
      console.error(
        "Erreur chargement conversations:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  // ==================================================
  // CREATE CONVERSATION
  // ==================================================

  const createConversation = async (targetId) => {
    try {
      const response = await api.post(
        "/conversations/",
        {
          target_user_id: targetId,
        }
      );

      const conversation = response.data;


      setConversations((prev) => {
        const exists = prev.some(
          (item) => item.id === conversation.id
        );

        if (exists) {
          return prev;
        }

        return [
          conversation,
          ...prev,
        ];
      });


      await selectConversation(conversation);

    } catch (error) {
      console.error(
        "Erreur création conversation:",
        error
      );
    }
  };


  // ==================================================
  // SELECT CONVERSATION
  // ==================================================

  const selectConversation = async (conversation) => {
    try {

      // Fermer ancien WebSocket
      closeSocket();


      const response = await api.get(
        `/conversations/${conversation.id}/`
      );

      const detail = response.data;


      setSelectedConversation(detail);

      setMessages(
        detail.messages || []
      );


      // Connecter nouveau WebSocket
      connectSocket(detail.id);

    } catch (error) {
      console.error(
        "Erreur ouverture conversation:",
        error
      );
    }
  };


  // ==================================================
  // BACK MOBILE
  // ==================================================

  const handleBackToConversations = () => {

    // Fermer WebSocket
    closeSocket();

    // Vider conversation
    setSelectedConversation(null);

    // Vider messages
    setMessages([]);

    // Reset connexion
    setConnecting(false);
  };


  // ==================================================
  // WEBSOCKET
  // ==================================================

  const connectSocket = (conversationId) => {

    const token =
      localStorage.getItem("access_token");


    if (!token) {
      return;
    }


    try {

      setConnecting(true);


      const socket = createChatSocket(
        conversationId,
        token
      );


      socketRef.current = socket;


      // ----------------------------------------------
      // OPEN
      // ----------------------------------------------

      socket.onopen = () => {

        console.log(
          "WebSocket connecté:",
          conversationId
        );

        setConnecting(false);
      };


      // ----------------------------------------------
      // MESSAGE
      // ----------------------------------------------

      socket.onmessage = (event) => {

        try {

          const data =
            JSON.parse(event.data);


          if (!data.message_id) {
            return;
          }


          const newMessage = {
            id: data.message_id,

            conversation: conversationId,

            sender: Number(
              data.sender_id
            ),

            sender_email:
              data.sender_email,

            sender_name:
              data.sender_name,

            content:
              data.message,

            is_read:
              Number(data.sender_id) ===
              Number(currentUserId),

            created_at:
              data.created_at,
          };


          setMessages((prev) => {

            const exists =
              prev.some(
                (message) =>
                  Number(message.id) ===
                  Number(newMessage.id)
              );


            if (exists) {
              return prev;
            }


            return [
              ...prev,
              newMessage,
            ];
          });


        } catch (error) {

          console.error(
            "Erreur message WebSocket:",
            error
          );
        }
      };


      // ----------------------------------------------
      // ERROR
      // ----------------------------------------------

      socket.onerror = (error) => {

        console.error(
          "WebSocket error:",
          error
        );

        setConnecting(false);
      };


      // ----------------------------------------------
      // CLOSE
      // ----------------------------------------------

      socket.onclose = (event) => {

        console.log(
          "WebSocket fermé:",
          event.code
        );

        setConnecting(false);
      };


    } catch (error) {

      console.error(
        "Erreur connexion WebSocket:",
        error
      );

      setConnecting(false);
    }
  };


  // ==================================================
  // SEND MESSAGE
  // ==================================================

  const sendMessage = (content) => {

    const socket =
      socketRef.current;


    if (!socket) {
      return;
    }


    if (
      socket.readyState !==
      WebSocket.OPEN
    ) {

      console.warn(
        "WebSocket non connecté"
      );

      return;
    }


    socket.send(
      JSON.stringify({
        message: content,
      })
    );
  };


  // ==================================================
  // CLOSE SOCKET
  // ==================================================

  const closeSocket = () => {

    if (socketRef.current) {

      socketRef.current.close();

      socketRef.current = null;
    }
  };


  // ==================================================
  // CLEANUP
  // ==================================================

  useEffect(() => {

    return () => {
      closeSocket();
    };

  }, []);


  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {

    return (
      <div className="min-h-[70vh] flex items-center justify-center">

        <p className="text-gray-500 dark:text-gray-400">
          {t("chat.loading")}
        </p>

      </div>
    );
  }


  // ==================================================
  // UI
  // ==================================================

  return (
    <div
      className="
        h-[calc(100vh-80px)]
        min-h-0
        w-full
        bg-gray-50
        dark:bg-gray-900
        overflow-hidden
      "
    >

      {/* ==================================================
          DESKTOP
          ================================================== */}

      <div
        className="
          hidden
          md:flex
          h-full
          w-full
          gap-0
        "
      >

        {/* ----------------------------------------------
            SIDEBAR
            ---------------------------------------------- */}

        <aside
          className="
            h-full
            w-[320px]
            lg:w-[360px]
            flex-shrink-0
            border-r
            border-gray-200
            dark:border-gray-800
            bg-white
            dark:bg-gray-950
            overflow-hidden
          "
        >

          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelect={selectConversation}
            currentUserId={currentUserId}
          />

        </aside>


        {/* ----------------------------------------------
            CHAT
            ---------------------------------------------- */}

        <main
          className="
            flex-1
            h-full
            min-w-0
            min-h-0
            flex
            flex-col
            overflow-hidden
          "
        >

          <ChatWindow
            conversation={selectedConversation}
            messages={messages}
            currentUserId={currentUserId}
          />


          {selectedConversation && (

            <MessageInput
              onSend={sendMessage}
              disabled={connecting}
            />

          )}

        </main>

      </div>


      {/* ==================================================
          MOBILE
          ================================================== */}

      <div
        className="
          md:hidden
          h-full
          w-full
        "
      >

        {/* ----------------------------------------------
            MOBILE CONVERSATION LIST
            ---------------------------------------------- */}

        {!selectedConversation && (

          <div
            className="
              h-full
              w-full
              overflow-hidden
              bg-white
              dark:bg-gray-950
            "
          >

            <ConversationList
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelect={selectConversation}
              currentUserId={currentUserId}
            />

          </div>

        )}


        {/* ----------------------------------------------
            MOBILE CHAT
            ---------------------------------------------- */}

        {selectedConversation && (

          <div
            className="
              h-full
              w-full
              flex
              flex-col
              min-h-0
              bg-gray-50
              dark:bg-gray-900
            "
          >

            {/* ------------------------------------------
                MOBILE HEADER
                ------------------------------------------ */}

            <header
              className="
                h-14
                flex-shrink-0
                flex
                items-center
                gap-2
                px-2
                bg-white
                dark:bg-gray-950
                border-b
                border-gray-200
                dark:border-gray-800
              "
            >

              {/* BACK */}

              <button
                type="button"
                onClick={
                  handleBackToConversations
                }
                className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  rounded-full
                  text-gray-700
                  dark:text-gray-200
                  hover:bg-gray-100
                  dark:hover:bg-gray-800
                  active:scale-95
                  transition
                  flex-shrink-0
                "
                aria-label="Retour"
              >

                <ArrowLeft
                  size={22}
                />

              </button>


              {/* RECEIVER */}

              <div
                className="
                  flex-1
                  min-w-0
                "
              >

                <p
                  className="
                    text-sm
                    font-semibold
                    text-gray-900
                    dark:text-white
                    truncate
                  "
                >

                  {Number(
                    selectedConversation
                      .candidate_user_id
                  ) ===
                  Number(currentUserId)
                    ? selectedConversation
                        .recruiter_name ||
                      selectedConversation
                        .recruiter_email
                    : selectedConversation
                        .candidate_name ||
                      selectedConversation
                        .candidate_email}

                </p>


                {connecting && (

                  <p
                    className="
                      text-[11px]
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Connexion...
                  </p>

                )}

              </div>

            </header>


            {/* ------------------------------------------
                MESSAGES
                ------------------------------------------ */}

            <div
              className="
                flex-1
                min-h-0
                overflow-hidden
              "
            >

              <ChatWindow
                conversation={selectedConversation}
                messages={messages}
                currentUserId={currentUserId}
                mobile
              />

            </div>


            {/* ------------------------------------------
                INPUT
                ------------------------------------------ */}

            <div
              className="
                flex-shrink-0
                w-full
              "
            >

              <MessageInput
                onSend={sendMessage}
                disabled={connecting}
              />

            </div>

          </div>

        )}

      </div>

    </div>
  );
}
