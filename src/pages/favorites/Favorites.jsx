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