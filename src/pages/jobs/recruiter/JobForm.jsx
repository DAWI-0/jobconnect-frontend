import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  CircleDollarSign,
  FileText,
  MapPin,
  Save,
  Sparkles,
  Wifi,
  X,
} from "lucide-react";

import api from "../../../services/api";

export default function JobForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    contract_type: "",
    experience_level: "",
    salary_min: "",
    salary_max: "",
    remote: false,
    skill_ids: [],
    status: "DRAFT",
    deadline: "",
  });

  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(isEdit);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // LOAD SKILLS
  // =========================================================
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setSkillsLoading(true);

        const response = await api.get("/skills/");

        const data = response.data;

        if (Array.isArray(data)) {
          setSkills(data);
        } else {
          setSkills(data.results || []);
        }
      } catch (err) {
        console.error("Erreur skills :", err);

        setError(
          t(
            "jobs.form.skillsError",
            "Impossible de charger les competences."
          )
        );
      } finally {
        setSkillsLoading(false);
      }
    };

    fetchSkills();
  }, [t]);

  // =========================================================
  // LOAD JOB FOR EDIT
  // =========================================================
  useEffect(() => {
    if (!isEdit) {
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/jobs/${id}/`);

        const job = response.data;

        setForm({
          title: job.title || "",
          description: job.description || "",
          location: job.location || "",
          contract_type: job.contract_type || "",
          experience_level: job.experience_level || "",
          salary_min: job.salary_min ?? "",
          salary_max: job.salary_max ?? "",
          remote: Boolean(job.remote),

          skill_ids: Array.isArray(job.skills)
            ? job.skills.map((skill) => skill.id)
            : [],

          status: job.status || "DRAFT",

          deadline: job.deadline
            ? job.deadline.substring(0, 10)
            : "",
        });
      } catch (err) {
        console.error("Erreur job :", err);

        setError(
          err.response?.data?.detail ||
            t(
              "jobs.form.loadError",
              "Impossible de charger cette offre."
            )
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, isEdit, t]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================================================
  // SKILL SELECT
  // =========================================================
  const toggleSkill = (skillId) => {
    setForm((previous) => {
      const exists = previous.skill_ids.includes(skillId);

      return {
        ...previous,
        skill_ids: exists
          ? previous.skill_ids.filter((id) => id !== skillId)
          : [...previous.skill_ids, skillId],
      };
    });
  };

  // =========================================================
  // SUBMIT
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (!form.title.trim()) {
      setError(
        t(
          "jobs.form.titleRequired",
          "Le titre du poste est obligatoire."
        )
      );
      return;
    }

    if (!form.description.trim()) {
      setError(
        t(
          "jobs.form.descriptionRequired",
          "La description est obligatoire."
        )
      );
      return;
    }

    if (!form.contract_type) {
      setError(
        t(
          "jobs.form.contractRequired",
          "Le type de contrat est obligatoire."
        )
      );
      return;
    }

    if (!form.experience_level) {
      setError(
        t(
          "jobs.form.experienceRequired",
          "Le niveau d'experience est obligatoire."
        )
      );
      return;
    }

    if (
      form.salary_min !== "" &&
      form.salary_max !== "" &&
      Number(form.salary_min) > Number(form.salary_max)
    ) {
      setError(
        t(
          "jobs.form.salaryError",
          "Le salaire minimum ne peut pas etre superieur au salaire maximum."
        )
      );
      return;
    }

    try {
      setSaving(true);

      /*
       * IMPORTANT :
       *
       * On n'envoie PAS :
       * - company
       * - recruiter
       *
       * Le backend doit automatiquement utiliser :
       *
       * request.user
       *       |
       *       v
       * recruiter_profile
       *       |
       *       v
       * company
       */

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        location: form.location.trim(),

        contract_type: form.contract_type,
        experience_level: form.experience_level,

        salary_min:
          form.salary_min === ""
            ? null
            : Number(form.salary_min),

        salary_max:
          form.salary_max === ""
            ? null
            : Number(form.salary_max),

        remote: form.remote,

        skill_ids: form.skill_ids,

        status: form.status,

        deadline: form.deadline || null,
      };

      if (isEdit) {
        await api.put(`/jobs/${id}/`, payload);
      } else {
        await api.post("/jobs/", payload);
      }

      setSuccess(
        isEdit
          ? t(
              "jobs.form.updateSuccess",
              "Offre modifiee avec succes."
            )
          : t(
              "jobs.form.createSuccess",
              "Offre creee avec succes."
            )
      );

      setTimeout(() => {
        navigate("/recruiter/jobs");
      }, 500);
    } catch (err) {
      console.error("Erreur sauvegarde :", err);

      const data = err.response?.data;

      if (data && typeof data === "object") {
        const messages = Object.entries(data)
          .map(([field, message]) => {
            if (Array.isArray(message)) {
              return `${field}: ${message.join(", ")}`;
            }

            return `${field}: ${message}`;
          })
          .join("\n");

        setError(
          messages ||
            t(
              "jobs.form.saveError",
              "Une erreur est survenue."
            )
        );
      } else {
        setError(
          t(
            "jobs.form.saveError",
            "Impossible de sauvegarder l'offre."
          )
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">

          <div className="animate-pulse">
            <div className="mb-4 h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />

            <div className="mb-3 h-10 w-80 rounded bg-slate-200 dark:bg-slate-800" />

            <div className="mb-8 h-5 w-96 max-w-full rounded bg-slate-200 dark:bg-slate-800" />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="space-y-6">
                <div className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-32 rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          </div>

        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* =================================================
            BACK
        ================================================= */}
        <Link
          to="/recruiter/jobs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" />

          {t(
            "jobs.form.back",
            "Retour aux offres"
          )}
        </Link>

        {/* =================================================
            HEADER
        ================================================= */}
        <section className="mb-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">

                <Briefcase className="h-4 w-4" />

                {isEdit
                  ? t(
                      "jobs.form.editBadge",
                      "Espace recruteur"
                    )
                  : t(
                      "jobs.form.newBadge",
                      "Espace recruteur"
                    )}

              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">

                {isEdit
                  ? t(
                      "jobs.form.editTitle",
                      "Modifier l'offre"
                    )
                  : t(
                      "jobs.form.newTitle",
                      "Creer une offre"
                    )}

              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">

                {isEdit
                  ? t(
                      "jobs.form.editSubtitle",
                      "Modifiez les informations de votre offre d'emploi."
                    )
                  : t(
                      "jobs.form.newSubtitle",
                      "Publiez une nouvelle offre d'emploi sur JobConnect."
                    )}

              </p>

            </div>

            {/* Company information */}
            <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 dark:border-indigo-500/20 dark:bg-indigo-500/10">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-500/20">
                <Building2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.companyAuto",
                    "Entreprise"
                  )}
                </p>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {t(
                    "jobs.form.companyAutomatic",
                    "Associee automatiquement"
                  )}
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            ERROR
        ================================================= */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">

            <X className="mt-0.5 h-4 w-4 shrink-0" />

            <p className="whitespace-pre-line">
              {error}
            </p>

          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}
        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">

            <Check className="h-4 w-4" />

            {success}

          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  {t(
                    "jobs.form.basicTitle",
                    "Informations generales"
                  )}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.basicSubtitle",
                    "Presentez votre offre d'emploi."
                  )}
                </p>
              </div>

            </div>

            {/* TITLE */}
            <div className="mb-6">

              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold"
              >
                {t(
                  "jobs.form.title",
                  "Titre du poste"
                )}
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder={t(
                  "jobs.form.titlePlaceholder",
                  "Ex: Developpeur React"
                )}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />

            </div>

            {/* DESCRIPTION */}
            <div>

              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold"
              >
                {t(
                  "jobs.form.description",
                  "Description"
                )}
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={7}
                placeholder={t(
                  "jobs.form.descriptionPlaceholder",
                  "Decrivez le poste, les missions et les responsabilites..."
                )}
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* =================================================
              JOB DETAILS
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-500/10">
                <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  {t(
                    "jobs.form.detailsTitle",
                    "Details du poste"
                  )}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.detailsSubtitle",
                    "Definissez les caracteristiques du poste."
                  )}
                </p>
              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* LOCATION */}
              <div>

                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.location",
                    "Localisation"
                  )}
                </label>

                <div className="relative">

                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    placeholder={t(
                      "jobs.form.locationPlaceholder",
                      "Ex: Casablanca"
                    )}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                  />

                </div>

              </div>

              {/* CONTRACT */}
              <div>

                <label
                  htmlFor="contract_type"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.contract",
                    "Type de contrat"
                  )}
                </label>

                <select
                  id="contract_type"
                  name="contract_type"
                  value={form.contract_type}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >

                  <option value="">
                    {t(
                      "jobs.form.select",
                      "Selectionner"
                    )}
                  </option>

                  <option value="CDI">CDI</option>

                  <option value="CDD">CDD</option>

                  <option value="INTERNSHIP">
                    {t(
                      "jobs.contracts.internship",
                      "Stage"
                    )}
                  </option>

                  <option value="FREELANCE">
                    {t(
                      "jobs.contracts.freelance",
                      "Freelance"
                    )}
                  </option>

                  <option value="PART_TIME">
                    {t(
                      "jobs.contracts.partTime",
                      "Temps partiel"
                    )}
                  </option>

                </select>

              </div>

              {/* EXPERIENCE */}
              <div>

                <label
                  htmlFor="experience_level"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.experience",
                    "Niveau d'experience"
                  )}
                </label>

                <select
                  id="experience_level"
                  name="experience_level"
                  value={form.experience_level}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >

                  <option value="">
                    {t(
                      "jobs.form.select",
                      "Selectionner"
                    )}
                  </option>

                  <option value="ENTRY">
                    {t(
                      "jobs.experience.entry",
                      "Debutant"
                    )}
                  </option>

                  <option value="JUNIOR">
                    {t(
                      "jobs.experience.junior",
                      "Junior"
                    )}
                  </option>

                  <option value="MID">
                    {t(
                      "jobs.experience.mid",
                      "Intermediaire"
                    )}
                  </option>

                  <option value="SENIOR">
                    {t(
                      "jobs.experience.senior",
                      "Senior"
                    )}
                  </option>

                  <option value="EXPERT">
                    Expert
                  </option>

                </select>

              </div>

              {/* DEADLINE */}
              <div>

                <label
                  htmlFor="deadline"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.deadline",
                    "Date limite"
                  )}
                </label>

                <div className="relative">

                  <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              SALARY
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
                <CircleDollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  {t(
                    "jobs.form.salaryTitle",
                    "Remuneration"
                  )}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.salarySubtitle",
                    "Indiquez la fourchette salariale."
                  )}
                </p>
              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label
                  htmlFor="salary_min"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.salaryMin",
                    "Salaire minimum"
                  )}
                </label>

                <input
                  id="salary_min"
                  name="salary_min"
                  type="number"
                  min="0"
                  value={form.salary_min}
                  onChange={handleChange}
                  placeholder="6000"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />

              </div>

              <div>

                <label
                  htmlFor="salary_max"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t(
                    "jobs.form.salaryMax",
                    "Salaire maximum"
                  )}
                </label>

                <input
                  id="salary_max"
                  name="salary_max"
                  type="number"
                  min="0"
                  value={form.salary_max}
                  onChange={handleChange}
                  placeholder="10000"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              WORK MODE
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                  <Wifi className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>

                <div>

                  <h2 className="font-semibold">
                    {t(
                      "jobs.form.remoteTitle",
                      "Mode de travail"
                    )}
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t(
                      "jobs.form.remoteSubtitle",
                      "Definissez si le poste est a distance."
                    )}
                  </p>

                </div>

              </div>

              <label className="relative inline-flex cursor-pointer items-center">

                <input
                  type="checkbox"
                  name="remote"
                  checked={form.remote}
                  onChange={handleChange}
                  className="peer sr-only"
                />

                <div className="h-7 w-12 rounded-full bg-slate-200 transition peer-checked:bg-indigo-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500/30 dark:bg-slate-700">
                  <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
                </div>

              </label>

            </div>

            <div className="mt-4">

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  form.remote
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >

                {form.remote ? (
                  <>
                    <Wifi className="h-3 w-3" />

                    {t(
                      "jobs.remote",
                      "Remote"
                    )}
                  </>
                ) : (
                  <>
                    <MapPin className="h-3 w-3" />

                    {t(
                      "jobs.onsite",
                      "Sur site"
                    )}
                  </>
                )}

              </span>

            </div>

          </div>

          {/* =================================================
              SKILLS
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-500/10">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>

              <div>

                <h2 className="font-semibold">
                  {t(
                    "jobs.form.skillsTitle",
                    "Competences"
                  )}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.skillsSubtitle",
                    "Selectionnez les competences recherchees."
                  )}
                </p>

              </div>

            </div>

            {skillsLoading ? (
              <div className="flex flex-wrap gap-2">

                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-9 w-24 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800"
                  />
                ))}

              </div>
            ) : skills.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center dark:border-slate-700">

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.noSkills",
                    "Aucune competence disponible."
                  )}
                </p>

              </div>
            ) : (
              <div className="flex flex-wrap gap-2">

                {skills.map((skill) => {

                  const selected =
                    form.skill_ids.includes(skill.id);

                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkill(skill.id)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
                        selected
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-500/10 dark:text-indigo-400"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                      }`}
                    >

                      {selected && (
                        <Check className="h-3.5 w-3.5" />
                      )}

                      {skill.name}

                    </button>
                  );
                })}

              </div>
            )}

          </div>

          {/* =================================================
              STATUS
          ================================================= */}
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">

            <div className="mb-4">

              <h2 className="font-semibold">
                {t(
                  "jobs.form.statusTitle",
                  "Statut de l'offre"
                )}
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {t(
                  "jobs.form.statusSubtitle",
                  "Choisissez si l'offre doit etre publiee ou gardee en brouillon."
                )}
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-3">

              {/* DRAFT */}
              <button
                type="button"
                onClick={() =>
                  setForm((previous) => ({
                    ...previous,
                    status: "DRAFT",
                  }))
                }
                className={`rounded-xl border p-4 text-left transition ${
                  form.status === "DRAFT"
                    ? "border-amber-300 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10"
                    : "border-slate-200 hover:border-amber-200 dark:border-slate-700 dark:hover:border-amber-500/30"
                }`}
              >

                <p className="text-sm font-semibold">
                  {t(
                    "jobs.form.draft",
                    "Brouillon"
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.draftDescription",
                    "L'offre ne sera pas visible publiquement."
                  )}
                </p>

              </button>

              {/* PUBLISHED */}
              <button
                type="button"
                onClick={() =>
                  setForm((previous) => ({
                    ...previous,
                    status: "PUBLISHED",
                  }))
                }
                className={`rounded-xl border p-4 text-left transition ${
                  form.status === "PUBLISHED"
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                    : "border-slate-200 hover:border-emerald-200 dark:border-slate-700 dark:hover:border-emerald-500/30"
                }`}
              >

                <p className="text-sm font-semibold">
                  {t(
                    "jobs.form.published",
                    "Publier"
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.publishedDescription",
                    "L'offre sera visible par les candidats."
                  )}
                </p>

              </button>

              {/* CLOSED */}
              <button
                type="button"
                onClick={() =>
                  setForm((previous) => ({
                    ...previous,
                    status: "CLOSED",
                  }))
                }
                className={`rounded-xl border p-4 text-left transition ${
                  form.status === "CLOSED"
                    ? "border-red-300 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10"
                    : "border-slate-200 hover:border-red-200 dark:border-slate-700 dark:hover:border-red-500/30"
                }`}
              >

                <p className="text-sm font-semibold">
                  {t(
                    "jobs.form.closed",
                    "Fermee"
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t(
                    "jobs.form.closedDescription",
                    "L'offre ne sera plus disponible."
                  )}
                </p>

              </button>

            </div>

          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}
          <div className="flex flex-col-reverse gap-3 bg-slate-50 p-6 dark:bg-slate-950/40 sm:flex-row sm:justify-end sm:p-8">

            <Link
              to="/recruiter/jobs"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />

              {t(
                "jobs.form.cancel",
                "Annuler"
              )}

            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  {t(
                    "jobs.form.saving",
                    "Enregistrement..."
                  )}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />

                  {isEdit
                    ? t(
                        "jobs.form.saveChanges",
                        "Enregistrer les modifications"
                      )
                    : t(
                        "jobs.form.create",
                        "Creer l'offre"
                      )}
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </main>
  );
}