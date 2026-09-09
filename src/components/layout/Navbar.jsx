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