import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, X, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const navRef = useRef(null);
  const langRef = useRef(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Dark mode
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

  // Language direction
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLanguageOpen(false);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    setLanguageOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setLanguageOpen(false);
  };

  const currentLanguage = i18n.language?.startsWith("ar")
    ? "AR"
    : i18n.language?.startsWith("en")
      ? "EN"
      : "FR";

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm font-medium transition ${
      isActive(path)
        ? "text-primary"
        : "text-slate-600 hover:text-primary dark:text-slate-300"
    }`;

  const mobileLinkClass = (path) =>
    `rounded-lg px-4 py-3 text-sm ${
      isActive(path)
        ? "font-semibold text-primary bg-slate-100 dark:bg-slate-900"
        : "font-medium text-slate-700 hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-900"
    }`;

  const formatRole = (role) => {
    if (!role) return "";
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="text-2xl font-bold tracking-tight"
        >
          <span className="text-primary">Job</span>
          <span className="text-secondary">Connect</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-5 md:flex">
          <Link to="/" className={navLinkClass("/")}>
            {t("nav.home")}
          </Link>

          <Link to="/jobs" className={navLinkClass("/jobs")}>
            {t("nav.jobs")}
          </Link>

          {user?.role === "CANDIDATE" && (
            <Link to="/applications" className={navLinkClass("/applications")}>
              {t("nav.applications")}
            </Link>
          )}

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden text-right lg:block rtl:text-left">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {user.first_name || user.username}
                </p>
                <p className="text-xs text-primary">{formatRole(user.role)}</p>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-red-950/30"
              >
                {t("nav.logout")}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className={navLinkClass("/login")}>
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

          {/* Language */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex h-10 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
            >
              {currentLanguage}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {languageOpen && (
              <div className="absolute end-0 mt-2 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <button
                  onClick={() => changeLanguage("fr")}
                  className="w-full rounded-md px-3 py-2 text-start text-sm hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Français
                </button>
                <button
                  onClick={() => changeLanguage("en")}
                  className="w-full rounded-md px-3 py-2 text-start text-sm hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("ar")}
                  className="w-full rounded-md px-3 py-2 text-start text-sm hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  العربية
                </button>
              </div>
            )}
          </div>

          {/* Dark mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Light mode" : "Dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Light mode" : "Dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={mobileLinkClass("/")}
            >
              {t("nav.home")}
            </Link>

            <Link
              to="/jobs"
              onClick={closeMobileMenu}
              className={mobileLinkClass("/jobs")}
            >
              {t("nav.jobs")}
            </Link>

            {user?.role === "CANDIDATE" && (
              <Link
                to="/applications"
                onClick={closeMobileMenu}
                className={mobileLinkClass("/applications")}
              >
                {t("nav.applications")}
              </Link>
            )}

            <div className="my-2 border-t border-slate-200 dark:border-slate-800" />

            {/* Mobile language */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => changeLanguage("fr")}
                className={`rounded-lg px-3 py-2 text-sm ${
                  currentLanguage === "FR"
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`rounded-lg px-3 py-2 text-sm ${
                  currentLanguage === "EN"
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("ar")}
                className={`rounded-lg px-3 py-2 text-sm ${
                  currentLanguage === "AR"
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                AR
              </button>
            </div>

            {user ? (
              <>
                <div className="mt-2 rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {user.first_name || user.username}
                  </p>
                  <p className="text-xs text-primary">{formatRole(user.role)}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-lg px-4 py-3 text-start text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className={mobileLinkClass("/login")}
                >
                  {t("nav.login")}
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}