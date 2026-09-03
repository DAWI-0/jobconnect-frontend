
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

import api from "../../services/api";

export default function Jobs() {
  const { t } = useTranslation();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      if (filters.search)
        params.append("search", filters.search);

      if (filters.contract_type)
        params.append("contract_type", filters.contract_type);

      if (filters.experience_level)
        params.append("experience_level", filters.experience_level);

      if (filters.remote)
        params.append("remote", filters.remote);

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
      setError(t("jobs.error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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
    };

    return labels[level] || level;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            <Briefcase className="h-4 w-4" />
            {t("jobs.badge")}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("jobs.title")}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            {t("jobs.subtitle")}
          </p>
        </section>

        {/* Search & filters */}
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

            {/* Button */}
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

        {/* Results header */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {t("jobs.results")}
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {pagination.count} {t("jobs.offers")}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
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

        {/* Jobs */}
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm">
                      <Building2 className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-bold">
                        {job.title}
                      </h3>

                      <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                        <Building2 className="h-3.5 w-3.5" />
                        {job.company_name}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-indigo-500 dark:text-slate-600" />
                </div>

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
                {job.salary_min && job.salary_max && (
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

                {/* Footer */}
                <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  >
                    {t("jobs.viewDetails")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && jobs.length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10">
              <Search className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              {t("jobs.noResults")}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              {t("jobs.noResultsDescription")}
            </p>

            <button
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <RotateCcw className="h-4 w-4" />
              {t("jobs.reset")}
            </button>
          </div>
        )}

        {/* Pagination */}
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