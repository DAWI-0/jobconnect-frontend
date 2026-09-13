import { MessageCircle, User } from "lucide-react";
import { useTranslation } from "react-i18next";

function getOtherUser(conversation, currentUserId, t) {
  const currentId = Number(currentUserId);
  const candidateId = Number(conversation.candidate_user_id);
  const recruiterId = Number(conversation.recruiter_user_id);

  // Current user = Candidate
  // Display Recruiter
  if (candidateId === currentId) {
    return {
      name:
        conversation.recruiter_name ||
        conversation.recruiter_email ||
        t("chat.recruiter"),
      email: conversation.recruiter_email || "",
    };
  }

  // Current user = Recruiter
  // Display Candidate
  if (recruiterId === currentId) {
    return {
      name:
        conversation.candidate_name ||
        conversation.candidate_email ||
        t("chat.candidate"),
      email: conversation.candidate_email || "",
    };
  }

  return {
    name: t("chat.user"),
    email: "",
  };
}

export default function ConversationList({
  conversations,
  selectedConversation,
  onSelect,
  currentUserId,
}) {
  const { t } = useTranslation();

  return (
    <aside
      className="
        h-full
        w-full
        bg-white
        dark:bg-gray-950
        overflow-hidden
      "
    >

      {/* ==================================================
          HEADER
          ================================================== */}

      <div
        className="
          h-[94px]
          px-5
          border-b
          border-gray-200
          dark:border-gray-800
          flex
          items-center
        "
      >
        <div className="flex items-center gap-3">

          {/* Icon */}
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-gradient-to-br
              from-indigo-500
              to-purple-600
              flex
              items-center
              justify-center
              text-white
              shrink-0
            "
          >
            <MessageCircle size={21} />
          </div>

          {/* Title */}
          <div className="min-w-0">

            <h2
              className="
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {t("chat.title")}
            </h2>

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              {t("chat.subtitle")}
            </p>

          </div>

        </div>
      </div>


      {/* ==================================================
          CONVERSATIONS
          ================================================== */}

      <div
        className="
          h-[calc(100%-94px)]
          overflow-y-auto
        "
      >

        {conversations.length === 0 ? (

          /* ----------------------------------------------
             EMPTY
             ---------------------------------------------- */

          <div className="p-8 text-center">

            <MessageCircle
              size={35}
              className="
                mx-auto
                mb-3
                text-gray-400
              "
            />

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              {t("chat.noConversations")}
            </p>

          </div>

        ) : (

          /* ----------------------------------------------
             LIST
             ---------------------------------------------- */

          conversations.map((conversation) => {

            const active =
              selectedConversation?.id ===
              conversation.id;

            const otherUser =
              getOtherUser(
                conversation,
                currentUserId,
                t
              );

            return (

              <button
                key={conversation.id}
                type="button"
                onClick={() =>
                  onSelect(conversation)
                }
                className={`
                  w-full
                  text-left
                  px-5
                  py-4
                  flex
                  items-center
                  gap-3
                  border-b
                  border-gray-100
                  dark:border-gray-900
                  transition-colors
                  duration-150
                  ${
                    active
                      ? "bg-indigo-50 dark:bg-indigo-950/40"
                      : "hover:bg-gray-50 dark:hover:bg-gray-900"
                  }
                `}
              >

                {/* --------------------------------------
                    AVATAR
                    -------------------------------------- */}

                <div
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-gradient-to-br
                    from-indigo-500
                    to-purple-600
                    text-white
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <User size={19} />
                </div>


                {/* --------------------------------------
                    USER INFO
                    -------------------------------------- */}

                <div
                  className="
                    flex-1
                    min-w-0
                  "
                >

                  <p
                    className="
                      font-semibold
                      text-gray-900
                      dark:text-white
                      truncate
                    "
                  >
                    {otherUser.name}
                  </p>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                      truncate
                      mt-0.5
                    "
                  >
                    {otherUser.email}
                  </p>

                </div>

              </button>
            );
          })
        )}

      </div>

    </aside>
  );
}