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
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navRef = useRef(null);
  const langRef = useRef(null);
  const profileRef = useRef(null);

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
    document.documentElement.dir =
      i18n.language === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        langRef.current &&
        !langRef.current.contains(e.target)
      ) {
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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);

    setLanguageOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setLanguageOpen(false);
    setProfileOpen(false);
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
        ? "bg-slate-100 font-semibold text-primary dark:bg-slate-900"
        : "font-medium text-slate-700 hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-900"
    }`;

  const formatRole = (role) => {
    if (!role) return "";

    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  // User name
  const firstName = user?.first_name || "";
  const lastName = user?.last_name || "";

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    user?.username ||
    "User";

  // Initials
  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }

    if (firstName) {
      return firstName.substring(0, 2).toUpperCase();
    }

    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }

    return "U";
  };

  // Support several possible API field names
  const profileImage =
    user?.profile_picture ||
    user?.avatar ||
    user?.photo ||
    user?.profile?.profile_picture ||
    user?.profile?.avatar ||
    null;

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


          <Link to="/jobs" className={navLinkClass("/jobs")}>
            {t("nav.jobs")}
          </Link>

          {user?.role === "CANDIDATE" && (
            <>
              <Link
                to="/applications"
                className={navLinkClass("/applications")}
              >
                {t("nav.applications")}
              </Link>

              {/* Favorites */}
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
            </>
          )}

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">

              {/* Profile dropdown */}
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
                  {/* Avatar */}
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={fullName}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-500/20"
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
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute end-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">

                    {/* User info */}
                    <div className="mb-1 flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-3 dark:bg-slate-800">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={fullName}
                          className="h-10 w-10 rounded-full object-cover"
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

                    {/* Profile */}
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary"
                    >
                      <User size={17} />
                      {t("nav.profile")}
                    </Link>

                    {/* Logout */}
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

          {/* Language */}
          <div className="relative" ref={langRef}>
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
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {languageOpen && (
              <div className="absolute end-0 mt-2 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">

                <button
                  onClick={() => changeLanguage("fr")}
                  className="w-full rounded-md px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Français
                </button>

                <button
                  onClick={() => changeLanguage("en")}
                  className="w-full rounded-md px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  English
                </button>

                <button
                  onClick={() => changeLanguage("ar")}
                  className="w-full rounded-md px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
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
            {darkMode ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">

          {/* Favorite mobile */}
          {user?.role === "CANDIDATE" && (
            <Link
              to="/favorites"
              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                isActive("/favorites")
                  ? "border-red-200 bg-red-50 text-red-500 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                  : "border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-500 dark:border-slate-700 dark:text-slate-300"
              }`}
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
          )}

          {/* Avatar mobile */}
          {user && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setProfileOpen(!profileOpen);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full focus:outline-none"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={fullName}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-500/20"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white ring-2 ring-indigo-100 dark:ring-indigo-500/20">
                  {getInitials()}
                </div>
              )}
            </button>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Light mode" : "Dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
          >
            {darkMode ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile profile dropdown */}
      {profileOpen && user && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">

            <div className="flex items-center gap-3">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={fullName}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                  {getInitials()}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-800 dark:text-slate-100">
                  {fullName}
                </p>

                <p className="text-xs text-primary">
                  {formatRole(user.role)}
                </p>
              </div>
            </div>

            <div className="mt-3 border-t border-slate-200 pt-2 dark:border-slate-800">

              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-white hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <User size={17} />
                {t("nav.profile")}
              </Link>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <LogOut size={17} />
                {t("nav.logout")}
              </button>
            </div>
          </div>
        </div>
      )}

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
              <>
                <Link
                  to="/applications"
                  onClick={closeMobileMenu}
                  className={mobileLinkClass("/applications")}
                >
                  {t("nav.applications")}
                </Link>

                <Link
                  to="/favorites"
                  onClick={closeMobileMenu}
                  className={mobileLinkClass("/favorites")}
                >
                  <span className="flex items-center gap-3">
                    <Heart
                      size={17}
                      className={
                        isActive("/favorites")
                          ? "fill-current"
                          : ""
                      }
                    />
                    {t("nav.favorites")}
                  </span>
                </Link>
              </>
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

            {!user && (
              <>
                <div className="mt-2 border-t border-slate-200 dark:border-slate-800" />

                <Link to="/" className={navLinkClass("/")}>
                  {t("nav.home")}
                </Link>

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