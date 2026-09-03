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
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">

          {/* Hero content */}
          <div>
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
          <div className="relative hidden lg:block">
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
                    <p className="font-semibold">JobConnect</p>
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
                    <p className="font-bold">12,000 DH</p>
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
      <section className="relative z-10 mx-auto -mt-4 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
              <Search className="text-slate-400" size={20} />

              <input
                type="text"
                placeholder={t("home.searchPlaceholder")}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
              <MapPin className="text-slate-400" size={20} />

              <input
                type="text"
                placeholder={t("home.locationPlaceholder")}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

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
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <BriefcaseBusiness className="text-indigo-600" size={28} />
            <p className="mt-4 text-3xl font-extrabold">+</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("home.jobsAvailable")}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <Building2 className="text-purple-600" size={28} />
            <p className="mt-4 text-3xl font-extrabold">+</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("home.companies")}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <Users className="text-indigo-600" size={28} />
            <p className="mt-4 text-3xl font-extrabold">+</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("home.candidates")}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <FileCheck2 className="text-purple-600" size={28} />
            <p className="mt-4 text-3xl font-extrabold">+</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("home.applications")}
            </p>
          </div>

        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

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

          <div className="mt-14 grid gap-8 md:grid-cols-4">

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
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-14 text-center text-white sm:px-12">

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