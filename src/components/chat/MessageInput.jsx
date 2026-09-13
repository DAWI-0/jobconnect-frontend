import { Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MessageInput({
  onSend,
  disabled = false,
}) {
  const { t } = useTranslation();

  const [content, setContent] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const message = content.trim();

    if (!message || disabled) {
      return;
    }

    onSend(message);
    setContent("");
  };

  return (
    <form
      onSubmit={submit}
      className="shrink-0 p-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center gap-3">

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("chat.writeMessage")}
          disabled={disabled}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={disabled || !content.trim()}
          aria-label={t("chat.send")}
          className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
        >
          <Send size={19} />
        </button>

      </div>
    </form>
  );
}