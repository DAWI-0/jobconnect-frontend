import { MessageCircle, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ChatWindow({
  conversation,
  messages,
  currentUserId,
}) {
  const { t } = useTranslation();

  const messagesEndRef = useRef(null);

  // --------------------------------------------------
  // AUTO SCROLL TO LAST MESSAGE
  // --------------------------------------------------

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  // --------------------------------------------------
  // NO CONVERSATION
  // --------------------------------------------------

  if (!conversation) {
    return (
      <section className="flex-1 min-h-0 hidden md:flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <MessageCircle
            size={50}
            className="mx-auto mb-4 text-gray-400"
          />

          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {t("chat.selectConversation")}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t("chat.selectConversationDescription")}
          </p>
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // GET OTHER USER
  // --------------------------------------------------

  const isCandidate =
    Number(conversation.candidate_user_id) ===
    Number(currentUserId);

  const otherName = isCandidate
    ? conversation.recruiter_name
    : conversation.candidate_name;

  const otherEmail = isCandidate
    ? conversation.recruiter_email
    : conversation.candidate_email;

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <section className="flex-1 flex flex-col min-w-0 min-h-0 bg-gray-50 dark:bg-gray-900">

      {/* HEADER */}
      <header className="shrink-0 h-[72px] px-5 py-4 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">

        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0">
          <User size={20} />
        </div>

        <div className="min-w-0">
          <h2 className="font-semibold text-gray-900 dark:text-white truncate">
            {otherName || otherEmail}
          </h2>

          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {otherEmail}
          </p>
        </div>

      </header>

      {/* MESSAGES */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5">

        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {t("chat.noMessages")}.{" "}
              {t("chat.startConversation")}
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {messages.map((message) => {

              /*
               * IMPORTANT
               *
               * message.sender = ID du user qui a envoyé
               * currentUserId = ID du user actuellement connecté
               *
               * Même message:
               *
               * User 1 connecté:
               *   User 1 -> droite
               *   User 2 -> gauche
               *
               * User 2 connecté:
               *   User 1 -> gauche
               *   User 2 -> droite
               */

              const senderId = Number(
                message.sender_id ?? message.sender
              );

              const userId = Number(currentUserId);

              const mine = senderId === userId;

              return (
                <div
                  key={message.id}
                  className={`flex w-full ${
                    mine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {/* MESSAGE BUBBLE */}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      mine
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md shadow-sm"
                    }`}
                  >

                    {/* CONTENT */}
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>

                    {/* TIME */}
                    <p
                      className={`text-[10px] mt-1 ${
                        mine
                          ? "text-indigo-100"
                          : "text-gray-400"
                      }`}
                    >
                      {message.created_at
                        ? new Date(
                            message.created_at
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </p>

                  </div>

                </div>
              );
            })}

            {/* AUTO SCROLL TARGET */}
            <div ref={messagesEndRef} />

          </div>
        )}

      </div>
    </section>
  );
}
