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