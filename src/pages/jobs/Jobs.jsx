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