# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

# eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])

```

# index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>jobconnect-frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

# package.json

```json
{
  "name": "jobconnect-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "axios": "^1.19.0",
    "i18next": "^26.4.1",
    "lucide-react": "^1.31.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-i18next": "^17.0.13",
    "react-router-dom": "^7.18.2",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.4",
    "eslint": "^10.8.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "vite": "^8.2.0"
  }
}

```

# public\favicon.svg

This is a file of the type: SVG Image

# public\icons.svg

This is a file of the type: SVG Image

# README.md

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```

# src\App.css

```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}

```

# src\App.jsx

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Layout from "./components/layout/Layout";

import Home from "./pages/home/Home";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Jobs from "./pages/jobs/Jobs";
import JobDetails from "./pages/jobs/JobDetails";
import JobForm from "./pages/jobs/recruiter/JobForm";

import Applications from "./pages/applications/Applications";
import RecruiterApplications from "./pages/applications/RecruiterApplications";

import Favorites from "./pages/favorites/Favorites";

import Profile from "./pages/profile/Profile";

import Chat from "./pages/messaging/Chat";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* =========================
              LAYOUT
          ========================= */}
          <Route element={<Layout />}>

            {/* =========================
                PUBLIC
            ========================= */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />


            {/* =========================
                CANDIDATE
            ========================= */}
            <Route path="/applications" element={<Applications />} />
            <Route path="/favorites" element={<Favorites />} />


            {/* =========================
                PROFILE
            ========================= */}
            <Route path="/profile" element={<Profile />} />


            {/* =========================
                RECRUITER
            ========================= */}

            {/* Liste des jobs */}
            <Route
              path="/recruiter/jobs"
              element={<Jobs />}
            />

            {/* Créer un nouveau job */}
            <Route
              path="/recruiter/jobs/new"
              element={<JobForm />}
            />

            {/* Modifier un job */}
            <Route
              path="/recruiter/jobs/:id/edit"
              element={<JobForm />}
            />

            {/* Applications reçues */}
            <Route
              path="/recruiter/applications"
              element={<RecruiterApplications />}
            />


            {/* =========================
                CHAT
            ========================= */}
            <Route
              path="/chat"
              element={<Chat />}
            />

          </Route>


          {/* =========================
              AUTH
          ========================= */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* =========================
              404
          ========================= */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

# src\assets\404.svg

This is a file of the type: SVG Image

# src\assets\loginregister.svg

This is a file of the type: SVG Image

# src\components\chat\ChatWindow.jsx

```jsx
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

```

# src\components\chat\ConversationList.jsx

```jsx
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
```

# src\components\chat\MessageInput.jsx

```jsx
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
```

# src\components\layout\Layout.jsx

```jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:pb-0">
      
      <Navbar />

      <main className="w-full py-0">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;
```

# src\components\layout\Navbar.jsx

```jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Moon,
  Sun,
  X,
  ChevronDown,
  Heart,
  User,
  LogOut,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef = useRef(null);
  const desktopLangRef = useRef(null);
  const mobileLangRef = useRef(null);
  const profileRef = useRef(null);

  // ============================================================
  // DARK MODE
  // ============================================================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ============================================================
  // LANGUAGE / RTL
  // ============================================================

  useEffect(() => {
    document.documentElement.dir =
      i18n.language === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // ============================================================
  // CLICK OUTSIDE
  // ============================================================

  useEffect(() => {
    function handleClickOutside(e) {
      const isInsideDesktopLanguage =
        desktopLangRef.current?.contains(e.target);

      const isInsideMobileLanguage =
        mobileLangRef.current?.contains(e.target);

      if (!isInsideDesktopLanguage && !isInsideMobileLanguage) {
        setLanguageOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }

      if (
        mobileMenuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [mobileMenuOpen]);

  // ============================================================
  // LANGUAGE
  // ============================================================

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);

    setLanguageOpen(false);
    setMobileMenuOpen(false);
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  // ============================================================
  // LANGUAGE DISPLAY
  // ============================================================

  const currentLanguage = i18n.language?.startsWith("ar")
    ? "AR"
    : i18n.language?.startsWith("en")
      ? "EN"
      : "FR";

  // ============================================================
  // ACTIVE LINK
  // ============================================================

  const isActive = (path) => {
    if (path === "/jobs") {
      return (
        location.pathname === "/jobs" ||
        location.pathname.startsWith("/jobs/")
      );
    }

    return location.pathname === path;
  };

  // ============================================================
  // DESKTOP LINK STYLE
  // ============================================================

  const navLinkClass = (path) =>
    `text-sm font-medium transition ${
      isActive(path)
        ? "text-primary"
        : "text-slate-600 hover:text-primary dark:text-slate-300"
    }`;

  // ============================================================
  // ROLE
  // ============================================================

  const formatRole = (role) => {
    if (!role) return "";

    return (
      role.charAt(0) +
      role.slice(1).toLowerCase()
    );
  };

  // ============================================================
  // USER NAME
  // ============================================================

  const firstName = user?.first_name || "";
  const lastName = user?.last_name || "";

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    user?.username ||
    "User";

  // ============================================================
  // INITIALS
  // ============================================================

  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`
        .toUpperCase();
    }

    if (firstName) {
      return firstName.substring(0, 2).toUpperCase();
    }

    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }

    return "U";
  };

  // ============================================================
  // PROFILE IMAGE
  // ============================================================

  const rawProfileImage =
    user?.profile_picture ||
    user?.avatar ||
    user?.photo ||
    user?.profile?.profile_picture ||
    user?.profile?.avatar ||
    null;

  const getProfileImageUrl = (image) => {
    if (!image) return null;

    // Django already returned a complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Django returned something like:
    // /media/profile_pictures/photo.jpg
    return `${API_BASE_URL}${
      image.startsWith("/") ? image : `/${image}`
    }`;
  };

  const profileImage = getProfileImageUrl(rawProfileImage);

  // ============================================================
  // ROLE CHECKS
  // ============================================================

  const isCandidate = user?.role === "CANDIDATE";
  const isRecruiter = user?.role === "RECRUITER";
  const isAdmin = user?.role === "ADMIN";

  // ============================================================
  // MOBILE BOTTOM NAV ITEMS
  // ============================================================

  const getMobileNavItems = () => {
    if (!user) {
      return [
        {
          to: "/jobs",
          icon: BriefcaseBusiness,
          label: t("nav.jobs"),
        },
        {
          to: "/login",
          icon: User,
          label: t("nav.login"),
        },
        {
          to: "/register",
          icon: LogOut,
          label: t("nav.register"),
        },
      ];
    }

    if (isCandidate) {
      return [
        {
          to: "/jobs",
          icon: BriefcaseBusiness,
          label: t("nav.jobs"),
        },
        {
          to: "/applications",
          icon: FileText,
          label: t("nav.applications"),
        },
        {
          to: "/favorites",
          icon: Heart,
          label: t("nav.favorites"),
        },
        {
          to: "/chat",
          icon: MessageCircle,
          label: t("nav.chat"),
        },
        {
          to: "/profile",
          icon: User,
          label: t("nav.profile"),
        },
      ];
    }

    if (isRecruiter) {
      return [
        {
          to: "/recruiter/jobs",
          icon: BriefcaseBusiness,
          label: t("nav.myJobs"),
        },
        {
          to: "/recruiter/applications",
          icon: FileText,
          label: t("nav.candidateApplications"),
        },
        {
          to: "/chat",
          icon: MessageCircle,
          label: t("nav.chat"),
        },
        {
          to: "/profile",
          icon: User,
          label: t("nav.profile"),
        },
      ];
    }

    if (isAdmin) {
      return [
        {
          to: "/admin",
          icon: LayoutDashboard,
          label: t("nav.dashboard"),
        },
        {
          to: "/jobs",
          icon: BriefcaseBusiness,
          label: t("nav.jobs"),
        },
        {
          to: "/admin/applications",
          icon: FileText,
          label: t("nav.candidateApplications"),
        },
        {
          to: "/profile",
          icon: User,
          label: t("nav.profile"),
        },
      ];
    }

    return [];
  };

  const mobileNavItems = getMobileNavItems();

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      {/* ========================================================
          TOP NAVIGATION
      ======================================================== */}

      <nav
        ref={navRef}
        className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-bold tracking-tight"
          >
            <span className="text-primary">Job</span>
            <span className="text-secondary">Connect</span>
          </Link>

          {/* ====================================================
              DESKTOP NAVBAR
          ==================================================== */}

          <div className="hidden items-center gap-5 md:flex">

            {/* PUBLIC */}

            {!user && (
              <Link
                to="/"
                className={navLinkClass("/")}
              >
                {t("nav.home")}
              </Link>
            )}

            {/* CANDIDATE */}

            {isCandidate && (
              <>
                <Link
                  to="/jobs"
                  className={navLinkClass("/jobs")}
                >
                  {t("nav.jobs")}
                </Link>

                <Link
                  to="/applications"
                  className={navLinkClass("/applications")}
                >
                  {t("nav.applications")}
                </Link>

                <Link
                  to="/favorites"
                  className={`relative flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                    isActive("/favorites")
                      ? "border-red-200 bg-red-50 text-red-500 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                      : "border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-500/20 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                  }`}
                  title={t("nav.favorites")}
                >
                  <Heart
                    size={19}
                    className={
                      isActive("/favorites")
                        ? "fill-current"
                        : ""
                    }
                  />
                </Link>

                <Link
                  to="/chat"
                  className={navLinkClass("/chat")}
                >
                  <span className="flex items-center gap-1.5">
                    <MessageCircle size={17} />
                    {t("nav.chat")}
                  </span>
                </Link>
              </>
            )}

            {/* RECRUITER */}

            {isRecruiter && (
              <>
                <Link
                  to="/recruiter/jobs"
                  className={navLinkClass("/recruiter/jobs")}
                >
                  <span className="flex items-center gap-1.5">
                    <BriefcaseBusiness size={17} />
                    {t("nav.myJobs")}
                  </span>
                </Link>

                <Link
                  to="/recruiter/applications"
                  className={navLinkClass(
                    "/recruiter/applications"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <FileText size={17} />
                    {t("nav.candidateApplications")}
                  </span>
                </Link>

                <Link
                  to="/chat"
                  className={navLinkClass("/chat")}
                >
                  <span className="flex items-center gap-1.5">
                    <MessageCircle size={17} />
                    {t("nav.chat")}
                  </span>
                </Link>
              </>
            )}

            {/* ADMIN */}

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className={navLinkClass("/admin")}
                >
                  <span className="flex items-center gap-1.5">
                    <LayoutDashboard size={17} />
                    {t("nav.dashboard")}
                  </span>
                </Link>

                <Link
                  to="/jobs"
                  className={navLinkClass("/jobs")}
                >
                  {t("nav.jobs")}
                </Link>

                <Link
                  to="/admin/applications"
                  className={navLinkClass(
                    "/admin/applications"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <FileText size={17} />
                    {t("nav.candidateApplications")}
                  </span>
                </Link>
              </>
            )}

            {/* ==================================================
                AUTH
            ================================================== */}

            {user ? (
              <div className="flex items-center gap-3">

                <div
                  className="relative"
                  ref={profileRef}
                >
                  <button
                    onClick={() => {
                      setProfileOpen(!profileOpen);
                      setLanguageOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition hover:border-primary/30 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-primary/30 dark:hover:bg-slate-800"
                  >

                    {/* PROFILE IMAGE */}

                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={fullName}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-500/20"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white ring-2 ring-indigo-100 dark:ring-indigo-500/20">
                        {getInitials()}
                      </div>
                    )}

                    <div className="hidden text-start lg:block">
                      <p className="max-w-28 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {fullName}
                      </p>

                      <p className="text-xs text-primary">
                        {formatRole(user.role)}
                      </p>
                    </div>

                    <ChevronDown
                      size={15}
                      className={`text-slate-400 transition-transform ${
                        profileOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {/* PROFILE DROPDOWN */}

                  {profileOpen && (
                    <div className="absolute end-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">

                      <div className="mb-1 flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-3 dark:bg-slate-800">

                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt={fullName}
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                            {getInitials()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                            {fullName}
                          </p>

                          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary"
                      >
                        <User size={17} />
                        {t("nav.profile")}
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                      >
                        <LogOut size={17} />
                        {t("nav.logout")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">

                <Link
                  to="/login"
                  className={navLinkClass("/login")}
                >
                  {t("nav.login")}
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                  {t("nav.register")}
                </Link>
              </div>
            )}

            {/* ==================================================
                LANGUAGE
            ================================================== */}

            <div
              className="relative"
              ref={desktopLangRef}
            >
              <button
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                  setProfileOpen(false);
                }}
                className="flex h-10 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
              >
                {currentLanguage}

                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    languageOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {languageOpen && (
                <div className="absolute end-0 mt-2 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">

                  <button
                    onClick={() =>
                      changeLanguage("fr")
                    }
                    className="w-full rounded-md px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Français
                  </button>

                  <button
                    onClick={() =>
                      changeLanguage("en")
                    }
                    className="w-full rounded-md px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    English
                  </button>

                  <button
                    onClick={() =>
                      changeLanguage("ar")
                    }
                    className="w-full rounded-md px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>

            {/* ==================================================
                DARK MODE
            ================================================== */}

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              aria-label={
                darkMode
                  ? "Light mode"
                  : "Dark mode"
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
            >
              {darkMode ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>
          </div>

          {/* ====================================================
              MOBILE HEADER
          ==================================================== */}

          <div className="flex items-center gap-2 md:hidden">

            {/* DARK MODE */}

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              {darkMode ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}
            </button>

            {/* LANGUAGE */}

            <div
              className="relative"
              ref={mobileLangRef}
            >
              <button
                onClick={() =>
                  setLanguageOpen(!languageOpen)
                }
                className="flex h-9 items-center rounded-lg border border-slate-200 px-2.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-300"
              >
                {currentLanguage}
              </button>

              {languageOpen && (
                <div className="absolute end-0 mt-2 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">

                  <button
                    onClick={() =>
                      changeLanguage("fr")
                    }
                    className="w-full rounded-md px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Français
                  </button>

                  <button
                    onClick={() =>
                      changeLanguage("en")
                    }
                    className="w-full rounded-md px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    English
                  </button>

                  <button
                    onClick={() =>
                      changeLanguage("ar")
                    }
                    className="w-full rounded-md px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>

            {/* MOBILE PROFILE */}

            {user && (
              <Link
                to="/profile"
                onClick={() =>
                  setProfileOpen(false)
                }
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={fullName}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-500/20"
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white ring-2 ring-indigo-100 dark:ring-indigo-500/20">
                    {getInitials()}
                  </div>
                )}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ========================================================
          MOBILE BOTTOM NAVIGATION
      ======================================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 md:hidden">

        <div className="flex h-16 items-center justify-around">

          {mobileNavItems.map((item) => {
            const active = isActive(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => {
                  setLanguageOpen(false);
                  setProfileOpen(false);
                  setMobileMenuOpen(false);
                }}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition ${
                  active
                    ? "text-primary"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                <item.icon
                  size={22}
                  className={
                    item.to === "/favorites" &&
                    active
                      ? "fill-current"
                      : ""
                  }
                />

                <span className="text-[10px] font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
```

# src\context\AuthContext.jsx

```jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) fetchUser();
    else setLoading(false);
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/accounts/users/me/");
      setUser(res.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const res = await api.post("/accounts/login/", credentials);
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    await fetchUser();
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

# src\i18n\config.js

```js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translations";

const savedLanguage = localStorage.getItem("language") || "fr";

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: savedLanguage,
    fallbackLng: "fr",

    interpolation: {
      escapeValue: false,
    },
  });
i18n.on("languageChanged", (language) => {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
});
export default i18n;
```

# src\i18n\translations.js

```js
const resources = {
  // =========================================================
  // 🇫🇷 FRANÇAIS
  // =========================================================
  fr: {
    translation: {
      // -------------------------
      // NAVBAR
      // -------------------------
      nav: {
        home: "Accueil",
        jobs: "Offres",
        applications: "Mes candidatures",
        myJobs: "Mes offres",
        candidateApplications: "Candidatures",
        dashboard: "Tableau de bord",
        chat: "Messages",
        login: "Connexion",
        register: "Inscription",
        logout: "Déconnexion",
        favorites: "Favoris",
        profile: "Profil",
      },

      // -------------------------
      // JOBS
      // -------------------------
      jobs: {
        badge: "TROUVEZ VOTRE PROCHAINE OPPORTUNITÉ",

        title: "Offres d'emploi",
        subtitle: "Trouvez l'opportunité qui vous correspond",

        searchTitle: "Rechercher une offre",
        searchSubtitle:
          "Utilisez les filtres pour trouver l'emploi idéal",

        search: "Rechercher",
        searchPlaceholder: "Poste, compétence ou mot-clé",

        location: "Localisation",
        locationPlaceholder: "Ville ou région",

        filters: {
          contract: "Type de contrat",
          experience: "Niveau d'expérience",
          workMode: "Mode de travail",
        },

        filter: "Filtrer",
        reset: "Réinitialiser",
        clearFilters: "Effacer les filtres",
        all: "Toutes",

        contracts: {
          cdi: "CDI",
          cdd: "CDD",
          internship: "Stage",
          freelance: "Freelance",
          partTime: "Temps partiel",
        },

        experience: {
          entry: "Débutant",
          junior: "Junior",
          mid: "Intermédiaire",
          senior: "Senior",
        },

        remote: "Télétravail",
        onsite: "Sur site",
        hybrid: "Hybride",

        salary: "Salaire",
        company: "Entreprise",
        posted: "Publié le",

        results: "Résultats",
        offers: "offres",
        total: "Total des offres",

        viewDetails: "Voir les détails",

        noJobs: "Aucune offre trouvée",
        noJobsDescription:
          "Aucune offre ne correspond à vos critères de recherche.",

        noResults: "Aucune offre trouvée",
        noResultsDescription:
          "Aucune offre ne correspond à vos critères de recherche.",

        previous: "Précédent",
        next: "Suivant",

        loading: "Chargement des offres...",
        error: "Impossible de charger les offres.",
        retry: "Réessayer",

        locationNotSpecified: "Localisation non spécifiée",

        fullTime: "Temps plein",
        permanent: "CDI",
        fixedTerm: "CDD",
      },

      // -------------------------
      // APPLICATIONS
      // -------------------------
      applications: {
        title: "Mes candidatures",
        applications: "candidatures",
        application: "candidature",

        error: "Impossible de charger vos candidatures.",

        empty: "Aucune candidature",

        emptyDescription:
          "Vous n'avez pas encore postulé à une offre. Consultez les offres disponibles et trouvez votre prochaine opportunité.",

        browseJobs: "Parcourir les offres",

        offer: "Offre",
        location: "Lieu",
        locationNotSpecified: "Non précisé",
        contract: "Type de contrat",
        appliedAt: "Date de candidature",
        viewOffer: "Voir l'offre",

        statuses: {
          PENDING: "En attente",
          REVIEWING: "En cours d'examen",
          SHORTLISTED: "Présélectionné",
          INTERVIEW: "Entretien",
          ACCEPTED: "Accepté",
          REJECTED: "Refusé",
          WITHDRAWN: "Retirée",
        },
      },

      // -------------------------
      // FAVORITES
      // -------------------------
      favorites: {
        title: "Mes favoris",

        loading: "Chargement de vos favoris...",

        error: "Impossible de charger vos favoris.",

        empty: "Aucune offre favorite",

        emptyDescription:
          "Ajoutez des offres à vos favoris pour les retrouver facilement ici.",

        browseJobs: "Parcourir les offres",

        offer: "offre",
        company: "Entreprise",
        location: "Localisation",

        locationNotSpecified: "Non spécifiée",

        remove: "Retirer",

        removeError:
          "Impossible de retirer cette offre des favoris.",

        viewOffer: "Voir l'offre",

        job: "Emploi",
      },

      // -------------------------
      // JOB DETAILS
      // -------------------------
      jobDetails: {
        backToJobs: "Retour aux offres",

        notFoundTitle: "Offre introuvable",

        notFound:
          "Cette offre n'existe pas ou a été supprimée.",

        description: "Description du poste",

        noDescription:
          "Aucune description disponible.",

        skills: "Compétences recherchées",

        skillsSubtitle:
          "Les compétences nécessaires pour ce poste",

        information: "Informations",

        location: "Localisation",

        contract: "Type de contrat",

        workMode: "Mode de travail",

        experience: "Expérience",

        company: "Entreprise",

        moreJobs:
          "Plus d'offres de cette entreprise",

        interested:
          "Cette offre vous intéresse ?",

        applyTitle: "Postulez maintenant",

        applySubtitle:
          "Envoyez votre candidature et donnez un nouvel élan à votre carrière.",

        deadline: "Date limite",

        apply: "Postuler",

        sending: "Envoi...",

        alreadyApplied:
          "Vous avez déjà postulé",

        applySuccess:
          "Votre candidature a été envoyée avec succès.",

        applyError:
          "Impossible d'envoyer votre candidature.",

        favoriteError:
          "Impossible de modifier les favoris.",

        addFavorite:
          "Ajouter aux favoris",

        removeFavorite:
          "Retirer des favoris",

        loginToApply:
          "Connectez-vous pour postuler",

        loginHint:
          "Vous devez être connecté en tant que candidat pour postuler.",
      },

      // -------------------------
      // HOME
      // -------------------------
      home: {
        badge:
          "TROUVEZ VOTRE PROCHAINE OPPORTUNITÉ",

        heroTitle:
          "Trouvez le job qui correspond à",

        heroHighlight:
          "votre avenir",

        heroSubtitle:
          "Découvrez des opportunités professionnelles, postulez facilement et suivez toutes vos candidatures au même endroit.",

        viewJobs:
          "Voir les offres",

        createAccount:
          "Créer un compte",

        featuredOffer:
          "OFFRE À LA UNE",

        salary:
          "Salaire",

        open:
          "Ouvert",

        applicationSent:
          "Candidature envoyée",

        applicationStatus:
          "En cours d'examen",

        searchPlaceholder:
          "Poste, compétence ou mot-clé",

        locationPlaceholder:
          "Ville ou localisation",

        search:
          "Rechercher",

        jobsAvailable:
          "Offres disponibles",

        companies:
          "Entreprises",

        candidates:
          "Candidats",

        applications:
          "Candidatures",

        simpleProcess:
          "PROCESSUS SIMPLE",

        howTitle:
          "Trouvez votre emploi en quelques étapes",

        howSubtitle:
          "JobConnect simplifie votre recherche d'emploi et vous permet de gérer vos candidatures facilement.",

        step1Title:
          "Créez votre profil",

        step1Description:
          "Créez votre profil professionnel et mettez en valeur vos compétences.",

        step2Title:
          "Trouvez une offre",

        step2Description:
          "Recherchez les opportunités qui correspondent à votre profil.",

        step3Title:
          "Postulez",

        step3Description:
          "Envoyez votre candidature rapidement et simplement.",

        step4Title:
          "Suivez votre candidature",

        step4Description:
          "Suivez l'évolution de vos candidatures depuis votre espace personnel.",

        ctaTitle:
          "Prêt à trouver votre prochaine opportunité ?",

        ctaSubtitle:
          "Rejoignez JobConnect et donnez un nouvel élan à votre carrière.",
      },

      // -------------------------
      // PROFILE
      // -------------------------
      profile: {
        title: "Mon profil",
        edit: "Modifier le profil",

        saveSuccess:
          "Profil mis à jour avec succès.",

        saveError:
          "Erreur lors de la sauvegarde.",

        loadError:
          "Erreur de chargement du profil.",

        notFound:
          "Profil non trouvé.",

        phone:
          "Téléphone",

        location:
          "Localisation",

        bio:
          "Bio",

        linkedin:
          "LinkedIn",

        github:
          "GitHub",

        cv:
          "CV",

        photo:
          "Photo de profil",

        jobTitle:
          "Poste",

        company:
          "Entreprise",

        professionalInfo:
          "Informations professionnelles",

        accountType:
          "Type de compte",

        candidate:
          "Candidat",

        recruiter:
          "Recruteur",

        viewCv:
          "Voir le CV",

        uploadCv:
          "Télécharger un CV",

        changePhoto:
          "Changer la photo",

        uploadPhoto:
          "Ajouter une photo",

        noBio:
          "Aucune biographie renseignée.",

        noLocation:
          "Localisation non renseignée",

        noPhone:
          "Téléphone non renseigné",

        noLinkedin:
          "LinkedIn non renseigné",

        noGithub:
          "GitHub non renseigné",
      },

      // -------------------------
      // COMMON
      // -------------------------
      common: {
        loading:
          "Chargement...",

        save:
          "Enregistrer",

        saving:
          "Sauvegarde...",

        cancel:
          "Annuler",

        edit:
          "Modifier",

        delete:
          "Supprimer",

        close:
          "Fermer",

        back:
          "Retour",

        confirm:
          "Confirmer",

        yes:
          "Oui",

        no:
          "Non",
      },

      // -------------------------
      // CHAT
      // -------------------------
      chat: {
        title:
          "Messages",

        subtitle:
          "Vos conversations",

        user:
          "Utilisateur",

        noConversations:
          "Aucune conversation",

        selectConversation:
          "Sélectionnez une conversation",

        selectConversationDescription:
          "Choisissez une conversation pour commencer.",

        startConversation:
          "Commencez une conversation avec cette personne.",

        writeMessage:
          "Écrire un message...",

        send:
          "Envoyer",

        loading:
          "Chargement des conversations...",

        loadingMessages:
          "Chargement des messages...",

        connecting:
          "Connexion...",

        connected:
          "En ligne",

        disconnected:
          "Hors ligne",

        candidate:
          "Candidat",

        recruiter:
          "Recruteur",

        noMessages:
          "Aucun message",

        startChat:
          "Commencer la conversation",

        today:
          "Aujourd'hui",

        yesterday:
          "Hier",

        unread:
          "non lu",

        unreadMessages:
          "messages non lus",

        conversationCreated:
          "Conversation créée avec succès.",

        conversationError:
          "Impossible de créer la conversation.",

        loadError:
          "Impossible de charger les conversations.",

        messageError:
          "Impossible d'envoyer le message.",

        contactRecruiter:
          "Contacter le recruteur",

        contactCandidate:
          "Contacter le candidat",
      },
    },
  },

  // =========================================================
  // 🇬🇧 ENGLISH
  // =========================================================
  en: {
    translation: {
      // -------------------------
      // NAVBAR
      // -------------------------
      nav: {
        home: "Home",
        jobs: "Jobs",
        applications: "My applications",
        myJobs: "My jobs",
        candidateApplications: "Applications",
        dashboard: "Dashboard",
        chat: "Messages",
        login: "Login",
        register: "Register",
        logout: "Logout",
        favorites: "Favorites",
        profile: "Profile",
      },

      // -------------------------
      // JOBS
      // -------------------------
      jobs: {
        badge: "FIND YOUR NEXT OPPORTUNITY",

        title: "Job Offers",

        subtitle:
          "Find the opportunity that matches you",

        searchTitle:
          "Search for a job",

        searchSubtitle:
          "Use the filters to find the perfect job",

        search:
          "Search",

        searchPlaceholder:
          "Job title, skill, or keyword",

        location:
          "Location",

        locationPlaceholder:
          "City or region",

        filters: {
          contract:
            "Contract type",

          experience:
            "Experience level",

          workMode:
            "Work mode",
        },

        filter:
          "Filter",

        reset:
          "Reset",

        clearFilters:
          "Clear filters",

        all:
          "All",

        contracts: {
          cdi:
            "Permanent",

          cdd:
            "Fixed-term",

          internship:
            "Internship",

          freelance:
            "Freelance",

          partTime:
            "Part-time",
        },

        experience: {
          entry:
            "Entry level",

          junior:
            "Junior",

          mid:
            "Mid-level",

          senior:
            "Senior",
        },

        remote:
          "Remote",

        onsite:
          "On-site",

        hybrid:
          "Hybrid",

        salary:
          "Salary",

        company:
          "Company",

        posted:
          "Posted on",

        results:
          "Results",

        offers:
          "jobs",

        total:
          "Total offers",

        viewDetails:
          "View details",

        noJobs:
          "No jobs found",

        noJobsDescription:
          "No jobs match your search criteria.",

        noResults:
          "No jobs found",

        noResultsDescription:
          "No jobs match your search criteria.",

        previous:
          "Previous",

        next:
          "Next",

        loading:
          "Loading jobs...",

        error:
          "Unable to load jobs.",

        retry:
          "Retry",

        locationNotSpecified:
          "Location not specified",

        fullTime:
          "Full-time",

        permanent:
          "Permanent",

        fixedTerm:
          "Fixed-term",
      },

      // -------------------------
      // APPLICATIONS
      // -------------------------
      applications: {
        title:
          "My Applications",

        applications:
          "applications",

        application:
          "application",

        error:
          "Unable to load your applications.",

        empty:
          "No applications",

        emptyDescription:
          "You haven't applied to any jobs yet. Browse the available opportunities and find your next career move.",

        browseJobs:
          "Browse Jobs",

        offer:
          "Job Offer",

        location:
          "Location",

        locationNotSpecified:
          "Not specified",

        contract:
          "Contract Type",

        appliedAt:
          "Applied On",

        viewOffer:
          "View Job",

        statuses: {
          PENDING:
            "Pending",

          REVIEWING:
            "Under Review",

          SHORTLISTED:
            "Shortlisted",

          INTERVIEW:
            "Interview",

          ACCEPTED:
            "Accepted",

          REJECTED:
            "Rejected",

          WITHDRAWN:
            "Withdrawn",
        },
      },

      // -------------------------
      // FAVORITES
      // -------------------------
      favorites: {
        title:
          "My Favorites",

        loading:
          "Loading your favorites...",

        error:
          "Unable to load your favorites.",

        empty:
          "No favorite jobs",

        emptyDescription:
          "Add jobs to your favorites to easily find them here.",

        browseJobs:
          "Browse jobs",

        offer:
          "job",

        company:
          "Company",

        location:
          "Location",

        locationNotSpecified:
          "Not specified",

        remove:
          "Remove",

        removeError:
          "Unable to remove this job from favorites.",

        viewOffer:
          "View job",

        job:
          "Job",
      },

      // -------------------------
      // JOB DETAILS
      // -------------------------
      jobDetails: {
        backToJobs:
          "Back to jobs",

        notFoundTitle:
          "Job not found",

        notFound:
          "This job does not exist or has been removed.",

        description:
          "Job description",

        noDescription:
          "No description available.",

        skills:
          "Required skills",

        skillsSubtitle:
          "Skills required for this position",

        information:
          "Information",

        location:
          "Location",

        contract:
          "Contract type",

        workMode:
          "Work mode",

        experience:
          "Experience",

        company:
          "Company",

        moreJobs:
          "More jobs from this company",

        interested:
          "Interested in this job?",

        applyTitle:
          "Apply now",

        applySubtitle:
          "Submit your application and take the next step in your career.",

        deadline:
          "Application deadline",

        apply:
          "Apply",

        sending:
          "Sending...",

        alreadyApplied:
          "You already applied",

        applySuccess:
          "Your application has been submitted successfully.",

        applyError:
          "Unable to submit your application.",

        favoriteError:
          "Unable to update favorites.",

        addFavorite:
          "Add to favorites",

        removeFavorite:
          "Remove from favorites",

        loginToApply:
          "Login to apply",

        loginHint:
          "You must be logged in as a candidate to apply.",
      },

      // -------------------------
      // HOME
      // -------------------------
      home: {
        badge:
          "FIND YOUR NEXT OPPORTUNITY",

        heroTitle:
          "Find the job that matches",

        heroHighlight:
          "your future",

        heroSubtitle:
          "Discover professional opportunities, apply easily, and track all your applications in one place.",

        viewJobs:
          "View job offers",

        createAccount:
          "Create an account",

        featuredOffer:
          "FEATURED OFFER",

        salary:
          "Salary",

        open:
          "Open",

        applicationSent:
          "Application sent",

        applicationStatus:
          "Under review",

        searchPlaceholder:
          "Job title, skill, or keyword",

        locationPlaceholder:
          "City or location",

        search:
          "Search",

        jobsAvailable:
          "Available jobs",

        companies:
          "Companies",

        candidates:
          "Candidates",

        applications:
          "Applications",

        simpleProcess:
          "SIMPLE PROCESS",

        howTitle:
          "Find your job in a few steps",

        howSubtitle:
          "JobConnect simplifies your job search and allows you to manage your applications easily.",

        step1Title:
          "Create your profile",

        step1Description:
          "Create your professional profile and highlight your skills.",

        step2Title:
          "Find a job",

        step2Description:
          "Search for opportunities that match your profile.",

        step3Title:
          "Apply",

        step3Description:
          "Submit your application quickly and easily.",

        step4Title:
          "Track your application",

        step4Description:
          "Track your applications from your personal space.",

        ctaTitle:
          "Ready to find your next opportunity?",

        ctaSubtitle:
          "Join JobConnect and take the next step in your career.",
      },

      // -------------------------
      // PROFILE
      // -------------------------
      profile: {
        title:
          "My Profile",

        edit:
          "Edit Profile",

        saveSuccess:
          "Profile updated successfully.",

        saveError:
          "Error saving profile.",

        loadError:
          "Error loading profile.",

        notFound:
          "Profile not found.",

        phone:
          "Phone",

        location:
          "Location",

        bio:
          "Bio",

        linkedin:
          "LinkedIn",

        github:
          "GitHub",

        cv:
          "CV",

        photo:
          "Profile Picture",

        jobTitle:
          "Job Title",

        company:
          "Company",

        professionalInfo:
          "Professional Information",

        accountType:
          "Account Type",

        candidate:
          "Candidate",

        recruiter:
          "Recruiter",

        viewCv:
          "View CV",

        uploadCv:
          "Upload CV",

        changePhoto:
          "Change photo",

        uploadPhoto:
          "Add photo",

        noBio:
          "No biography provided.",

        noLocation:
          "Location not provided",

        noPhone:
          "Phone not provided",

        noLinkedin:
          "LinkedIn not provided",

        noGithub:
          "GitHub not provided",
      },

      // -------------------------
      // COMMON
      // -------------------------
      common: {
        loading:
          "Loading...",

        save:
          "Save",

        saving:
          "Saving...",

        cancel:
          "Cancel",

        edit:
          "Edit",

        delete:
          "Delete",

        close:
          "Close",

        back:
          "Back",

        confirm:
          "Confirm",

        yes:
          "Yes",

        no:
          "No",
      },

      // -------------------------
      // CHAT
      // -------------------------
      chat: {
        title:
          "Messages",

        subtitle:
          "Your conversations",

        user:
          "User",

        noConversations:
          "No conversations",

        selectConversation:
          "Select a conversation",

        selectConversationDescription:
          "Choose a conversation to get started.",

        startConversation:
          "Start a conversation with this person.",

        writeMessage:
          "Write a message...",

        send:
          "Send",

        loading:
          "Loading conversations...",

        loadingMessages:
          "Loading messages...",

        connecting:
          "Connecting...",

        connected:
          "Online",

        disconnected:
          "Offline",

        candidate:
          "Candidate",

        recruiter:
          "Recruiter",

        noMessages:
          "No messages",

        startChat:
          "Start conversation",

        today:
          "Today",

        yesterday:
          "Yesterday",

        unread:
          "unread",

        unreadMessages:
          "unread messages",

        conversationCreated:
          "Conversation created successfully.",

        conversationError:
          "Unable to create the conversation.",

        loadError:
          "Unable to load conversations.",

        messageError:
          "Unable to send the message.",

        contactRecruiter:
          "Contact recruiter",

        contactCandidate:
          "Contact candidate",
      },
    },
  },

  // =========================================================
  // 🇲🇦 ARABE
  // =========================================================
  ar: {
    translation: {
      // -------------------------
      // NAVBAR
      // -------------------------
      nav: {
        home: "الرئيسية",
        jobs: "الوظائف",
        applications: "طلباتي",
        myJobs: "عروضي",
        candidateApplications: "طلبات التوظيف",
        dashboard: "لوحة التحكم",
        chat: "الرسائل",
        login: "تسجيل الدخول",
        register: "إنشاء حساب",
        logout: "تسجيل الخروج",
        favorites: "المفضلة",
        profile: "الملف الشخصي",
      },

      // -------------------------
      // JOBS
      // -------------------------
      jobs: {
        badge:
          "اعثر على فرصتك التالية",

        title:
          "عروض العمل",

        subtitle:
          "اعثر على الفرصة التي تناسبك",

        searchTitle:
          "البحث عن وظيفة",

        searchSubtitle:
          "استخدم الفلاتر للعثور على الوظيفة المناسبة",

        search:
          "بحث",

        searchPlaceholder:
          "المسمى الوظيفي، المهارة أو الكلمة المفتاحية",

        location:
          "الموقع",

        locationPlaceholder:
          "المدينة أو المنطقة",

        filters: {
          contract:
            "نوع العقد",

          experience:
            "مستوى الخبرة",

          workMode:
            "طريقة العمل",
        },

        filter:
          "تصفية",

        reset:
          "إعادة تعيين",

        clearFilters:
          "مسح الفلاتر",

        all:
          "الكل",

        contracts: {
          cdi:
            "عقد دائم",

          cdd:
            "عقد محدد المدة",

          internship:
            "تدريب",

          freelance:
            "عمل حر",

          partTime:
            "دوام جزئي",
        },

        experience: {
          entry:
            "مبتدئ",

          junior:
            "مستوى مبتدئ",

          mid:
            "مستوى متوسط",

          senior:
            "مستوى متقدم",
        },

        remote:
          "عن بعد",

        onsite:
          "في مقر الشركة",

        hybrid:
          "مختلط",

        salary:
          "الراتب",

        company:
          "الشركة",

        posted:
          "نشر في",

        results:
          "النتائج",

        offers:
          "وظائف",

        total:
          "إجمالي عدد الوظائف",

        viewDetails:
          "عرض التفاصيل",

        noJobs:
          "لم يتم العثور على وظائف",

        noJobsDescription:
          "لا توجد عروض عمل تطابق معايير البحث الخاصة بك.",

        noResults:
          "لم يتم العثور على وظائف",

        noResultsDescription:
          "لا توجد وظائف تطابق معايير البحث الخاصة بك.",

        previous:
          "السابق",

        next:
          "التالي",

        loading:
          "جاري تحميل الوظائف...",

        error:
          "تعذر تحميل الوظائف.",

        retry:
          "إعادة المحاولة",

        locationNotSpecified:
          "الموقع غير محدد",

        fullTime:
          "دوام كامل",

        permanent:
          "عقد دائم",

        fixedTerm:
          "عقد محدد المدة",
      },

      // -------------------------
      // APPLICATIONS
      // -------------------------
      applications: {
        title:
          "طلباتي",

        applications:
          "طلبات",

        application:
          "طلب",

        error:
          "تعذر تحميل طلبات التوظيف الخاصة بك.",

        empty:
          "لا توجد طلبات",

        emptyDescription:
          "لم تتقدم إلى أي عرض عمل بعد. تصفح العروض المتاحة وابحث عن فرصتك المهنية القادمة.",

        browseJobs:
          "تصفح عروض العمل",

        offer:
          "عرض العمل",

        location:
          "الموقع",

        locationNotSpecified:
          "غير محدد",

        contract:
          "نوع العقد",

        appliedAt:
          "تاريخ التقديم",

        viewOffer:
          "عرض الوظيفة",

        statuses: {
          PENDING:
            "قيد الانتظار",

          REVIEWING:
            "قيد المراجعة",

          SHORTLISTED:
            "ضمن القائمة المختصرة",

          INTERVIEW:
            "مقابلة",

          ACCEPTED:
            "مقبول",

          REJECTED:
            "مرفوض",

          WITHDRAWN:
            "تم سحبه",
        },
      },

      // -------------------------
      // FAVORITES
      // -------------------------
      favorites: {
        title:
          "المفضلة",

        loading:
          "جاري تحميل المفضلة...",

        error:
          "تعذر تحميل المفضلة.",

        empty:
          "لا توجد وظائف مفضلة",

        emptyDescription:
          "أضف الوظائف إلى المفضلة للعثور عليها بسهولة هنا.",

        browseJobs:
          "تصفح الوظائف",

        offer:
          "وظيفة",

        company:
          "الشركة",

        location:
          "الموقع",

        locationNotSpecified:
          "غير محدد",

        remove:
          "إزالة",

        removeError:
          "تعذر إزالة هذه الوظيفة من المفضلة.",

        viewOffer:
          "عرض الوظيفة",

        job:
          "وظيفة",
      },

      // -------------------------
      // JOB DETAILS
      // -------------------------
      jobDetails: {
        backToJobs:
          "العودة إلى الوظائف",

        notFoundTitle:
          "الوظيفة غير موجودة",

        notFound:
          "هذه الوظيفة غير موجودة أو تم حذفها.",

        description:
          "وصف الوظيفة",

        noDescription:
          "لا يوجد وصف متاح.",

        skills:
          "المهارات المطلوبة",

        skillsSubtitle:
          "المهارات المطلوبة لهذا المنصب",

        information:
          "المعلومات",

        location:
          "الموقع",

        contract:
          "نوع العقد",

        workMode:
          "طريقة العمل",

        experience:
          "الخبرة",

        company:
          "الشركة",

        moreJobs:
          "المزيد من الوظائف من هذه الشركة",

        interested:
          "هل أنت مهتم بهذه الوظيفة؟",

        applyTitle:
          "قدم طلبك الآن",

        applySubtitle:
          "أرسل طلب التوظيف الخاص بك وابدأ الخطوة التالية في مسيرتك المهنية.",

        deadline:
          "آخر موعد للتقديم",

        apply:
          "التقديم",

        sending:
          "جاري الإرسال...",

        alreadyApplied:
          "لقد تقدمت لهذه الوظيفة بالفعل",

        applySuccess:
          "تم إرسال طلب التوظيف بنجاح.",

        applyError:
          "تعذر إرسال طلب التوظيف.",

        favoriteError:
          "تعذر تحديث المفضلة.",

        addFavorite:
          "إضافة إلى المفضلة",

        removeFavorite:
          "إزالة من المفضلة",

        loginToApply:
          "سجل الدخول للتقديم",

        loginHint:
          "يجب تسجيل الدخول كمرشح للتقديم على الوظيفة.",
      },

      // -------------------------
      // HOME
      // -------------------------
      home: {
        badge:
          "اعثر على فرصتك التالية",

        heroTitle:
          "ابحث عن الوظيفة التي تناسب",

        heroHighlight:
          "مستقبلك المهني",

        heroSubtitle:
          "اكتشف فرص العمل المتاحة، قدم طلبك بسهولة، وتتبع جميع طلباتك في مكان واحد.",

        viewJobs:
          "عرض الوظائف المتاحة",

        createAccount:
          "إنشاء حساب",

        featuredOffer:
          "عرض مميز",

        salary:
          "الراتب",

        open:
          "متاح",

        applicationSent:
          "تم إرسال الطلب",

        applicationStatus:
          "قيد المراجعة",

        searchPlaceholder:
          "المسمى الوظيفي، المهارة أو الكلمة المفتاحية",

        locationPlaceholder:
          "المدينة أو الموقع",

        search:
          "بحث",

        jobsAvailable:
          "الوظائف المتاحة",

        companies:
          "الشركات",

        candidates:
          "الباحثين عن عمل",

        applications:
          "طلبات التوظيف",

        simpleProcess:
          "عملية بسيطة",

        howTitle:
          "اعثر على وظيفتك في خطوات بسيطة",

        howSubtitle:
          "JobConnect يبسط عملية البحث عن وظيفة ويتيح لك إدارة طلباتك بسهولة.",

        step1Title:
          "أنشئ ملفك الشخصي",

        step1Description:
          "أنشئ ملفك الشخصي المهني وسلط الضوء على مهاراتك.",

        step2Title:
          "ابحث عن وظيفة",

        step2Description:
          "ابحث عن الفرص التي تناسب ملفك الشخصي.",

        step3Title:
          "قدم طلبك",

        step3Description:
          "أرسل طلب التوظيف بسرعة وسهولة.",

        step4Title:
          "تابع طلبك",

        step4Description:
          "تابع حالة طلباتك من خلال حسابك الشخصي.",

        ctaTitle:
          "جاهز للعثور على فرصتك التالية؟",

        ctaSubtitle:
          "انضم إلى JobConnect وابدأ الخطوة التالية في مسيرتك المهنية.",
      },

      // -------------------------
      // PROFILE
      // -------------------------
      profile: {
        title:
          "الملف الشخصي",

        edit:
          "تعديل الملف الشخصي",

        saveSuccess:
          "تم تحديث الملف الشخصي بنجاح.",

        saveError:
          "خطأ أثناء حفظ الملف الشخصي.",

        loadError:
          "خطأ أثناء تحميل الملف الشخصي.",

        notFound:
          "الملف الشخصي غير موجود.",

        phone:
          "الهاتف",

        location:
          "الموقع",

        bio:
          "نبذة",

        linkedin:
          "لينكدإن",

        github:
          "جيت هاب",

        cv:
          "السيرة الذاتية",

        photo:
          "الصورة الشخصية",

        jobTitle:
          "المسمى الوظيفي",

        company:
          "الشركة",

        professionalInfo:
          "المعلومات المهنية",

        accountType:
          "نوع الحساب",

        candidate:
          "مرشح",

        recruiter:
          "موظف توظيف",

        viewCv:
          "عرض السيرة الذاتية",

        uploadCv:
          "تحميل السيرة الذاتية",

        changePhoto:
          "تغيير الصورة",

        uploadPhoto:
          "إضافة صورة",

        noBio:
          "لا توجد نبذة متاحة.",

        noLocation:
          "الموقع غير محدد",

        noPhone:
          "رقم الهاتف غير محدد",

        noLinkedin:
          "لينكدإن غير محدد",

        noGithub:
          "جيت هاب غير محدد",
      },

      // -------------------------
      // COMMON
      // -------------------------
      common: {
        loading:
          "جاري التحميل...",

        save:
          "حفظ",

        saving:
          "جاري الحفظ...",

        cancel:
          "إلغاء",

        edit:
          "تعديل",

        delete:
          "حذف",

        close:
          "إغلاق",

        back:
          "رجوع",

        confirm:
          "تأكيد",

        yes:
          "نعم",

        no:
          "لا",
      },

      // -------------------------
      // CHAT
      // -------------------------
      chat: {
        title:
          "الرسائل",

        subtitle:
          "محادثاتك",

        user:
          "مستخدم",

        noConversations:
          "لا توجد محادثات",

        selectConversation:
          "اختر محادثة",

        selectConversationDescription:
          "اختر محادثة للبدء.",

        startConversation:
          "ابدأ محادثة مع هذا الشخص.",

        writeMessage:
          "اكتب رسالة...",

        send:
          "إرسال",

        loading:
          "جاري تحميل المحادثات...",

        loadingMessages:
          "جاري تحميل الرسائل...",

        connecting:
          "جاري الاتصال...",

        connected:
          "متصل",

        disconnected:
          "غير متصل",

        candidate:
          "مرشح",

        recruiter:
          "موظف توظيف",

        noMessages:
          "لا توجد رسائل",

        startChat:
          "بدء المحادثة",

        today:
          "اليوم",

        yesterday:
          "أمس",

        unread:
          "غير مقروء",

        unreadMessages:
          "رسائل غير مقروءة",

        conversationCreated:
          "تم إنشاء المحادثة بنجاح.",

        conversationError:
          "تعذر إنشاء المحادثة.",

        loadError:
          "تعذر تحميل المحادثات.",

        messageError:
          "تعذر إرسال الرسالة.",

        contactRecruiter:
          "التواصل مع موظف التوظيف",

        contactCandidate:
          "التواصل مع المرشح",
      },
    },
  },
};

export default resources;
```

# src\index.css

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary: #6366f1;
  --color-primary-dark: #4f46e5;
  --color-secondary: #8b5cf6;
  --color-secondary-dark: #7c3aed;
}

:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html.dark {
  color-scheme: dark;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

#root {
  min-height: 100vh;
}
@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: page-enter 0.45s ease-out both;
}

.page-enter-delay-1 {
  animation: page-enter 0.45s ease-out 0.1s both;
}

.page-enter-delay-2 {
  animation: page-enter 0.45s ease-out 0.2s both;
}

.page-enter-delay-3 {
  animation: page-enter 0.45s ease-out 0.3s both;
}

/* Illustration qui flotte doucement */
@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

.float-anim {
  animation: float-slow 4s ease-in-out infinite;
}

/* Réduire les animations si l'utilisateur le préfère */
@media (prefers-reduced-motion: reduce) {
  .page-enter,
  .page-enter-delay-1,
  .page-enter-delay-2,
  .page-enter-delay-3,
  .float-anim {
    animation: none;
  }
}
```

# src\main.jsx

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./i18n/config";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

# src\pages\admin\AdminDashboard.jsx

```jsx
import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  BriefcaseBusiness,
  Building2,
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

import api from "../../services/api";


function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <Icon size={24} />
        </div>

      </div>

    </div>
  );
}


export default function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  const loadDashboard = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        "/accounts/admin/dashboard/"
      );

      setStats(response.data);

    } catch (err) {

      console.error("Erreur Dashboard Admin :", err);

      setError(
        err.response?.data?.detail ||
        "Impossible de charger le dashboard administrateur."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadDashboard();

  }, []);


  if (loading) {

    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">

          <Loader2
            size={24}
            className="animate-spin"
          />

          <span>
            Chargement du dashboard...
          </span>

        </div>

      </div>
    );
  }


  if (error) {

    return (
      <div className="mx-auto max-w-7xl px-4 py-8">

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/20">

          <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
            Erreur
          </h2>

          <p className="mt-2 text-sm text-red-600 dark:text-red-300">
            {error}
          </p>

          <button
            onClick={loadDashboard}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <RefreshCw size={16} />
            Réessayer
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard administrateur
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Vue globale de l'activité de JobConnect.
          </p>

        </div>


        <button
          onClick={loadDashboard}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <RefreshCw size={17} />
          Actualiser
        </button>

      </div>


      {/* STATISTIQUES UTILISATEURS */}

      <div className="mb-4">

        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Utilisateurs
        </h2>

      </div>


      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Utilisateurs"
          value={stats?.users ?? 0}
          icon={Users}
        />

        <StatCard
          title="Candidats"
          value={stats?.candidates ?? 0}
          icon={UserCheck}
        />

        <StatCard
          title="Recruteurs"
          value={stats?.recruiters ?? 0}
          icon={Users}
        />

        <StatCard
          title="Administrateurs"
          value={stats?.admins ?? 0}
          icon={Users}
        />

      </div>


      {/* PLATEFORME */}

      <div className="mb-4 mt-10">

        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Activité de la plateforme
        </h2>

      </div>


      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

        <StatCard
          title="Entreprises"
          value={stats?.companies ?? 0}
          icon={Building2}
        />

        <StatCard
          title="Offres d'emploi"
          value={stats?.jobs ?? 0}
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Candidatures"
          value={stats?.applications ?? 0}
          icon={FileText}
        />

      </div>


      {/* CANDIDATURES */}

      <div className="mb-4 mt-10">

        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          État des candidatures
        </h2>

      </div>


      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        <StatCard
          title="En attente"
          value={stats?.pending_applications ?? 0}
          icon={Clock3}
        />

        <StatCard
          title="Acceptées"
          value={stats?.accepted_applications ?? 0}
          icon={CheckCircle2}
        />

        <StatCard
          title="Refusées"
          value={stats?.rejected_applications ?? 0}
          icon={XCircle}
        />

      </div>

    </div>
  );
}
```

# src\pages\applications\Applications.jsx

```jsx
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  CalendarDays,
  ArrowRight,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  UserRoundCheck,
  Search,
  MessageCircle,
  Mail,
  Phone,
  UserRound,
  Loader2,
} from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Applications() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [hoveredRecruiter, setHoveredRecruiter] = useState(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    fetchApplications();

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/applications/");
      setApplications(res.data.results || res.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          t(
            "applications.error",
            "Impossible de charger les candidatures."
          )
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      PENDING: {
        label: t("applications.statuses.PENDING"),
        icon: Clock,
        className:
          "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
      },
      REVIEWING: {
        label: t("applications.statuses.REVIEWING"),
        icon: Search,
        className:
          "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
      },
      SHORTLISTED: {
        label: t("applications.statuses.SHORTLISTED"),
        icon: UserRoundCheck,
        className:
          "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
      },
      INTERVIEW: {
        label: t("applications.statuses.INTERVIEW"),
        icon: CalendarDays,
        className:
          "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
      },
      ACCEPTED: {
        label: t("applications.statuses.ACCEPTED"),
        icon: CheckCircle2,
        className:
          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
      },
      REJECTED: {
        label: t("applications.statuses.REJECTED"),
        icon: XCircle,
        className:
          "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
      },
      WITHDRAWN: {
        label: t("applications.statuses.WITHDRAWN"),
        icon: XCircle,
        className:
          "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20",
      },
    };

    return (
      configs[status] || {
        label: status,
        icon: Clock,
        className:
          "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400",
      }
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const locale =
      i18n.language === "ar"
        ? "ar-MA"
        : i18n.language === "en"
          ? "en-US"
          : "fr-FR";

    return new Date(date).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // =========================
  // RECRUITER HOVER
  // =========================

  const openRecruiterHover = (applicationId) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    setHoveredRecruiter(applicationId);
  };

  const closeRecruiterHover = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredRecruiter(null);
    }, 180);
  };

  const getMediaUrl = (url) => {
    if (!url) return null;

    if (url.startsWith("http")) {
      return url;
    }

    const baseURL =
      api.defaults.baseURL || "http://127.0.0.1:8000/api";

    const backendURL = baseURL.replace(/\/api\/?$/, "");

    return `${backendURL}${url}`;
  };

  const getRecruiterInitials = (application) => {
    const name = application.recruiter_name || "R";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const contactRecruiter = (application) => {
    if (!application.recruiter_user_id) {
      return;
    }

    navigate(`/chat?user=${application.recruiter_user_id}`);
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-slate-50 px-4 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 h-8 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="grid gap-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="min-h-[60vh] bg-slate-50 px-4 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-500/20 dark:bg-red-500/10">
            <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
              <XCircle className="h-5 w-5" />

              <p className="font-medium">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            <FileText className="h-4 w-4" />
            {t("applications.title")}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t("applications.title")}
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {applications.length}{" "}
            {applications.length > 1
              ? t("applications.applications")
              : t("applications.application")}
          </p>
        </div>

        {/* EMPTY */}
        {applications.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10">
              <BriefcaseBusiness className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {t("applications.empty")}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              {t("applications.emptyDescription")}
            </p>

            <Link
              to="/jobs"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
            >
              {t("applications.browseJobs")}

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (

          <div className="grid gap-5">

            {applications.map((app) => {
              const status = getStatusConfig(app.status);
              const StatusIcon = status.icon;

              const recruiterPicture = getMediaUrl(
                app.recruiter_profile_picture
              );

              const hasRecruiter =
                !!app.recruiter_user_id;

              return (
                <div
                  key={app.id}
                  className={`group relative overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 ${
                    hoveredRecruiter === app.id
                      ? "z-40"
                      : "z-0"
                  }`}
                >

                  <div className="p-5 sm:p-6">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                      {/* MAIN */}
                      <div className="flex min-w-0 gap-4">

                        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 sm:flex">
                          <BriefcaseBusiness className="h-6 w-6" />
                        </div>

                        <div className="min-w-0">

                          <Link
                            to={`/jobs/${app.job_offer}`}
                            className="block truncate text-lg font-bold text-slate-900 transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                          >
                            {app.job_title ||
                              t("applications.offer")}
                          </Link>

                          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <Building2 className="h-4 w-4 shrink-0" />

                            <span>
                              {app.company_name || "-"}
                            </span>
                          </div>

                        </div>
                      </div>

                      {/* STATUS */}
                      <div
                        className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />

                        {status.label}
                      </div>
                    </div>

                    {/* RECRUITER */}
                    {hasRecruiter && (
                      <div
                        className="relative mt-6 w-fit"
                        onMouseEnter={() =>
                          openRecruiterHover(app.id)
                        }
                        onMouseLeave={closeRecruiterHover}
                      >

                        <button
                          type="button"
                          onClick={() =>
                            contactRecruiter(app)
                          }
                          className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800"
                        >

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm">
                            {recruiterPicture ? (
                              <img
                                src={recruiterPicture}
                                alt={app.recruiter_name || "Recruteur"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-bold">
                                {getRecruiterInitials(app)}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs text-slate-400">
                              Recruteur
                            </p>

                            <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                              {app.recruiter_name || "Recruteur"}
                            </p>
                          </div>

                          <MessageCircle className="ml-1 h-4 w-4 text-indigo-500" />
                        </button>

                        {/* HOVER POPUP */}
                        {hoveredRecruiter === app.id && (
                          <div
                            className="absolute left-0 top-full z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900"
                            onMouseEnter={() =>
                              openRecruiterHover(app.id)
                            }
                            onMouseLeave={closeRecruiterHover}
                          >

                            <div className="flex items-center gap-3">

                              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                {recruiterPicture ? (
                                  <img
                                    src={recruiterPicture}
                                    alt={app.recruiter_name || "Recruteur"}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <span className="text-sm font-bold">
                                    {getRecruiterInitials(app)}
                                  </span>
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="text-xs text-slate-400">
                                  Recruteur
                                </p>

                                <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                                  {app.recruiter_name || "Recruteur"}
                                </h3>

                                {app.recruiter_job_title && (
                                  <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                                    {app.recruiter_job_title}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">

                              {app.recruiter_email && (
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                  <Mail className="h-4 w-4 shrink-0" />
                                  <span className="truncate">
                                    {app.recruiter_email}
                                  </span>
                                </div>
                              )}

                              {app.recruiter_phone && (
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                  <Phone className="h-4 w-4 shrink-0" />
                                  <span>
                                    {app.recruiter_phone}
                                  </span>
                                </div>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                contactRecruiter(app)
                              }
                              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 hover:shadow-md"
                            >
                              <MessageCircle className="h-4 w-4" />

                              Contacter le recruteur
                            </button>

                          </div>
                        )}
                      </div>
                    )}

                    {/* INFO */}
                    <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3 dark:border-slate-800">

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                          <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            {t("applications.location")}
                          </p>

                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {app.location ||
                              t("applications.locationNotSpecified")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                          <BriefcaseBusiness className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            {t("applications.contract")}
                          </p>

                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {app.contract_type || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                          <CalendarDays className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            {t("applications.appliedAt")}
                          </p>

                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {formatDate(
                              app.applied_at
                            )}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* FOOTER */}
                    <div className="mt-5 flex justify-end">
                      <Link
                        to={`/jobs/${app.job_offer}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        {t("applications.viewOffer")}

                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
```

# src\pages\applications\RecruiterApplications.jsx

```jsx
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  MessageCircle,
  X,
} from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const STATUS_OPTIONS = [
  "PENDING",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEW",
  "ACCEPTED",
  "REJECTED",
];

const STATUS_CLASSES = {
  PENDING:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  REVIEWING:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  SHORTLISTED:
    "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",

  INTERVIEW:
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",

  ACCEPTED:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  REJECTED:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

function getApplicationList(data) {
  return data?.results || data || [];
}

function getCandidateName(application) {
  if (application.candidate_name) {
    return application.candidate_name;
  }

  if (application.candidate?.user) {
    const first =
      application.candidate.user.first_name || "";

    const last =
      application.candidate.user.last_name || "";

    const fullName = `${first} ${last}`.trim();

    if (fullName) {
      return fullName;
    }

    if (application.candidate.user.username) {
      return application.candidate.user.username;
    }
  }

  return "Candidat";
}

function getCandidateEmail(application) {
  return (
    application.candidate_email ||
    application.candidate?.user?.email ||
    "—"
  );
}

function formatDate(date, language) {
  if (!date) return "—";

  return new Intl.DateTimeFormat(
    language === "ar"
      ? "ar-MA"
      : language === "en"
        ? "en-US"
        : "fr-FR",
    {
      dateStyle: "medium",
    }
  ).format(new Date(date));
}

export default function RecruiterApplications() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [savingId, setSavingId] = useState(null);
  const [notes, setNotes] = useState({});

  const [hoveredCandidate, setHoveredCandidate] =
    useState(null);

  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    if (user?.role !== "RECRUITER") return;

    fetchApplications();

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [user]);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/applications/");

      const list = getApplicationList(response.data);

      setApplications(list);

      const initialNotes = {};

      list.forEach((application) => {
        initialNotes[application.id] =
          application.recruiter_note || "";
      });

      setNotes(initialNotes);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          t(
            "applications.recruiterError",
            "Impossible de charger les candidatures."
          )
      );
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = async (application) => {
    setSavingId(application.id);

    try {
      const response = await api.patch(
        `/applications/${application.id}/`,
        {
          status: application.status,
          recruiter_note:
            notes[application.id] || "",
        }
      );

      setApplications((previous) =>
        previous.map((item) =>
          item.id === application.id
            ? { ...item, ...response.data }
            : item
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Impossible de mettre à jour la candidature."
      );
    } finally {
      setSavingId(null);
    }
  };

  const changeStatus = (id, status) => {
    setApplications((previous) =>
      previous.map((application) =>
        application.id === id
          ? { ...application, status }
          : application
      )
    );
  };

  const changeNote = (id, value) => {
    setNotes((previous) => ({
      ...previous,
      [id]: value,
    }));
  };

  // =========================
  // CANDIDATE HOVER
  // =========================

  const openCandidateHover = (applicationId) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    setHoveredCandidate(applicationId);
  };

  const closeCandidateHover = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCandidate(null);
    }, 180);
  };

  const getMediaUrl = (url) => {
    if (!url) return null;

    if (url.startsWith("http")) {
      return url;
    }

    const baseURL =
      api.defaults.baseURL ||
      "http://127.0.0.1:8000/api";

    const backendURL =
      baseURL.replace(/\/api\/?$/, "");

    return `${backendURL}${url}`;
  };

  const getCandidateInitials = (application) => {
    const name =
      getCandidateName(application) || "C";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0).toUpperCase()
      )
      .join("");
  };

  const contactCandidate = (application) => {
    if (!application.candidate_user_id) {
      return;
    }

    navigate(
      `/chat?user=${application.candidate_user_id}`
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8">
          <div className="mb-3 inline-flex rounded-xl bg-indigo-100 p-3 text-primary dark:bg-indigo-500/10">
            <FileText className="h-6 w-6" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Candidatures reçues
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Consultez les candidats et gérez leurs candidatures.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">

            <span>{error}</span>

            <button
              onClick={() => setError("")}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>

          </div>
        )}

        {/* EMPTY */}

        {applications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <FileText className="h-7 w-7" />
            </div>

            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Aucune candidature
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Vous n'avez pas encore reçu de candidature.
            </p>

          </div>
        ) : (

          <div className="space-y-5">

            {applications.map((application) => {

              const candidateName =
                getCandidateName(application);

              const candidateEmail =
                getCandidateEmail(application);

              const candidatePicture =
                getMediaUrl(
                  application.candidate_profile_picture
                );

              const hasCandidate =
                !!application.candidate_user_id;

              return (
                <article
                  key={application.id}
                  className={`relative overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${
                    hoveredCandidate === application.id
                      ? "z-40"
                      : "z-0"
                  }`}
                >

                  {/* TOP */}

                  <div className="border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                      {/* CANDIDATE */}

                      <div
                        className="relative w-fit"
                        onMouseEnter={() =>
                          openCandidateHover(
                            application.id
                          )
                        }
                        onMouseLeave={
                          closeCandidateHover
                        }
                      >

                        <button
                          type="button"
                          onClick={() =>
                            contactCandidate(
                              application
                            )
                          }
                          className="flex items-start gap-4 rounded-xl p-1 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800"
                        >

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white">

                            {candidatePicture ? (
                              <img
                                src={candidatePicture}
                                alt={candidateName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              candidateName
                                .charAt(0)
                                .toUpperCase()
                            )}

                          </div>

                          <div>

                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                              {candidateName}
                            </h2>

                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

                              <Mail className="h-4 w-4" />

                              {candidateEmail}

                              <MessageCircle className="ml-1 h-4 w-4 text-indigo-500" />

                            </div>

                          </div>

                        </button>

                        {/* CANDIDATE POPUP */}

                        {hasCandidate &&
                          hoveredCandidate ===
                            application.id && (
                            <div
                              className="absolute left-0 top-full z-50 mt-2 w-96 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900"
                              onMouseEnter={() =>
                                openCandidateHover(
                                  application.id
                                )
                              }
                              onMouseLeave={
                                closeCandidateHover
                              }
                            >

                              {/* PROFILE */}

                              <div className="flex items-center gap-3">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">

                                  {candidatePicture ? (
                                    <img
                                      src={
                                        candidatePicture
                                      }
                                      alt={
                                        candidateName
                                      }
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-sm font-bold">
                                      {getCandidateInitials(
                                        application
                                      )}
                                    </span>
                                  )}

                                </div>

                                <div className="min-w-0">

                                  <p className="text-xs text-slate-400">
                                    Candidat
                                  </p>

                                  <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                                    {candidateName}
                                  </h3>

                                </div>

                              </div>

                              {/* DETAILS */}

                              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">

                                {candidateEmail && (
                                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <Mail className="h-4 w-4 shrink-0" />

                                    <span className="truncate">
                                      {candidateEmail}
                                    </span>
                                  </div>
                                )}

                                {application.candidate_phone && (
                                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <Phone className="h-4 w-4 shrink-0" />

                                    <span>
                                      {application.candidate_phone}
                                    </span>
                                  </div>
                                )}

                                {application.candidate_location && (
                                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <MapPin className="h-4 w-4 shrink-0" />

                                    <span>
                                      {application.candidate_location}
                                    </span>
                                  </div>
                                )}

                              </div>

                              {/* BIO */}

                              {application.candidate_bio && (
                                <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">

                                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Bio
                                  </p>

                                  <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                                    {
                                      application.candidate_bio
                                    }
                                  </p>

                                </div>
                              )}

                              {/* SOCIAL */}

                              {(application.candidate_linkedin ||
                                application.candidate_github) && (
                                <div className="mt-4 flex gap-2">

                                  {application.candidate_linkedin && (
                                    <a
                                      href={
                                        application.candidate_linkedin
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-indigo-400"
                                    >
                                      <Linkedin className="h-4 w-4" />
                                      LinkedIn
                                    </a>
                                  )}

                                  {application.candidate_github && (
                                    <a
                                      href={
                                        application.candidate_github
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-indigo-400"
                                    >
                                      <Github className="h-4 w-4" />
                                      GitHub
                                    </a>
                                  )}

                                </div>
                              )}

                              {/* CHAT */}

                              <button
                                type="button"
                                onClick={() =>
                                  contactCandidate(
                                    application
                                  )
                                }
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 hover:shadow-md"
                              >

                                <MessageCircle className="h-4 w-4" />

                                Contacter le candidat

                              </button>

                            </div>
                          )}

                      </div>

                      {/* STATUS */}

                      <span
                        className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                          STATUS_CLASSES[
                            application.status
                          ] ||
                          STATUS_CLASSES.PENDING
                        }`}
                      >
                        {t(
                          `applications.statuses.${application.status}`,
                          application.status
                        )}
                      </span>

                    </div>
                  </div>

                  {/* INFORMATION */}

                  <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">

                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Offre
                      </p>

                      <Link
                        to={`/jobs/${application.job_offer}`}
                        className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                      >
                        <BriefcaseBusiness className="h-4 w-4" />

                        {application.job_title ||
                          application.job_offer?.title ||
                          `Offre #${application.job_offer}`}
                      </Link>
                    </div>

                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Localisation
                      </p>

                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <MapPin className="h-4 w-4 text-slate-400" />

                        {application.location ||
                          "Non précisé"}
                      </div>
                    </div>

                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Date de candidature
                      </p>

                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CalendarDays className="h-4 w-4 text-slate-400" />

                        {formatDate(
                          application.applied_at,
                          i18n.language
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Type
                      </p>

                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <User className="h-4 w-4 text-slate-400" />

                        {application.contract_type ||
                          "—"}
                      </div>
                    </div>

                  </div>

                  {/* MANAGEMENT */}

                  <div className="grid gap-5 border-t border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/40 sm:p-6 lg:grid-cols-[220px_1fr_auto] lg:items-end">

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Statut
                      </label>

                      <div className="relative">

                        <select
                          value={application.status}
                          onChange={(event) =>
                            changeStatus(
                              application.id,
                              event.target.value
                            )
                          }
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >

                          {STATUS_OPTIONS.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {t(
                                  `applications.statuses.${status}`,
                                  status
                                )}
                              </option>
                            )
                          )}

                        </select>

                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      </div>
                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Note du recruteur
                      </label>

                      <textarea
                        rows={2}
                        value={
                          notes[application.id] ||
                          ""
                        }
                        onChange={(event) =>
                          changeNote(
                            application.id,
                            event.target.value
                          )
                        }
                        placeholder="Ajouter une note..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />

                    </div>

                    <button
                      onClick={() =>
                        updateApplication(
                          application
                        )
                      }
                      disabled={
                        savingId === application.id
                      }
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {savingId === application.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}

                      Enregistrer

                    </button>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}
```

# src\pages\auth\Login.jsx

```jsx
Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import loginRegisterImg from "../../assets/loginregister.svg";

const CATEGORIES = [
  { label: "Développement", rotate: -2 },
  { label: "Design", rotate: 1.5 },
  { label: "Marketing", rotate: -1 },
  { label: "Finance", rotate: 2 },
  { label: "Ressources Humaines", rotate: -1.5 },
  { label: "Data", rotate: 1 },
  { label: "Vente", rotate: -2.5 },
  { label: "Support client", rotate: 1.8 },
];

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.detail || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Branding panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-secondary p-12 text-white lg:flex">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          <span className="text-white">Job</span>
          <span className="text-white/70">Connect</span>
        </Link>

        <div className="max-w-sm">
          <h1 className="page-enter text-4xl font-bold leading-tight">
            Vos candidatures et vos offres, au même endroit.
          </h1>
          <p className="page-enter-delay-1 mt-4 text-white/80">
            Connectez-vous pour suivre l'avancement de vos candidatures ou
            gérer les offres que vous avez publiées.
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {CATEGORIES.map(({ label, rotate }) => (
              <span
                key={label}
                style={{ transform: `rotate(${rotate}deg)` }}
                className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Illustration */}
          <img
            src={loginRegisterImg}
            alt="Illustration JobConnect"
            className="float-anim mt-10 w-full max-w-xs drop-shadow-xl"
          />
        </div>

        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} JobConnect
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="page-enter w-full max-w-sm">
          <Link
            to="/"
            className="mb-8 inline-flex text-2xl font-bold tracking-tight lg:hidden"
          >
            <span className="text-primary">Job</span>
            <span className="text-secondary">Connect</span>
          </Link>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Connexion
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Heureux de vous revoir.
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span className="break-words">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="page-enter-delay-1">
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 ps-11 pe-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="page-enter-delay-2">
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 ps-11 pe-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-pressed={showPassword}
                  aria-label={
                    showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
                  }
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 rounded text-slate-400 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="page-enter-delay-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Pas encore de compte ?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

# src\pages\auth\Register.jsx

```jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Briefcase,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Building2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import loginRegisterImg from "../../assets/loginregister.svg";

const CATEGORIES = [
  { label: "Développement", rotate: -2 },
  { label: "Design", rotate: 1.5 },
  { label: "Marketing", rotate: -1 },
  { label: "Finance", rotate: 2 },
  { label: "Ressources Humaines", rotate: -1.5 },
  { label: "Data", rotate: 1 },
  { label: "Vente", rotate: -2.5 },
  { label: "Support client", rotate: 1.8 },
];

const ROLES = [
  {
    value: "CANDIDATE",
    label: "Candidat",
    desc: "Je cherche un emploi",
    icon: User,
  },
  {
    value: "RECRUITER",
    label: "Recruteur",
    desc: "Je recrute des talents",
    icon: Briefcase,
  },
];

function extractErrorMessage(err) {
  const data = err.response?.data;

  if (!data) {
    return "Une erreur est survenue. Veuillez réessayer.";
  }

  if (typeof data === "string") {
    return data;
  }

  if (data.detail) {
    return data.detail;
  }

  const firstField = Object.values(data)[0];

  if (Array.isArray(firstField)) {
    return firstField[0];
  }

  if (typeof firstField === "string") {
    return firstField;
  }

  return "Une erreur est survenue. Veuillez réessayer.";
}

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    role: "CANDIDATE",

    // Informations entreprise
    company_name: "",
    company_description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const setRole = (role) => {
    setForm({
      ...form,
      role,

      // Si on repasse en candidat,
      // on vide les informations entreprise.
      ...(role === "CANDIDATE"
        ? {
            company_name: "",
            company_description: "",
          }
        : {}),
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Vérification mot de passe
    if (form.password !== form.confirm_password) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (form.password.length < 8) {
      setError("Le mot de passe doit contenir au minimum 8 caractères.");
      return;
    }

    // Vérification entreprise pour recruteur
    if (form.role === "RECRUITER") {
      if (!form.company_name.trim()) {
        setError("Le nom de l'entreprise est obligatoire.");
        return;
      }

      if (!form.company_description.trim()) {
        setError("La description de l'entreprise est obligatoire.");
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        email: form.email,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
        role: form.role,
      };

      // Ajouter les données entreprise
      // seulement pour un recruteur
      if (form.role === "RECRUITER") {
        payload.company_name = form.company_name.trim();
        payload.company_description = form.company_description.trim();
      }

      // Création du compte
      await api.post("/accounts/users/", payload);

      // Connexion automatique
      await login({
        email: form.email,
        password: form.password,
      });

      navigate("/");
    } catch (err) {
      console.error("Erreur inscription :", err);
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const passwordsMismatch =
    form.confirm_password.length > 0 &&
    form.password !== form.confirm_password;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* =========================
          BRANDING PANEL
      ========================= */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-secondary p-12 text-white lg:flex">

        <Link to="/" className="text-2xl font-bold tracking-tight">
          <span className="text-white">Job</span>
          <span className="text-white/70">Connect</span>
        </Link>

        <div className="max-w-sm">
          <h1 className="page-enter text-4xl font-bold leading-tight">
            Deux façons de rejoindre JobConnect.
          </h1>

          <p className="page-enter-delay-1 mt-4 text-white/80">
            Un compte candidat pour postuler aux meilleures offres, ou un
            compte recruteur pour publier les vôtres.
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {CATEGORIES.map(({ label, rotate }) => (
              <span
                key={label}
                style={{
                  transform: `rotate(${rotate}deg)`,
                }}
                className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Illustration */}
          <img
            src={loginRegisterImg}
            alt="Illustration JobConnect"
            className="float-anim mt-10 w-full max-w-xs drop-shadow-xl"
          />
        </div>

        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} JobConnect
        </p>
      </div>

      {/* =========================
          FORM PANEL
      ========================= */}
      <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">

        <div className="page-enter w-full max-w-md">

          <Link
            to="/"
            className="mb-8 inline-flex text-2xl font-bold tracking-tight lg:hidden"
          >
            <span className="text-primary">Job</span>
            <span className="text-secondary">Connect</span>
          </Link>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Créer un compte
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Rejoignez JobConnect en quelques étapes.
          </p>

          {/* ERROR */}
          {error && (
            <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span className="break-words">
                {error}
              </span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* =========================
                ROLE
            ========================= */}
            <fieldset className="page-enter-delay-1 m-0 border-0 p-0">

              <legend className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Je suis un...
              </legend>

              <div className="grid grid-cols-2 gap-3">

                {ROLES.map(
                  ({
                    value,
                    label,
                    desc,
                    icon: Icon,
                  }) => {
                    const selected =
                      form.role === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRole(value)}
                        aria-pressed={selected}
                        className={`flex flex-col items-start gap-2 rounded-lg border-2 p-3.5 text-start transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                          selected
                            ? "border-primary bg-primary/5 dark:bg-primary/10"
                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                        }`}
                      >

                        <Icon
                          size={20}
                          className={
                            selected
                              ? "text-primary"
                              : "text-slate-400"
                          }
                        />

                        <span>
                          <span
                            className={`block text-sm font-semibold ${
                              selected
                                ? "text-primary"
                                : "text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            {label}
                          </span>

                          <span className="block text-xs text-slate-500 dark:text-slate-400">
                            {desc}
                          </span>
                        </span>

                      </button>
                    );
                  }
                )}

              </div>
            </fieldset>

            {/* =========================
                NOM / PRENOM
            ========================= */}
            <div className="page-enter-delay-2 grid grid-cols-2 gap-4">

              <div>
                <label
                  htmlFor="first_name"
                  className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Prénom
                </label>

                <input
                  id="first_name"
                  name="first_name"
                  autoComplete="given-name"
                  placeholder="Amine"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Nom
                </label>

                <input
                  id="last_name"
                  name="last_name"
                  autoComplete="family-name"
                  placeholder="Benali"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                />
              </div>

            </div>

            {/* =========================
                ENTREPRISE
                AFFICHÉE SEULEMENT
                POUR RECRUTEUR
            ========================= */}
            {form.role === "RECRUITER" && (
              <div className="space-y-5 rounded-xl border border-primary/20 bg-primary/5 p-4 dark:border-primary/20 dark:bg-primary/10">

                <div>
                  <div className="mb-1 flex items-center gap-2">

                    <Building2
                      size={18}
                      className="text-primary"
                    />

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Informations de l'entreprise
                    </h3>

                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Votre compte recruteur sera automatiquement associé à cette entreprise.
                  </p>
                </div>

                {/* Nom entreprise */}
                <div>

                  <label
                    htmlFor="company_name"
                    className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Nom de l'entreprise
                  </label>

                  <div className="relative">

                    <Building2
                      size={18}
                      className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="company_name"
                      name="company_name"
                      type="text"
                      placeholder="Ex: YT Solutions"
                      value={form.company_name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 ps-11 pe-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                    />

                  </div>

                </div>

                {/* Description entreprise */}
                <div>

                  <label
                    htmlFor="company_description"
                    className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Description de l'entreprise
                  </label>

                  <textarea
                    id="company_description"
                    name="company_description"
                    rows={4}
                    placeholder="Présentez votre entreprise..."
                    value={form.company_description}
                    onChange={handleChange}
                    required
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                  />

                </div>

              </div>
            )}

            {/* =========================
                EMAIL
            ========================= */}
            <div className="page-enter-delay-3">

              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 ps-11 pe-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                />

              </div>

            </div>

            {/* =========================
                PASSWORD
            ========================= */}
            <div>

              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Mot de passe
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 ps-11 pe-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 rounded text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              <p className="mt-1.5 text-xs text-slate-400">
                8 caractères minimum
              </p>

            </div>

            {/* =========================
                CONFIRM PASSWORD
            ========================= */}
            <div>

              <label
                htmlFor="confirm_password"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Confirmer le mot de passe
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.confirm_password}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-lg border bg-white py-2.5 ps-11 pe-11 text-sm text-slate-900 outline-none transition dark:bg-slate-900 dark:text-white ${
                    passwordsMismatch
                      ? "border-red-300 focus:border-red-400"
                      : "border-slate-200 focus:border-primary"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                  aria-label={
                    showConfirm
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 rounded text-slate-400 hover:text-slate-600"
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {passwordsMismatch && (
                <p className="mt-1.5 text-xs text-red-500">
                  Les mots de passe ne correspondent pas
                </p>
              )}

            </div>

            {/* =========================
                SUBMIT
            ========================= */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Inscription...
                </>
              ) : (
                "S'inscrire"
              )}

            </button>

          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">

            Déjà un compte ?{" "}

            <Link
              to="/login"
              className="font-semibold text-primary hover:underline"
            >
              Connexion
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}
```

# src\pages\favorites\Favorites.jsx

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Heart,
  BriefcaseBusiness,
  Building2,
  MapPin,
  ArrowRight,
  Trash2,
  XCircle,
  Search,
  Loader2,
} from "lucide-react";
import api from "../../services/api";

export default function Favorites() {
  const { t } = useTranslation();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/favorites/");
      setFavorites(res.data.results || res.data);
    } catch {
      setError(t("favorites.error"));
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    setRemovingId(id);

    try {
      await api.delete(`/favorites/${id}/`);
      setFavorites((prev) => prev.filter((f) => f.id !== id));
    } catch {
      alert(t("favorites.removeError"));
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-slate-50 px-4 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 h-8 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-60 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] bg-slate-50 px-4 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-500/20 dark:bg-red-500/10">
            <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
              <XCircle className="h-5 w-5" />
              <p className="font-medium">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-700 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400">
            <Heart className="h-4 w-4 fill-current" />
            {t("favorites.title")}
          </div>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {t("favorites.title")}
              </h1>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                {favorites.length}{" "}
                {favorites.length > 1
                  ? t("favorites.jobs")
                  : t("favorites.job")}
              </p>
            </div>
          </div>
        </div>

        {/* Empty */}
        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-500/10">
              <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {t("favorites.empty")}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              {t("favorites.emptyDescription")}
            </p>

            <Link
              to="/jobs"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
            >
              <Search className="h-4 w-4" />
              {t("favorites.browseJobs")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-500/30"
              >
                <div className="p-5 sm:p-6">
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
                        <BriefcaseBusiness className="h-6 w-6" />
                      </div>

                      <div className="min-w-0">
                        <Link
                          to={`/jobs/${fav.job_offer || "#"}`}
                          className="block truncate text-lg font-bold text-slate-900 transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                        >
                          {fav.job_offer_title || t("favorites.offer")}
                        </Link>

                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Building2 className="h-4 w-4 shrink-0" />
                          <span>{fav.job_offer_company || "-"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                      <Heart className="h-4 w-4 fill-current" />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-slate-700">
                      <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        {t("favorites.location")}
                      </p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {fav.job_offer_location ||
                          t("favorites.locationNotSpecified")}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                    <Link
                      to={`/jobs/${fav.job_offer || "#"}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      {t("favorites.viewOffer")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </Link>

                    <button
                      onClick={() => handleRemove(fav.id)}
                      disabled={removingId === fav.id}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                    >
                      {removingId === fav.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}

                      {t("favorites.remove")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

# src\pages\home\Home.jsx

```jsx
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  ArrowRight,
  BriefcaseBusiness,
  Users,
  FileCheck2,
  TrendingUp,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">

      {/* ==================== HERO ==================== */}
      <section className="relative w-full overflow-hidden">

        {/* Background decorations */}
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative grid w-full items-center gap-12 px-0 py-20 lg:grid-cols-2 lg:py-28">

          {/* Hero content */}
          <div className="px-6 lg:pl-12 xl:pl-20">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
              <TrendingUp size={16} />
              {t("home.badge")}
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {t("home.heroTitle")}{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t("home.heroHighlight")}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t("home.heroSubtitle")}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:opacity-95"
              >
                {t("home.viewJobs")}
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500"
              >
                {t("home.createAccount")}
              </Link>

            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden px-6 lg:block lg:pr-12 xl:pr-20">

            <div className="relative mx-auto max-w-lg">

              {/* Main card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {t("home.featuredOffer")}
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Frontend Developer
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <BriefcaseBusiness size={24} />
                  </div>

                </div>

                <div className="mt-6 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white">
                    JC
                  </div>

                  <div>
                    <p className="font-semibold">
                      JobConnect
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Casablanca · Remote
                    </p>
                  </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-2">

                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    React
                  </span>

                  <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                    JavaScript
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    CDI
                  </span>

                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t("home.salary")}
                    </p>

                    <p className="font-bold">
                      12,000 DH
                    </p>
                  </div>

                  <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    {t("home.open")}
                  </span>

                </div>

              </div>

              {/* Floating card */}
              <div className="absolute -bottom-8 -left-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <FileCheck2 size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      {t("home.applicationSent")}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t("home.applicationStatus")}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==================== SEARCH ==================== */}
      <section className="relative z-10 w-full px-0">

        <div className="w-full border-y border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">

          <div className="grid w-full gap-3 md:grid-cols-[1fr_1fr_auto]">

            {/* Search input */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">

              <Search
                className="text-slate-400"
                size={20}
              />

              <input
                type="text"
                placeholder={t("home.searchPlaceholder")}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

            </div>

            {/* Location input */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">

              <MapPin
                className="text-slate-400"
                size={20}
              />

              <input
                type="text"
                placeholder={t("home.locationPlaceholder")}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

            </div>

            {/* Search button */}
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-indigo-500 dark:hover:text-white"
            >
              <Search size={18} />
              {t("home.search")}
            </Link>

          </div>

        </div>

      </section>

      {/* ==================== STATS ==================== */}
      <section className="w-full px-6 py-16 lg:px-12 xl:px-20">

        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* Jobs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

            <BriefcaseBusiness
              className="text-indigo-600"
              size={28}
            />

            <p className="mt-4 text-3xl font-extrabold">
              +
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("home.jobsAvailable")}
            </p>

          </div>

          {/* Companies */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

            <Building2
              className="text-purple-600"
              size={28}
            />

            <p className="mt-4 text-3xl font-extrabold">
              +
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("home.companies")}
            </p>

          </div>

          {/* Candidates */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

            <Users
              className="text-indigo-600"
              size={28}
            />

            <p className="mt-4 text-3xl font-extrabold">
              +
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("home.candidates")}
            </p>

          </div>

          {/* Applications */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

            <FileCheck2
              className="text-purple-600"
              size={28}
            />

            <p className="mt-4 text-3xl font-extrabold">
              +
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("home.applications")}
            </p>

          </div>

        </div>

      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="w-full border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50">

        <div className="w-full px-6 py-20 lg:px-12 xl:px-20">

          {/* Section heading */}
          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {t("home.simpleProcess")}
            </span>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              {t("home.howTitle")}
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              {t("home.howSubtitle")}
            </p>

          </div>

          {/* Steps */}
          <div className="mt-14 grid w-full gap-8 md:grid-cols-4">

            {/* Step 1 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Users size={25} />
              </div>

              <h3 className="mt-5 font-bold">
                {t("home.step1Title")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {t("home.step1Description")}
              </p>

            </div>

            {/* Step 2 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                <Search size={25} />
              </div>

              <h3 className="mt-5 font-bold">
                {t("home.step2Title")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {t("home.step2Description")}
              </p>

            </div>

            {/* Step 3 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <FileCheck2 size={25} />
              </div>

              <h3 className="mt-5 font-bold">
                {t("home.step3Title")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {t("home.step3Description")}
              </p>

            </div>

            {/* Step 4 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                <CheckCircle2 size={25} />
              </div>

              <h3 className="mt-5 font-bold">
                {t("home.step4Title")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {t("home.step4Description")}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ==================== CTA ==================== */}
      <section className="w-full px-0 py-20">

        <div className="relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-14 text-center text-white sm:px-12">

          {/* Decorations */}
          <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              {t("home.ctaTitle")}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
              {t("home.ctaSubtitle")}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                to="/jobs"
                className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo-600 transition hover:bg-indigo-50"
              >
                {t("home.viewJobs")}
              </Link>

              <Link
                to="/register"
                className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                {t("home.createAccount")}
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
```

# src\pages\jobs\JobDetails.jsx

```jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  Send,
  Wifi,
  Briefcase,
  AlertCircle,
  Banknote,
  ChevronRight,
  MessageCircle,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  const [isFav, setIsFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [favError, setFavError] = useState("");

  useEffect(() => {
    fetchJob();

    if (user?.role === "CANDIDATE") {
      checkFavorite();
    }
  }, [id, user]);

  const fetchJob = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/jobs/${id}/`);
      setJob(res.data);
    } catch {
      setError(t("jobDetails.notFound"));
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    try {
      const res = await api.get("/favorites/");
      const list = res.data.results || res.data;

      const found = list.some(
        (favorite) => favorite.job_offer === parseInt(id)
      );

      setIsFav(found);
    } catch {
      // Ignore favorite check error
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setApplyLoading(true);
    setApplyError("");
    setApplySuccess(false);

    try {
      await api.post("/applications/", {
        job_offer: id,
      });

      setApplySuccess(true);
    } catch (err) {
      const data = err.response?.data;

      let msg = t("jobDetails.applyError");

      if (data?.detail) {
        msg = data.detail;
      } else if (data?.job_offer) {
        msg = data.job_offer.join(", ");
      } else if (data?.non_field_errors) {
        msg = data.non_field_errors.join(", ");
      } else if (typeof data === "object" && data !== null) {
        msg = JSON.stringify(data);
      }

      setApplyError(msg);
    } finally {
      setApplyLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setFavLoading(true);
    setFavError("");

    try {
      const res = await api.post("/favorites/toggle/", {
        job_offer: id,
      });

      setIsFav(res.data.favorited);
    } catch {
      setFavError(t("jobDetails.favoriteError"));
    } finally {
      setFavLoading(false);
    }
  };

  const getContractLabel = (type) => {
    const labels = {
      CDI: t("jobs.contracts.cdi"),
      CDD: t("jobs.contracts.cdd"),
      INTERNSHIP: t("jobs.contracts.internship"),
      FREELANCE: t("jobs.contracts.freelance"),
      PART_TIME: t("jobs.contracts.partTime"),
    };

    return labels[type] || type;
  };

  const getExperienceLabel = (level) => {
    const labels = {
      ENTRY: t("jobs.experience.entry"),
      JUNIOR: t("jobs.experience.junior"),
      MID: t("jobs.experience.mid"),
      SENIOR: t("jobs.experience.senior"),
    };

    return labels[level] || level;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const locale =
      i18n.language === "ar"
        ? "ar-MA"
        : i18n.language === "en"
          ? "en-US"
          : "fr-FR";

    return new Date(date).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ============================================================
  // RECRUITER
  // ============================================================

  const getRecruiterName = () => {
    if (job?.recruiter_name) {
      return job.recruiter_name;
    }

    return "Recruteur";
  };

  const getRecruiterInitials = () => {
    const name = getRecruiterName();

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const getProfilePictureUrl = (url) => {
    if (!url) return null;

    if (url.startsWith("http")) {
      return url;
    }

    const baseURL =
      api.defaults.baseURL || "http://127.0.0.1:8000/api";

    const backendURL = baseURL.replace(/\/api\/?$/, "");

    return `${backendURL}${url}`;
  };

  const recruiterPicture = getProfilePictureUrl(
    job?.recruiter_profile_picture
  );

  const goToRecruiterChat = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!job?.recruiter_user_id) {
      return;
    }

    navigate(`/chat?user=${job.recruiter_user_id}`);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse">

          <div className="mb-8 h-5 w-32 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex gap-5">
              <div className="h-16 w-16 rounded-2xl bg-slate-200 dark:bg-slate-800" />

              <div className="flex-1">
                <div className="mb-3 h-7 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
            <AlertCircle className="h-7 w-7 text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            {t("jobDetails.notFoundTitle")}
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {error}
          </p>

          <Link
            to="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("jobDetails.backToJobs")}
          </Link>
        </div>
      </main>
    );
  }

  if (!job) return null;

  const isCandidate = user?.role === "CANDIDATE";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ================================================== */}
        {/* BREADCRUMB */}
        {/* ================================================== */}

        <Link
          to="/jobs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("jobDetails.backToJobs")}
        </Link>

        {/* ================================================== */}
        {/* JOB HEADER */}
        {/* ================================================== */}

        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          {/* Gradient decoration */}

          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative p-6 sm:p-8">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

              {/* Company */}

              <div className="flex min-w-0 gap-4">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
                  <Building2 className="h-7 w-7" />
                </div>

                <div className="min-w-0">

                  <p className="mb-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {job.company_name}
                  </p>

                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {job.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">

                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location || t("jobs.locationNotSpecified")}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(job.published_at)}
                    </span>

                  </div>
                </div>
              </div>

              {/* Favorite */}

              {isCandidate && (
                <button
                  onClick={toggleFavorite}
                  disabled={favLoading}
                  aria-label={
                    isFav
                      ? t("jobDetails.removeFavorite")
                      : t("jobDetails.addFavorite")
                  }
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${
                    isFav
                      ? "border-red-200 bg-red-50 text-red-500 dark:border-red-500/20 dark:bg-red-500/10"
                      : "border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-red-500/20 dark:hover:bg-red-500/10"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFav ? "fill-current" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Badges */}

            <div className="mt-7 flex flex-wrap gap-2">

              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Briefcase className="h-3.5 w-3.5" />
                {getContractLabel(job.contract_type)}
              </span>

              <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
                {getExperienceLabel(job.experience_level)}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  job.remote
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {job.remote && (
                  <Wifi className="h-3.5 w-3.5" />
                )}

                {job.remote
                  ? t("jobs.remote")
                  : t("jobs.onsite")}
              </span>

            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* MAIN CONTENT */}
        {/* ================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div className="space-y-6">

            {/* Description */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                  <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>

                <h2 className="text-lg font-bold">
                  {t("jobDetails.description")}
                </h2>

              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                {job.description ||
                  t("jobDetails.noDescription")}
              </p>

            </section>

            {/* Skills */}

            {job.skills?.length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

                <div className="mb-6">

                  <h2 className="text-lg font-bold">
                    {t("jobDetails.skills")}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {t("jobDetails.skillsSubtitle")}
                  </p>

                </div>

                <div className="flex flex-wrap gap-2.5">

                  {job.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {skill.name}
                    </span>
                  ))}

                </div>

              </section>
            )}

            {/* Job information */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

              <h2 className="mb-6 text-lg font-bold">
                {t("jobDetails.information")}
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                    <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>

                  <div>

                    <p className="text-xs font-medium text-slate-400">
                      {t("jobDetails.location")}
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {job.location ||
                        t("jobs.locationNotSpecified")}
                    </p>

                  </div>
                </div>

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-500/10">
                    <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>

                  <div>

                    <p className="text-xs font-medium text-slate-400">
                      {t("jobDetails.contract")}
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {getContractLabel(
                        job.contract_type
                      )}
                    </p>

                  </div>
                </div>

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
                    <Wifi className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  <div>

                    <p className="text-xs font-medium text-slate-400">
                      {t("jobDetails.workMode")}
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {job.remote
                        ? t("jobs.remote")
                        : t("jobs.onsite")}
                    </p>

                  </div>
                </div>

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-500/10">
                    <Clock3 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>

                  <div>

                    <p className="text-xs font-medium text-slate-400">
                      {t("jobDetails.experience")}
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {getExperienceLabel(
                        job.experience_level
                      )}
                    </p>

                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* ================================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ================================================= */}

          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">

            {/* ================================================= */}
            {/* APPLY CARD */}
            {/* ================================================= */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white">

                <p className="text-sm font-medium text-indigo-100">
                  {t("jobDetails.interested")}
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {t("jobDetails.applyTitle")}
                </h2>

                <p className="mt-2 text-sm leading-5 text-indigo-100">
                  {t("jobDetails.applySubtitle")}
                </p>

              </div>

              <div className="p-5">

                {/* Salary */}

                {job.salary_min && job.salary_max && (
                  <div className="mb-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">

                    <div className="flex items-center gap-2">

                      <Banknote className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />

                      <span className="text-xs font-medium text-slate-400">
                        {t("jobs.salary")}
                      </span>

                    </div>

                    <p className="mt-2 text-lg font-bold">
                      {job.salary_min} – {job.salary_max}
                    </p>

                  </div>
                )}

                {/* Deadline */}

                {job.deadline && (
                  <div className="mb-5 flex items-start gap-3 rounded-2xl border border-slate-100 p-4 dark:border-slate-800">

                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                    <div>

                      <p className="text-xs text-slate-400">
                        {t("jobDetails.deadline")}
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatDate(job.deadline)}
                      </p>

                    </div>

                  </div>
                )}

                {/* Success */}

                {applySuccess && (
                  <div className="mb-4 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">

                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />

                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      {t("jobDetails.applySuccess")}
                    </p>

                  </div>
                )}

                {/* Error */}

                {applyError && (
                  <div className="mb-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">

                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />

                    <p className="text-sm text-red-700 dark:text-red-400">
                      {applyError}
                    </p>

                  </div>
                )}

                {/* Favorite error */}

                {favError && (
                  <div className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    {favError}
                  </div>
                )}

                {/* Apply */}

                {isCandidate && (
                  <button
                    onClick={handleApply}
                    disabled={applyLoading || applySuccess}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {applyLoading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        {t("jobDetails.sending")}
                      </>
                    ) : applySuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        {t("jobDetails.alreadyApplied")}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t("jobDetails.apply")}
                      </>
                    )}
                  </button>
                )}

                {!user && (
                  <div>

                    <Link
                      to="/login"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      {t("jobDetails.loginToApply")}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>

                    <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
                      {t("jobDetails.loginHint")}
                    </p>

                  </div>
                )}

                {user && !isCandidate && (
                  <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-800">

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("jobDetails.candidateOnly")}
                    </p>

                  </div>
                )}

              </div>
            </section>

            {/* ================================================= */}
            {/* COMPANY CARD */}
            {/* ================================================= */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  <Building2 className="h-5 w-5" />
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-slate-400">
                    {t("jobDetails.company")}
                  </p>

                  <h3 className="truncate font-semibold">
                    {job.company_name}
                  </h3>

                </div>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">

                <Link
                  to="/jobs"
                  className="flex items-center justify-between text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  {t("jobDetails.moreJobs")}
                  <ChevronRight className="h-4 w-4" />
                </Link>

              </div>
            </section>

            {/* ================================================= */}
            {/* RECRUITER CARD */}
            {/* ================================================= */}

            {job.recruiter_user_id && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center gap-3">

                  {/* Profile picture */}

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm">

                    {recruiterPicture ? (
                      <img
                        src={recruiterPicture}
                        alt={getRecruiterName()}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold">
                        {getRecruiterInitials()}
                      </span>
                    )}

                  </div>

                  {/* Name */}

                  <div className="min-w-0">

                    <p className="text-xs text-slate-400">
                      Recruteur
                    </p>

                    <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                      {getRecruiterName()}
                    </h3>

                    {job.recruiter_job_title && (
                      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                        {job.recruiter_job_title}
                      </p>
                    )}

                  </div>

                </div>

                {/* Recruiter information */}

                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">

                  {job.recruiter_email && (
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

                      <Mail className="h-4 w-4 shrink-0" />

                      <span className="truncate">
                        {job.recruiter_email}
                      </span>

                    </div>
                  )}

                  {job.recruiter_phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

                      <Phone className="h-4 w-4 shrink-0" />

                      <span>
                        {job.recruiter_phone}
                      </span>

                    </div>
                  )}

                </div>

                {/* Chat button */}

                {isCandidate && (
                  <button
                    onClick={goToRecruiterChat}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 hover:shadow-md"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contacter le recruteur
                  </button>
                )}

              </section>
            )}

          </aside>
        </div>
      </div>
    </main>
  );
}
```

# src\pages\jobs\Jobs.jsx

```jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  MapPin,
  Briefcase,
  Clock3,
  Wifi,
  Building2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  RotateCcw,
  ArrowUpRight,
  Plus,
  Pencil,
  FileText,
  UserRound,
Mail,
Phone,
MessageCircle,
BriefcaseBusiness,
} from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Jobs() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();

  const isRecruiter = user?.role === "RECRUITER";
  const isAdmin = user?.role === "ADMIN";
  const isRecruiterPage = location.pathname.startsWith("/recruiter/jobs");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredRecruiter, setHoveredRecruiter] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    contract_type: "",
    experience_level: "",
    remote: "",
  });

  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  const fetchJobs = async (url = "/jobs/") => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (filters.search) {
        params.append("search", filters.search);
      }

      if (filters.contract_type) {
        params.append("contract_type", filters.contract_type);
      }

      if (filters.experience_level) {
        params.append("experience_level", filters.experience_level);
      }

      if (filters.remote) {
        params.append("remote", filters.remote);
      }

      const query = params.toString();
      const fullUrl = query ? `${url}?${query}` : url;

      const res = await api.get(fullUrl);

      setJobs(res.data.results || res.data);

      setPagination({
        count: res.data.count || 0,
        next: res.data.next,
        previous: res.data.previous,
      });
    } catch (err) {
      console.error(err);
      setError(t("jobs.error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [isRecruiterPage]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const resetFilters = () => {
    const emptyFilters = {
      search: "",
      contract_type: "",
      experience_level: "",
      remote: "",
    };

    setFilters(emptyFilters);
    fetchJobs("/jobs/");
  };

  const goToPage = (url) => {
    if (!url) return;

    const relative = url.replace(
      "http://127.0.0.1:8000/api",
      ""
    );

    fetchJobs(relative);
  };

  const getContractLabel = (type) => {
    const labels = {
      CDI: t("jobs.contracts.cdi"),
      CDD: t("jobs.contracts.cdd"),
      INTERNSHIP: t("jobs.contracts.internship"),
      FREELANCE: t("jobs.contracts.freelance"),
      PART_TIME: t("jobs.contracts.partTime"),
    };

    return labels[type] || type;
  };

  const getExperienceLabel = (level) => {
    const labels = {
      ENTRY: t("jobs.experience.entry"),
      JUNIOR: t("jobs.experience.junior"),
      MID: t("jobs.experience.mid"),
      SENIOR: t("jobs.experience.senior"),
      EXPERT: "Expert",
    };

    return labels[level] || level;
  };

  const getStatusLabel = (status) => {
    const labels = {
      DRAFT: "Brouillon",
      PUBLISHED: "Publiée",
      CLOSED: "Fermée",
    };

    return labels[status] || status;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                <Briefcase className="h-4 w-4" />

                {isRecruiter && isRecruiterPage
                  ? "Espace recruteur"
                  : t("jobs.badge")}
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {isRecruiter && isRecruiterPage
                  ? "Mes offres"
                  : t("jobs.title")}
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                {isRecruiter && isRecruiterPage
                  ? "Gérez vos offres d'emploi et consultez les candidatures reçues."
                  : t("jobs.subtitle")}
              </p>
            </div>

            {/* Recruiter actions */}
            {isRecruiter && isRecruiterPage && (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  to="/recruiter/applications"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                >
                  <FileText className="h-4 w-4" />
                  Candidatures
                </Link>

                <Link
                  to="/recruiter/jobs/new"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-90"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter une offre
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ================= SEARCH & FILTERS ================= */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">

          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10">
              <SlidersHorizontal className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>

            <div>
              <h2 className="font-semibold">
                {t("jobs.searchTitle")}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t("jobs.searchSubtitle")}
              </p>
            </div>
          </div>

          <form
            onSubmit={applyFilters}
            className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder={t("jobs.searchPlaceholder")}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            {/* Contract */}
            <select
              name="contract_type"
              value={filters.contract_type}
              onChange={handleFilterChange}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="">
                {t("jobs.filters.contract")}
              </option>

              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>

              <option value="INTERNSHIP">
                {t("jobs.contracts.internship")}
              </option>

              <option value="FREELANCE">
                Freelance
              </option>

              <option value="PART_TIME">
                {t("jobs.contracts.partTime")}
              </option>
            </select>

            {/* Experience */}
            <select
              name="experience_level"
              value={filters.experience_level}
              onChange={handleFilterChange}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="">
                {t("jobs.filters.experience")}
              </option>

              <option value="ENTRY">
                {t("jobs.experience.entry")}
              </option>

              <option value="JUNIOR">
                {t("jobs.experience.junior")}
              </option>

              <option value="MID">
                {t("jobs.experience.mid")}
              </option>

              <option value="SENIOR">
                {t("jobs.experience.senior")}
              </option>
            </select>

            {/* Remote */}
            <select
              name="remote"
              value={filters.remote}
              onChange={handleFilterChange}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="">
                {t("jobs.filters.workMode")}
              </option>

              <option value="true">
                {t("jobs.remote")}
              </option>

              <option value="false">
                {t("jobs.onsite")}
              </option>
            </select>

            {/* Search button */}
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <Search className="h-4 w-4" />
              {t("jobs.filter")}
            </button>
          </form>

          {/* Reset */}
          {(filters.search ||
            filters.contract_type ||
            filters.experience_level ||
            filters.remote) && (
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t("jobs.reset")}
            </button>
          )}
        </section>

        {/* ================= RESULTS HEADER ================= */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {isRecruiter && isRecruiterPage
                ? "Mes offres"
                : t("jobs.results")}
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {pagination.count} {t("jobs.offers")}
            </p>
          </div>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-5 h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-800" />

                <div className="mb-3 h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="mb-5 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-16 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        )}

        {/* ================= JOBS ================= */}
        {!loading && jobs.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 dark:hover:shadow-indigo-950/30 sm:p-6"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm">
  {job.recruiter_profile_picture ? (
    <img
      src={job.recruiter_profile_picture}
      alt={job.recruiter_name || "Recruteur"}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
      {(job.recruiter_name || "R")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((name) => name.charAt(0).toUpperCase())
        .join("")}
    </div>
  )}
</div>

                    <div
  className="relative min-w-0"
  onMouseEnter={() => {
    if (!isRecruiterPage && job.recruiter_user_id) {
      setHoveredRecruiter(job.id);
    }
  }}
  onMouseLeave={() => {
    if (!isRecruiterPage) {
      setHoveredRecruiter(null);
    }
  }}
>
  <h3 className="truncate text-lg font-bold">
    {job.title}
  </h3>

  <button
    type="button"
    className="mt-0.5 flex items-center gap-1 text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
  >
    <Building2 className="h-3.5 w-3.5" />
    {job.company_name}
  </button>

  {/* Recruiter hover card */}
  {!isRecruiterPage &&
    hoveredRecruiter === job.id &&
    job.recruiter_user_id && (
      <div
        className="absolute left-0 top-full z-50 mt-3 w-80"
        onMouseEnter={() => setHoveredRecruiter(job.id)}
        onMouseLeave={() => setHoveredRecruiter(null)}
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg font-bold backdrop-blur">
                {(job.recruiter_name || "R")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <h4 className="truncate font-bold">
                  {job.recruiter_name || "Recruteur"}
                </h4>

                <p className="mt-0.5 truncate text-xs text-indigo-100">
                  {job.recruiter_job_title || "Recruteur"}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 p-5">

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10">
                <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-400">
                  Email
                </p>

                <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {job.recruiter_email || "Non disponible"}
                </p>
              </div>
            </div>

            {job.recruiter_phone && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-500/10">
                  <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Téléphone
                  </p>

                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {job.recruiter_phone}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <BriefcaseBusiness className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-400">
                  Offre
                </p>

                <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {job.title}
                </p>
              </div>
            </div>

            {/* Chat button */}
            <Link
              to={`/chat?user=${job.recruiter_user_id}`}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-indigo-500/30"
            >
              <MessageCircle className="h-4 w-4" />
              Contacter le recruteur
            </Link>
          </div>
        </div>
      </div>
    )}
</div>
                  </div>

                  <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-indigo-500 dark:text-slate-600" />
                </div>

                {/* Recruiter status */}
                {isRecruiter && isRecruiterPage && (
                  <div className="mt-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        job.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : job.status === "CLOSED"
                            ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      }`}
                    >
                      {getStatusLabel(job.status)}
                    </span>
                  </div>
                )}

                {/* Location */}
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {job.location || t("jobs.locationNotSpecified")}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4" />
                    {getContractLabel(job.contract_type)}
                  </span>
                </div>

                {/* Badges */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {getContractLabel(job.contract_type)}
                  </span>

                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
                    {getExperienceLabel(job.experience_level)}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      job.remote
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {job.remote ? (
                      <span className="flex items-center gap-1">
                        <Wifi className="h-3 w-3" />
                        {t("jobs.remote")}
                      </span>
                    ) : (
                      t("jobs.onsite")
                    )}
                  </span>
                </div>

                {/* Salary */}
                {job.salary_min != null &&
                  job.salary_max != null && (
                    <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                      <p className="text-xs font-medium text-slate-400">
                        {t("jobs.salary")}
                      </p>

                      <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                        {job.salary_min} – {job.salary_max}
                      </p>
                    </div>
                  )}

                {/* Skills */}
                {job.skills?.length > 0 && (
                  <div className="mt-5">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 5).map((skill) => (
                        <span
                          key={skill.id}
                          className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400"
                        >
                          {skill.name}
                        </span>
                      ))}

                      {job.skills.length > 5 && (
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800">
                          +{job.skills.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* ================= FOOTER ================= */}
                <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">

                  {/* Recruiter footer */}
                  {isRecruiter && isRecruiterPage ? (
                    <div className="grid gap-2 sm:grid-cols-3">

                      <Link
                        to={`/jobs/${job.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                        Voir
                      </Link>

                      <Link
                        to={`/recruiter/jobs/${job.id}/edit`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20"
                      >
                        <Pencil className="h-4 w-4" />
                        Modifier
                      </Link>

                      <Link
                        to="/recruiter/applications"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                      >
                        <FileText className="h-4 w-4" />
                        Candidatures
                      </Link>

                    </div>
                  ) : (
                    <Link
                      to={`/jobs/${job.id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    >
                      {t("jobs.viewDetails")}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && jobs.length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10">
              <Search className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              {isRecruiter && isRecruiterPage
                ? "Vous n'avez pas encore créé d'offre"
                : t("jobs.noResults")}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              {isRecruiter && isRecruiterPage
                ? "Commencez par créer votre première offre d'emploi."
                : t("jobs.noResultsDescription")}
            </p>

            {isRecruiter && isRecruiterPage ? (
              <Link
                to="/recruiter/jobs/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Ajouter une offre
              </Link>
            ) : (
              <button
                onClick={resetFilters}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <RotateCcw className="h-4 w-4" />
                {t("jobs.reset")}
              </button>
            )}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {!loading && jobs.length > 0 && (
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <button
              onClick={() => goToPage(pagination.previous)}
              disabled={!pagination.previous}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />

              <span className="hidden sm:inline">
                {t("jobs.previous")}
              </span>
            </button>

            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
              {t("jobs.total")} {pagination.count}
            </span>

            <button
              onClick={() => goToPage(pagination.next)}
              disabled={!pagination.next}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <span className="hidden sm:inline">
                {t("jobs.next")}
              </span>

              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
```

# src\pages\jobs\recruiter\JobForm.jsx

```jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  CircleDollarSign,
  FileText,
  MapPin,
  Save,
  Sparkles,
  Wifi,
  X,
} from "lucide-react";

import api from "../../../services/api";

export default function JobForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    contract_type: "",
    experience_level: "",
    salary_min: "",
    salary_max: "",
    remote: false,
    skill_ids: [],
    status: "DRAFT",
    deadline: "",
  });

  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(isEdit);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // LOAD SKILLS
  // =========================================================
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setSkillsLoading(true);

        const response = await api.get("/skills/");

        const data = response.data;

        if (Array.isArray(data)) {
          setSkills(data);
        } else {
          setSkills(data.results || []);
        }
      } catch (err) {
        console.error("Erreur skills :", err);

        setError(
          t(
            "jobs.form.skillsError",
            "Impossible de charger les competences."
          )
        );
      } finally {
        setSkillsLoading(false);
      }
    };

    fetchSkills();
  }, [t]);

  // =========================================================
  // LOAD JOB FOR EDIT
  // =========================================================
  useEffect(() => {
    if (!isEdit) {
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/jobs/${id}/`);

        const job = response.data;

        setForm({
          title: job.title || "",
          description: job.description || "",
          location: job.location || "",
          contract_type: job.contract_type || "",
          experience_level: job.experience_level || "",
          salary_min: job.salary_min ?? "",
          salary_max: job.salary_max ?? "",
          remote: Boolean(job.remote),

          skill_ids: Array.isArray(job.skills)
            ? job.skills.map((skill) => skill.id)
            : [],

          status: job.status || "DRAFT",

          deadline: job.deadline
            ? job.deadline.substring(0, 10)
            : "",
        });
      } catch (err) {
        console.error("Erreur job :", err);

        setError(
          err.response?.data?.detail ||
            t(
              "jobs.form.loadError",
              "Impossible de charger cette offre."
            )
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, isEdit, t]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================================================
  // SKILL SELECT
  // =========================================================
  const toggleSkill = (skillId) => {
    setForm((previous) => {
      const exists = previous.skill_ids.includes(skillId);

      return {
        ...previous,
        skill_ids: exists
          ? previous.skill_ids.filter((id) => id !== skillId)
          : [...previous.skill_ids, skillId],
      };
    });
  };

  // =========================================================
  // SUBMIT
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (!form.title.trim()) {
      setError(
        t(
          "jobs.form.titleRequired",
          "Le titre du poste est obligatoire."
        )
      );
      return;
    }

    if (!form.description.trim()) {
      setError(
        t(
          "jobs.form.descriptionRequired",
          "La description est obligatoire."
        )
      );
      return;
    }

    if (!form.contract_type) {
      setError(
        t(
          "jobs.form.contractRequired",
          "Le type de contrat est obligatoire."
        )
      );
      return;
    }

    if (!form.experience_level) {
      setError(
        t(
          "jobs.form.experienceRequired",
          "Le niveau d'experience est obligatoire."
        )
      );
      return;
    }

    if (
      form.salary_min !== "" &&
      form.salary_max !== "" &&
      Number(form.salary_min) > Number(form.salary_max)
    ) {
      setError(
        t(
          "jobs.form.salaryError",
          "Le salaire minimum ne peut pas etre superieur au salaire maximum."
        )
      );
      return;
    }

    try {
      setSaving(true);

      /*
       * IMPORTANT :
       *
       * On n'envoie PAS :
       * - company
       * - recruiter
       *
       * Le backend doit automatiquement utiliser :
       *
       * request.user
       *       |
       *       v
       * recruiter_profile
       *       |
       *       v
       * company
       */

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        location: form.location.trim(),

        contract_type: form.contract_type,
        experience_level: form.experience_level,

        salary_min:
          form.salary_min === ""
            ? null
            : Number(form.salary_min),

        salary_max:
          form.salary_max === ""
            ? null
            : Number(form.salary_max),

        remote: form.remote,

        skill_ids: form.skill_ids,

        status: form.status,

        deadline: form.deadline || null,
      };

      if (isEdit) {
        await api.put(`/jobs/${id}/`, payload);
      } else {
        await api.post("/jobs/", payload);
      }

      setSuccess(
        isEdit
          ? t(
              "jobs.form.updateSuccess",
              "Offre modifiee avec succes."
            )
          : t(
              "jobs.form.createSuccess",
              "Offre creee avec succes."
            )
      );

      setTimeout(() => {
        navigate("/recruiter/jobs");
      }, 500);
    } catch (err) {
      console.error("Erreur sauvegarde :", err);

      const data = err.response?.data;

      if (data && typeof data === "object") {
        const messages = Object.entries(data)
          .map(([field, message]) => {
            if (Array.isArray(message)) {
              return `${field}: ${message.join(", ")}`;
            }

            return `${field}: ${message}`;
          })
          .join("\n");

        setError(
          messages ||
            t(
              "jobs.form.saveError",
              "Une erreur est survenue."
            )
        );
      } else {
        setError(
          t(
            "jobs.form.saveError",
            "Impossible de sauvegarder l'offre."
          )
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">

          <div className="animate-pulse">
            <div className="mb-4 h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />

            <div className="mb-3 h-10 w-80 rounded bg-slate-200 dark:bg-slate-800" />

            <div className="mb-8 h-5 w-96 max-w-full rounded bg-slate-200 dark:bg-slate-800" />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="space-y-6">
                <div className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-32 rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          </div>

        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* =================================================
            BACK
        ================================================= */}
        <Link
          to="/recruiter/jobs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" />

          {t(
            "jobs.form.back",
            "Retour aux offres"
          )}
        </Link>

        {/* =================================================
            HEADER
        ================================================= */}
        <section className="mb-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">

                <Briefcase className="h-4 w-4" />

                {isEdit
                  ? t(
                      "jobs.form.editBadge",
                      "Espace recruteur"
                    )
                  : t(
                      "jobs.form.newBadge",
                      "Espace recruteur"
                    )}

              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">

                {isEdit
                  ? t(
                      "jobs.form.editTitle",
                      "Modifier l'offre"
                    )
                  : t(
                      "jobs.form.newTitle",
                      "Creer une offre"
                    )}

              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">

                {isEdit
                  ? t(
                      "jobs.form.editSubtitle",
                      "Modifiez les informations de votre offre d'emploi."
                    )
                  : t(
                      "jobs.form.newSubtitle",
                      "Publiez une nouvelle offre d'emploi sur JobConnect."
                    )}

              </p>

            </div>

            {/* Company information */}
            <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 dark:border-indigo-500/20 dark:bg-indigo-500/10">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-500/20">
                <Building2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.companyAuto",
                    "Entreprise"
                  )}
                </p>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {t(
                    "jobs.form.companyAutomatic",
                    "Associee automatiquement"
                  )}
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            ERROR
        ================================================= */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">

            <X className="mt-0.5 h-4 w-4 shrink-0" />

            <p className="whitespace-pre-line">
              {error}
            </p>

          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}
        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">

            <Check className="h-4 w-4" />

            {success}

          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  {t(
                    "jobs.form.basicTitle",
                    "Informations generales"
                  )}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.basicSubtitle",
                    "Presentez votre offre d'emploi."
                  )}
                </p>
              </div>

            </div>

            {/* TITLE */}
            <div className="mb-6">

              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold"
              >
                {t(
                  "jobs.form.title",
                  "Titre du poste"
                )}
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder={t(
                  "jobs.form.titlePlaceholder",
                  "Ex: Developpeur React"
                )}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />

            </div>

            {/* DESCRIPTION */}
            <div>

              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold"
              >
                {t(
                  "jobs.form.description",
                  "Description"
                )}
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={7}
                placeholder={t(
                  "jobs.form.descriptionPlaceholder",
                  "Decrivez le poste, les missions et les responsabilites..."
                )}
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* =================================================
              JOB DETAILS
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-500/10">
                <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  {t(
                    "jobs.form.detailsTitle",
                    "Details du poste"
                  )}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.detailsSubtitle",
                    "Definissez les caracteristiques du poste."
                  )}
                </p>
              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* LOCATION */}
              <div>

                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.location",
                    "Localisation"
                  )}
                </label>

                <div className="relative">

                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    placeholder={t(
                      "jobs.form.locationPlaceholder",
                      "Ex: Casablanca"
                    )}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                  />

                </div>

              </div>

              {/* CONTRACT */}
              <div>

                <label
                  htmlFor="contract_type"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.contract",
                    "Type de contrat"
                  )}
                </label>

                <select
                  id="contract_type"
                  name="contract_type"
                  value={form.contract_type}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >

                  <option value="">
                    {t(
                      "jobs.form.select",
                      "Selectionner"
                    )}
                  </option>

                  <option value="CDI">CDI</option>

                  <option value="CDD">CDD</option>

                  <option value="INTERNSHIP">
                    {t(
                      "jobs.contracts.internship",
                      "Stage"
                    )}
                  </option>

                  <option value="FREELANCE">
                    {t(
                      "jobs.contracts.freelance",
                      "Freelance"
                    )}
                  </option>

                  <option value="PART_TIME">
                    {t(
                      "jobs.contracts.partTime",
                      "Temps partiel"
                    )}
                  </option>

                </select>

              </div>

              {/* EXPERIENCE */}
              <div>

                <label
                  htmlFor="experience_level"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.experience",
                    "Niveau d'experience"
                  )}
                </label>

                <select
                  id="experience_level"
                  name="experience_level"
                  value={form.experience_level}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >

                  <option value="">
                    {t(
                      "jobs.form.select",
                      "Selectionner"
                    )}
                  </option>

                  <option value="ENTRY">
                    {t(
                      "jobs.experience.entry",
                      "Debutant"
                    )}
                  </option>

                  <option value="JUNIOR">
                    {t(
                      "jobs.experience.junior",
                      "Junior"
                    )}
                  </option>

                  <option value="MID">
                    {t(
                      "jobs.experience.mid",
                      "Intermediaire"
                    )}
                  </option>

                  <option value="SENIOR">
                    {t(
                      "jobs.experience.senior",
                      "Senior"
                    )}
                  </option>

                  <option value="EXPERT">
                    Expert
                  </option>

                </select>

              </div>

              {/* DEADLINE */}
              <div>

                <label
                  htmlFor="deadline"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.deadline",
                    "Date limite"
                  )}
                </label>

                <div className="relative">

                  <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              SALARY
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
                <CircleDollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  {t(
                    "jobs.form.salaryTitle",
                    "Remuneration"
                  )}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.salarySubtitle",
                    "Indiquez la fourchette salariale."
                  )}
                </p>
              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label
                  htmlFor="salary_min"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.salaryMin",
                    "Salaire minimum"
                  )}
                </label>

                <input
                  id="salary_min"
                  name="salary_min"
                  type="number"
                  min="0"
                  value={form.salary_min}
                  onChange={handleChange}
                  placeholder="6000"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />

              </div>

              <div>

                <label
                  htmlFor="salary_max"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.salaryMax",
                    "Salaire maximum"
                  )}
                </label>

                <input
                  id="salary_max"
                  name="salary_max"
                  type="number"
                  min="0"
                  value={form.salary_max}
                  onChange={handleChange}
                  placeholder="10000"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              WORK MODE
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                  <Wifi className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>

                <div>

                  <h2 className="font-semibold">
                    {t(
                      "jobs.form.remoteTitle",
                      "Mode de travail"
                    )}
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t(
                      "jobs.form.remoteSubtitle",
                      "Definissez si le poste est a distance."
                    )}
                  </p>

                </div>

              </div>

              <label className="relative inline-flex cursor-pointer items-center">

                <input
                  type="checkbox"
                  name="remote"
                  checked={form.remote}
                  onChange={handleChange}
                  className="peer sr-only"
                />

                <div className="h-7 w-12 rounded-full bg-slate-200 transition peer-checked:bg-indigo-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500/30 dark:bg-slate-700">
                  <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
                </div>

              </label>

            </div>

            <div className="mt-4">

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  form.remote
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >

                {form.remote ? (
                  <>
                    <Wifi className="h-3 w-3" />

                    {t(
                      "jobs.remote",
                      "Remote"
                    )}
                  </>
                ) : (
                  <>
                    <MapPin className="h-3 w-3" />

                    {t(
                      "jobs.onsite",
                      "Sur site"
                    )}
                  </>
                )}

              </span>

            </div>

          </div>

          {/* =================================================
              SKILLS
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-500/10">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>

              <div>

                <h2 className="font-semibold">
                  {t(
                    "jobs.form.skillsTitle",
                    "Competences"
                  )}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.skillsSubtitle",
                    "Selectionnez les competences recherchees."
                  )}
                </p>

              </div>

            </div>

            {skillsLoading ? (
              <div className="flex flex-wrap gap-2">

                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-9 w-24 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800"
                  />
                ))}

              </div>
            ) : skills.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center dark:border-slate-700">

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.noSkills",
                    "Aucune competence disponible."
                  )}
                </p>

              </div>
            ) : (
              <div className="flex flex-wrap gap-2">

                {skills.map((skill) => {

                  const selected =
                    form.skill_ids.includes(skill.id);

                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkill(skill.id)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
                        selected
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-500/10 dark:text-indigo-400"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                      }`}
                    >

                      {selected && (
                        <Check className="h-3.5 w-3.5" />
                      )}

                      {skill.name}

                    </button>
                  );
                })}

              </div>
            )}

          </div>

          {/* =================================================
              STATUS
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="mb-4">

              <h2 className="font-semibold">
                {t(
                  "jobs.form.statusTitle",
                  "Statut de l'offre"
                )}
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {t(
                  "jobs.form.statusSubtitle",
                  "Choisissez si l'offre doit etre publiee ou gardee en brouillon."
                )}
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-3">

              {/* DRAFT */}
              <button
                type="button"
                onClick={() =>
                  setForm((previous) => ({
                    ...previous,
                    status: "DRAFT",
                  }))
                }
                className={`rounded-xl border p-4 text-left transition ${
                  form.status === "DRAFT"
                    ? "border-amber-300 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10"
                    : "border-slate-200 hover:border-amber-200 dark:border-slate-700 dark:hover:border-amber-500/30"
                }`}
              >

                <p className="text-sm font-semibold">
                  {t(
                    "jobs.form.draft",
                    "Brouillon"
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.draftDescription",
                    "L'offre ne sera pas visible publiquement."
                  )}
                </p>

              </button>

              {/* PUBLISHED */}
              <button
                type="button"
                onClick={() =>
                  setForm((previous) => ({
                    ...previous,
                    status: "PUBLISHED",
                  }))
                }
                className={`rounded-xl border p-4 text-left transition ${
                  form.status === "PUBLISHED"
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                    : "border-slate-200 hover:border-emerald-200 dark:border-slate-700 dark:hover:border-emerald-500/30"
                }`}
              >

                <p className="text-sm font-semibold">
                  {t(
                    "jobs.form.published",
                    "Publier"
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.publishedDescription",
                    "L'offre sera visible par les candidats."
                  )}
                </p>

              </button>

              {/* CLOSED */}
              <button
                type="button"
                onClick={() =>
                  setForm((previous) => ({
                    ...previous,
                    status: "CLOSED",
                  }))
                }
                className={`rounded-xl border p-4 text-left transition ${
                  form.status === "CLOSED"
                    ? "border-red-300 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10"
                    : "border-slate-200 hover:border-red-200 dark:border-slate-700 dark:hover:border-red-500/30"
                }`}
              >

                <p className="text-sm font-semibold">
                  {t(
                    "jobs.form.closed",
                    "Fermee"
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.closedDescription",
                    "L'offre ne sera plus disponible."
                  )}
                </p>

              </button>

            </div>

          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}
          <div className="flex flex-col-reverse gap-3 bg-slate-50 p-6 dark:bg-slate-950/40 sm:flex-row sm:justify-end sm:p-8">

            <Link
              to="/recruiter/jobs"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />

              {t(
                "jobs.form.cancel",
                "Annuler"
              )}

            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  {t(
                    "jobs.form.saving",
                    "Enregistrement..."
                  )}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />

                  {isEdit
                    ? t(
                        "jobs.form.saveChanges",
                        "Enregistrer les modifications"
                      )
                    : t(
                        "jobs.form.create",
                        "Creer l'offre"
                      )}
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </main>
  );
}
```

# src\pages\messaging\Chat.jsx

```jsx
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

```

# src\pages\NotFound.jsx

```jsx
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/404.svg";

function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-slate-50 px-6 py-12 text-slate-900 dark:bg-slate-950 dark:text-white">
      
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 text-center md:flex-row md:text-left">

        {/* Image */}
        <div className="w-full max-w-md">
          <img
            src={NotFoundImage}
            alt="Page introuvable"
            className="mx-auto w-full"
          />
        </div>

        {/* Content */}
        <div className="max-w-md">

          <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            404
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Page introuvable
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:opacity-95"
          >
            Retour à l'accueil
          </Link>

        </div>

      </div>

    </main>
  );
}

export default NotFound;


```

# src\pages\profile\Profile.jsx

```jsx
import { useEffect, useState } from "react";
import {
  Camera,
  CheckCircle2,
  Edit3,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  Upload,
  User,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

/* =========================================================
   HELPERS
========================================================= */

function getInitials(user, profile) {
  const firstName =
    user?.first_name || profile?.user_first_name || "";

  const lastName =
    user?.last_name || profile?.user_last_name || "";

  if (firstName || lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  const email =
    user?.email || profile?.user_email || "";

  if (email) {
    return email.charAt(0).toUpperCase();
  }

  return "U";
}

function normalizeUrl(url) {
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  if (url.startsWith("/")) {
    return `http://127.0.0.1:8000${url}`;
  }

  return `http://127.0.0.1:8000/${url}`;
}

function safeText(value, fallback = "") {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === "object") {
    if (value.name) return String(value.name);
    if (value.company_name) return String(value.company_name);
    if (value.title) return String(value.title);
    if (value.label) return String(value.label);

    return fallback;
  }

  return String(value);
}

/* =========================================================
   GITHUB LOGO
========================================================= */

function GitHubLogo({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
        0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465
        -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
        .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.688
        -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004
        1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65
        .64.701 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855
        0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017
        C22 6.484 17.523 2 12 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* =========================================================
   LINKEDIN LOGO
========================================================= */

function LinkedInLogo({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.606 0 4.267 2.373 4.267 5.461v6.28ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM3.555 20.452h3.558V9H3.555v11.452Z" />
    </svg>
  );
}

/* =========================================================
   PROFILE FIELD
========================================================= */

function ProfileField({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {label}
          </p>

          <p className="mt-1 break-words text-sm font-semibold text-gray-900 dark:text-white">
            {safeText(value, "Non renseigné")}
          </p>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-sm
          text-gray-900
          outline-none
          transition
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-500/20
          dark:border-gray-600
          dark:bg-gray-800
          dark:text-white
          dark:placeholder-gray-500
        "
      />

    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    bio: "",
    linkedin_url: "",
    github_url: "",
    job_title: "",
    company: "",
  });

  const [cvFile, setCvFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  /* =======================================================
     ROLE
  ======================================================= */

  const role = String(
    user?.role ||
      user?.user_type ||
      user?.account_type ||
      ""
  ).toUpperCase();

  const isRecruiter = role === "RECRUITER";

  const endpoint = isRecruiter
    ? "/accounts/recruiters/"
    : "/accounts/candidates/";

  /* =======================================================
     DISPLAY NAME
  ======================================================= */

  const displayName =
    user?.first_name || user?.last_name
      ? `${user?.first_name || ""} ${user?.last_name || ""}`.trim()
      : user?.username ||
        profile?.name ||
        user?.email?.split("@")[0] ||
        "Utilisateur";

  /* =======================================================
     FILL FORM
  ======================================================= */

  const fillForm = (profileData) => {
    const companyValue =
      typeof profileData?.company === "object"
        ? profileData?.company?.id || ""
        : profileData?.company || "";

    setFormData({
      phone: profileData?.phone || "",
      location: profileData?.location || "",
      bio: profileData?.bio || "",
      linkedin_url: profileData?.linkedin_url || "",
      github_url: profileData?.github_url || "",
      job_title: profileData?.job_title || "",
      company: companyValue,
    });

    setPhotoPreview(
      normalizeUrl(profileData?.profile_picture || "")
    );
  };

  /* =======================================================
     EXTRACT PROFILE
  ======================================================= */

  const extractProfile = (data) => {
    if (Array.isArray(data)) {
      return data.length > 0 ? data[0] : null;
    }

    if (Array.isArray(data?.results)) {
      return data.results.length > 0 ? data.results[0] : null;
    }

    if (data && typeof data === "object") {
      return data;
    }

    return null;
  };

  /* =======================================================
     FETCH
  ======================================================= */

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get(endpoint);

      console.log("PROFILE RESPONSE =", response.data);

      const profileData = extractProfile(response.data);

      if (profileData) {
        setProfile(profileData);
        fillForm(profileData);
      } else {
        setProfile(null);
      }

    } catch (err) {
      console.error("PROFILE ERROR =", err);

      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Impossible de charger le profil.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(() => {
    fetchProfile();
  }, [user, endpoint]);

  /* =======================================================
     CHANGE
  ======================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     PHOTO
  ======================================================= */

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image valide.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("La photo ne doit pas dépasser 5 MB.");
      return;
    }

    setError("");

    setPhotoFile(file);

    const previewUrl = URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  /* =======================================================
     CV
  ======================================================= */

  const handleCvChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const extension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    const allowedExtensions = [
      "pdf",
      "doc",
      "docx",
    ];

    if (!allowedExtensions.includes(extension)) {
      setError(
        "Le CV doit être au format PDF, DOC ou DOCX."
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Le CV ne doit pas dépasser 10 MB.");
      return;
    }

    setError("");
    setCvFile(file);
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = async () => {
    if (!profile?.id) {
      setError("Profil introuvable.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const hasFiles = cvFile || photoFile;

      let dataToSend;

      if (hasFiles) {
        const form = new FormData();

        form.append(
          "phone",
          formData.phone || ""
        );

        form.append(
          "location",
          formData.location || ""
        );

        form.append(
          "bio",
          formData.bio || ""
        );

        form.append(
          "linkedin_url",
          formData.linkedin_url || ""
        );

        form.append(
          "github_url",
          formData.github_url || ""
        );

        if (isRecruiter) {
          form.append(
            "job_title",
            formData.job_title || ""
          );

          if (formData.company) {
            form.append(
              "company",
              formData.company
            );
          }
        }

        if (cvFile) {
          form.append("cv", cvFile);
        }

        if (photoFile) {
          form.append(
            "profile_picture",
            photoFile
          );
        }

        dataToSend = form;

      } else {
        dataToSend = {
          phone: formData.phone || "",
          location: formData.location || "",
          bio: formData.bio || "",
          linkedin_url:
            formData.linkedin_url || "",
          github_url:
            formData.github_url || "",
        };

        if (isRecruiter) {
          dataToSend.job_title =
            formData.job_title || "";

          if (formData.company) {
            dataToSend.company =
              formData.company;
          }
        }
      }

      await api.patch(
        `${endpoint}${profile.id}/`,
        dataToSend
      );

      setSuccess(
        "Profil mis à jour avec succès."
      );

      setCvFile(null);
      setPhotoFile(null);

      setEditing(false);

      await fetchProfile();

    } catch (err) {
      console.error(
        "SAVE PROFILE ERROR =",
        err
      );

      console.error(
        "SERVER RESPONSE =",
        err?.response?.data
      );

      const serverData =
        err?.response?.data;

      let message =
        "Impossible de mettre à jour le profil.";

      if (typeof serverData === "string") {
        message = serverData;
      } else if (serverData?.detail) {
        message = serverData.detail;
      } else if (
        serverData &&
        typeof serverData === "object"
      ) {
        const firstError =
          Object.values(serverData)[0];

        if (Array.isArray(firstError)) {
          message = firstError[0];
        } else if (
          typeof firstError === "string"
        ) {
          message = firstError;
        }
      }

      setError(message);

    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     CANCEL
  ======================================================= */

  const handleCancel = () => {
    if (profile) {
      fillForm(profile);
    }

    setCvFile(null);
    setPhotoFile(null);

    setEditing(false);
    setError("");
  };

  /* =======================================================
     URLS
  ======================================================= */

  const cvUrl = normalizeUrl(profile?.cv);

  const linkedinUrl = normalizeUrl(
    profile?.linkedin_url || ""
  );

  const githubUrl = normalizeUrl(
    profile?.github_url || ""
  );

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">

          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Chargement du profil...
          </p>

        </div>
      </div>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

      {/* =====================================================
          PROFILE HEADER
      ===================================================== */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-indigo-600
          shadow-lg
        "
      >

        {/* ===================================================
            PROFILE AREA
            UNE SEULE COULEUR :
            INDIGO-600
        =================================================== */}

        <div
          className="
            relative
            px-5
            pb-7
            pt-5
            sm:px-8
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              gap-5
              sm:flex-row
              sm:items-center
            "
          >

            {/* =================================================
                PHOTO
            ================================================= */}

            <div className="relative shrink-0">

              <div
                className="
                  flex
                  h-32
                  w-32
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border-4
                  border-white
                  bg-white
                  text-3xl
                  font-bold
                  text-indigo-600
                  shadow-xl
                "
              >

                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  getInitials(
                    user,
                    profile
                  )
                )}

              </div>

              {editing && (
                <label
                  htmlFor="profile-picture"
                  className="
                    absolute
                    bottom-0
                    right-0
                    flex
                    h-10
                    w-10
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-white
                    bg-indigo-600
                    text-white
                    shadow-lg
                    transition
                    hover:bg-indigo-700
                  "
                >

                  <Camera className="h-5 w-5" />

                  <input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />

                </label>
              )}

            </div>

            {/* =================================================
                NAME / ROLE / EMAIL

                MÊME COULEUR QUE LE BACKGROUND
                PAS DE DARK COLOR
            ================================================= */}

            <div
              className="
                min-w-0
                flex-1
                text-center
                text-white
                sm:text-left
              "
            >

              {/* NOM */}

              <h1
                className="
                  truncate
                  text-3xl
                  font-extrabold
                  leading-tight
                  text-white
                "
              >
                {displayName}
              </h1>

              {/* ROLE */}

              <p
                className="
                  mt-2
                  text-base
                  font-semibold
                  text-white
                "
              >
                {isRecruiter
                  ? safeText(
                      profile?.job_title,
                      "Recruteur"
                    )
                  : "Candidat"}
              </p>

              {/* EMAIL */}

              {user?.email && (
                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    text-white
                    sm:justify-start
                  "
                >

                  <Mail className="h-4 w-4 shrink-0 text-white" />

                  <span className="truncate">
                    {user.email}
                  </span>

                </div>
              )}

            </div>

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              justify-center
              gap-3
              sm:justify-end
            "
          >

            {!editing ? (
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccess("");
                  setEditing(true);
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-indigo-600
                  transition
                  hover:bg-gray-100
                "
              >

                <Edit3 className="h-4 w-4" />

                Modifier le profil

              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-indigo-600
                    transition
                    hover:bg-gray-100
                    disabled:opacity-50
                  "
                >

                  <X className="h-4 w-4" />

                  Annuler

                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-indigo-600
                    transition
                    hover:bg-gray-100
                    disabled:opacity-50
                  "
                >

                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}

                  {saving
                    ? "Enregistrement..."
                    : "Enregistrer"}

                </button>
              </>
            )}

          </div>

        </div>
      </div>

      {/* =====================================================
          MESSAGES
      ===================================================== */}

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">

          <CheckCircle2 className="h-5 w-5 shrink-0" />

          {success}

        </div>
      )}

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        {/* ===================================================
            LEFT
        =================================================== */}

        <div className="space-y-6 lg:col-span-2">

          {/* =================================================
              INFORMATIONS PERSONNELLES
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-6">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Informations personnelles
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Vos coordonnées et informations principales.
              </p>

            </div>

            {!editing ? (
              <div className="grid gap-4 sm:grid-cols-2">

                {/* LOCALISATION UNIQUEMENT ICI */}

                <ProfileField
                  icon={MapPin}
                  label="Localisation"
                  value={profile?.location}
                />

                <ProfileField
                  icon={Phone}
                  label="Téléphone"
                  value={profile?.phone}
                />

                {isRecruiter && (
                  <>
                    <ProfileField
                      icon={User}
                      label="Poste"
                      value={profile?.job_title}
                    />

                    <ProfileField
                      icon={User}
                      label="Entreprise"
                      value={profile?.company}
                    />
                  </>
                )}

              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">

                <InputField
                  label="Téléphone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="Votre numéro"
                />

                {/* LOCALISATION UNIQUEMENT ICI */}

                <InputField
                  label="Localisation"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="Casablanca, Maroc"
                />

                {isRecruiter && (
                  <>
                    <InputField
                      label="Poste"
                      value={formData.job_title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          job_title: e.target.value,
                        }))
                      }
                      placeholder="Ex: Responsable RH"
                    />

                    <InputField
                      label="Entreprise"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="ID de l'entreprise"
                    />
                  </>
                )}

              </div>
            )}

          </section>

          {/* =================================================
              BIO
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-6">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                À propos de moi
              </h2>

            </div>

            {!editing ? (
              <p className="whitespace-pre-line break-words text-sm leading-7 text-gray-600 dark:text-gray-300">
                {safeText(
                  profile?.bio,
                  "Aucune description renseignée."
                )}
              </p>
            ) : (
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
                rows={6}
                placeholder="Présentez-vous..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/20
                  dark:border-gray-600
                  dark:bg-gray-800
                  dark:text-white
                "
              />
            )}

          </section>

          {/* =================================================
              SOCIAL
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-6">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Réseaux professionnels
              </h2>

            </div>

            {!editing ? (
              <div className="grid gap-4 sm:grid-cols-2">

                {linkedinUrl ? (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-gray-200
                      p-4
                      text-gray-700
                      transition
                      hover:border-indigo-300
                      hover:text-indigo-600
                      dark:border-gray-700
                      dark:text-gray-200
                    "
                  >
                    <LinkedInLogo className="h-5 w-5" />

                    <span className="text-sm font-semibold">
                      LinkedIn
                    </span>
                  </a>
                ) : (
                  <div className="rounded-xl border border-gray-200 p-4 text-sm text-gray-400 dark:border-gray-700">
                    LinkedIn non renseigné
                  </div>
                )}

                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-gray-200
                      p-4
                      text-gray-700
                      transition
                      hover:border-indigo-300
                      hover:text-indigo-600
                      dark:border-gray-700
                      dark:text-gray-200
                    "
                  >
                    <GitHubLogo className="h-5 w-5" />

                    <span className="text-sm font-semibold">
                      GitHub
                    </span>
                  </a>
                ) : (
                  <div className="rounded-xl border border-gray-200 p-4 text-sm text-gray-400 dark:border-gray-700">
                    GitHub non renseigné
                  </div>
                )}

              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">

                <InputField
                  label="LinkedIn"
                  value={formData.linkedin_url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      linkedin_url: e.target.value,
                    }))
                  }
                  placeholder="https://linkedin.com/in/..."
                />

                <InputField
                  label="GitHub"
                  value={formData.github_url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      github_url: e.target.value,
                    }))
                  }
                  placeholder="https://github.com/..."
                />

              </div>
            )}

          </section>
        </div>

        {/* ===================================================
            RIGHT
        =================================================== */}

        <div className="space-y-6">

          {/* =================================================
              CV
          ================================================= */}

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <div className="bg-indigo-600 px-5 py-4">

              <div className="flex items-center gap-3 text-white">

                <FileText className="h-6 w-6" />

                <div>

                  <h2 className="font-bold">
                    Curriculum Vitae
                  </h2>

                  <p className="text-xs text-white/80">
                    PDF, DOC ou DOCX · 10 MB max
                  </p>

                </div>

              </div>

            </div>

            <div className="p-5">

              {cvUrl ? (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        CV disponible
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Votre CV est enregistré.
                      </p>

                    </div>

                  </div>

                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      mt-4
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-indigo-600
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-indigo-700
                    "
                  >
                    <FileText className="h-4 w-4" />
                    Voir le CV
                  </a>

                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 p-5 text-center dark:border-gray-600">

                  <FileText className="mx-auto h-8 w-8 text-gray-400" />

                  <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                    Aucun CV ajouté
                  </p>

                </div>
              )}

              {editing && (
                <div className="mt-4">

                  <label
                    htmlFor="cv-upload"
                    className="
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-indigo-200
                      bg-indigo-50
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-indigo-700
                      transition
                      hover:bg-indigo-100
                      dark:border-indigo-900
                      dark:bg-indigo-950
                      dark:text-indigo-300
                    "
                  >

                    <Upload className="h-4 w-4" />

                    {cvFile
                      ? cvFile.name
                      : cvUrl
                        ? "Remplacer le CV"
                        : "Ajouter un CV"}

                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleCvChange}
                    />

                  </label>

                </div>
              )}

            </div>
          </section>

          {/* =================================================
              ACCOUNT
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              Compte
            </h2>

            <div className="space-y-4">

              <div>

                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.email || "Non renseigné"}
                </p>

              </div>

              <div>

                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Type de compte
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {isRecruiter
                    ? "Recruteur"
                    : "Candidat"}
                </p>

              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
} 
```

# src\services\api.js

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // IMPORTANT :
    // Si on envoie FormData, on ne doit PAS forcer
    // Content-Type: application/json.
    // Le navigateur/Axios va automatiquement ajouter :
    // multipart/form-data; boundary=...
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Si pas d'erreur 401, on retourne simplement l'erreur
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Évite une boucle infinie
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/refresh/",
        {
          refresh: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newAccessToken = response.data.access;

      localStorage.setItem("access_token", newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Si la requête originale contenait FormData,
      // on conserve son body.
      return api(originalRequest);
    } catch (refreshError) {
      localStorage.clear();
      window.location.href = "/login";

      return Promise.reject(refreshError);
    }
  }
);

export default api;
```

# src\services\websocket.js

```js
const WS_BASE_URL = "ws://127.0.0.1:8000";

export function createChatSocket(conversationId, accessToken) {
  if (!conversationId) {
    throw new Error("conversationId est requis");
  }

  if (!accessToken) {
    throw new Error("Access token est requis");
  }

  const url = `${WS_BASE_URL}/ws/chat/${conversationId}/?token=${encodeURIComponent(
    accessToken
  )}`;

  const socket = new WebSocket(url);

  return socket;
}

```

# vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  
})
```

