import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  User,
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
  if (application.candidate_name) return application.candidate_name;

  if (application.candidate?.user) {
    const first = application.candidate.user.first_name || "";
    const last = application.candidate.user.last_name || "";

    const fullName = `${first} ${last}`.trim();

    if (fullName) return fullName;

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
    language === "ar" ? "ar-MA" : language === "en" ? "en-US" : "fr-FR",
    {
      dateStyle: "medium",
    }
  ).format(new Date(date));
}

export default function RecruiterApplications() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [savingId, setSavingId] = useState(null);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    if (user?.role !== "RECRUITER") return;

    fetchApplications();
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
          recruiter_note: notes[application.id] || "",
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

        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            <span>{error}</span>

            <button onClick={() => setError("")}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

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
              const candidateName = getCandidateName(application);
              const candidateEmail = getCandidateEmail(application);

              return (
                <article
                  key={application.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-bold text-white">
                          {candidateName.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            {candidateName}
                          </h2>

                          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <Mail className="h-4 w-4" />
                            {candidateEmail}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                          STATUS_CLASSES[application.status] ||
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

                        {application.location || "Non précisé"}
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

                        {application.contract_type || "—"}
                      </div>
                    </div>
                  </div>

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
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {t(
                                `applications.statuses.${status}`,
                                status
                              )}
                            </option>
                          ))}
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
                        value={notes[application.id] || ""}
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
                      onClick={() => updateApplication(application)}
                      disabled={savingId === application.id}
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