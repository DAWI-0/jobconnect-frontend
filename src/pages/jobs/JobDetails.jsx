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

        {/* Breadcrumb */}
        <Link
          to="/jobs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("jobDetails.backToJobs")}
        </Link>

        {/* Job Header */}
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
                  aria-label={isFav ? t("jobDetails.removeFavorite") : t("jobDetails.addFavorite")}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${
                    isFav
                      ? "border-red-200 bg-red-50 text-red-500 dark:border-red-500/20 dark:bg-red-500/10"
                      : "border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-red-500/20 dark:hover:bg-red-500/10"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isFav ? "fill-current" : ""}`}
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
                {job.remote && <Wifi className="h-3.5 w-3.5" />}
                {job.remote ? t("jobs.remote") : t("jobs.onsite")}
              </span>
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Left */}
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
                {job.description || t("jobDetails.noDescription")}
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
                      {job.location || t("jobs.locationNotSpecified")}
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
                      {getContractLabel(job.contract_type)}
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
                      {job.remote ? t("jobs.remote") : t("jobs.onsite")}
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
                      {getExperienceLabel(job.experience_level)}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">

            {/* Apply card */}
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

            {/* Company card */}
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
          </aside>
        </div>
      </div>
    </main>
  );
}