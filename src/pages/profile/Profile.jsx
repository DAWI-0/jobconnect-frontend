import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Camera,
  CheckCircle2,
  Edit3,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  Upload,
  User,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

/* =========================================================
   SOCIAL LOGOS
========================================================= */

function GitHubLogo({ size = 18, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.35-3.88-1.35-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInLogo({ size = 18, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.99H7.1v11.46ZM22.22 0H1.78C.8 0 0 .8 0 1.78v20.44C0 23.2.8 24 1.78 24h20.44C23.2 24 24 23.2 24 22.22V1.78C24 .8 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) return "U";

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function normalizeUrl(url) {
  if (!url) return "";

  const value = String(url).trim();

  if (!value) return "";

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return `https://${value}`;
}

/* =========================================================
   PROFILE FIELD
========================================================= */

function ProfileField({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-gray-800 dark:text-gray-200">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white ${
            Icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    bio: "",
    linkedin_url: "",
    github_url: "",
    job_title: "",
    company: "",
  });

  const [cvFile, setCvFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  /* =========================================================
     ROLE
  ========================================================= */

  const role = String(
    user?.role ||
      user?.user_type ||
      user?.account_type ||
      ""
  ).toUpperCase();

  const isRecruiter = role === "RECRUITER";

  const endpoint = isRecruiter
    ? "/accounts/recruiters/"
    : "/accounts/candidates/";

  /* =========================================================
     PROFILE FORM
  ========================================================= */

  const fillForm = (profileData) => {
    setFormData({
      phone: profileData?.phone || "",
      location: profileData?.location || "",
      bio: profileData?.bio || "",
      linkedin_url: profileData?.linkedin_url || "",
      github_url: profileData?.github_url || "",
      job_title: profileData?.job_title || "",
      company: profileData?.company || "",
    });

    setPhotoPreview(profileData?.profile_picture || "");
  };

  /* =========================================================
     EXTRACT PROFILE
  ========================================================= */

  const extractProfile = (data) => {
    if (Array.isArray(data)) {
      return data[0] || null;
    }

    if (Array.isArray(data?.results)) {
      return data.results[0] || null;
    }

    return data || null;
  };

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  useEffect(() => {
    fetchProfile();
  }, [endpoint]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(endpoint);

      const profileData = extractProfile(response.data);

      if (!profileData) {
        throw new Error("PROFILE_NOT_FOUND");
      }

      setProfile(profileData);
      fillForm(profileData);
    } catch (err) {
      console.error("PROFILE LOAD ERROR:", err);

      setError(
        err?.response?.data?.detail ||
          t("profile.loadError")
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     PHOTO CHANGE
  ========================================================= */

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(
        "Veuillez sélectionner une image valide."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "La photo ne doit pas dépasser 5 Mo."
      );
      return;
    }

    setPhotoFile(file);

    const previewUrl = URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
    setError("");
    setSuccess("");
  };

  /* =========================================================
     CV CHANGE
  ========================================================= */

  const handleCvChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError(
        "Veuillez sélectionner un fichier PDF."
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "Le CV ne doit pas dépasser 10 Mo."
      );
      return;
    }

    setCvFile(file);
    setError("");
    setSuccess("");
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSave = async () => {
    if (!profile?.id) {
      setError("Profil introuvable.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const updateEndpoint = isRecruiter
        ? `/accounts/recruiters/${profile.id}/`
        : `/accounts/candidates/${profile.id}/`;

      const hasCvFile = cvFile instanceof File;
      const hasPhotoFile = photoFile instanceof File;

      /* =====================================================
         AVEC FICHIER
         multipart/form-data
      ===================================================== */

      if (hasCvFile || hasPhotoFile) {
        const form = new FormData();

        form.append(
          "phone",
          formData.phone || ""
        );

        form.append(
          "location",
          formData.location || ""
        );

        form.append(
          "bio",
          formData.bio || ""
        );

        form.append(
          "linkedin_url",
          formData.linkedin_url || ""
        );

        form.append(
          "github_url",
          formData.github_url || ""
        );

        form.append(
          "job_title",
          formData.job_title || ""
        );

        form.append(
          "company",
          formData.company || ""
        );

        /*
         * IMPORTANT
         * On ajoute uniquement les vrais fichiers.
         */

        if (hasCvFile) {
          form.append(
            "cv",
            cvFile,
            cvFile.name
          );
        }

        if (hasPhotoFile) {
          form.append(
            "profile_picture",
            photoFile,
            photoFile.name
          );
        }

        /*
         * NE PAS mettre :
         *
         * Content-Type: application/json
         *
         * Axios doit laisser le navigateur
         * définir automatiquement le multipart boundary.
         */

        await api.patch(
          updateEndpoint,
          form
        );
      }

      /* =====================================================
         SANS FICHIER
         JSON
      ===================================================== */

      else {
        const payload = {
          phone: formData.phone || "",
          location: formData.location || "",
          bio: formData.bio || "",
          linkedin_url:
            formData.linkedin_url || "",
          github_url:
            formData.github_url || "",
          job_title:
            formData.job_title || "",
          company:
            formData.company || "",
        };

        await api.patch(
          updateEndpoint,
          payload
        );
      }

      /* =====================================================
         RELOAD PROFILE
      ===================================================== */

      const response = await api.get(endpoint);

      const updatedProfile = extractProfile(
        response.data
      );

      if (updatedProfile) {
        setProfile(updatedProfile);
        fillForm(updatedProfile);
      }

      setCvFile(null);
      setPhotoFile(null);

      setEditing(false);

      setSuccess(
        t("profile.saveSuccess")
      );
    } catch (err) {
      console.error(
        "PROFILE UPDATE ERROR:",
        err
      );

      console.error(
        "STATUS:",
        err?.response?.status
      );

      console.error(
        "SERVER RESPONSE:",
        err?.response?.data
      );

      const serverError =
        err?.response?.data;

      let message = t(
        "profile.saveError"
      );

      if (
        serverError &&
        typeof serverError === "object"
      ) {
        message = Object.entries(
          serverError
        )
          .map(([field, errors]) => {
            if (Array.isArray(errors)) {
              return `${field}: ${errors.join(
                ", "
              )}`;
            }

            return `${field}: ${String(
              errors
            )}`;
          })
          .join("\n");
      } else if (
        typeof serverError === "string"
      ) {
        message = serverError;
      }

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     CANCEL
  ========================================================= */

  const handleCancel = () => {
    setEditing(false);

    setCvFile(null);
    setPhotoFile(null);

    if (profile) {
      fillForm(profile);
    }

    setError("");
    setSuccess("");
  };

  /* =========================================================
     DISPLAY DATA
  ========================================================= */

  const displayName =
    user?.first_name ||
    user?.last_name
      ? `${user?.first_name || ""} ${
          user?.last_name || ""
        }`.trim()
      : user?.username ||
        profile?.name ||
        user?.email?.split("@")[0] ||
        "Utilisateur";

  const email =
    user?.email ||
    profile?.email ||
    "";

  const jobTitle =
    profile?.job_title ||
    profile?.position ||
    (isRecruiter
      ? "Recruiter"
      : "Candidate");

  const profilePicture =
    photoPreview ||
    profile?.profile_picture ||
    "";

  const cvUrl = profile?.cv || "";

  const linkedinUrl = normalizeUrl(
    profile?.linkedin_url
  );

  const githubUrl = normalizeUrl(
    profile?.github_url
  );

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={34}
            className="animate-spin text-indigo-600"
          />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("common.loading")}
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* =================================================
            ALERTS
        ================================================= */}

        {error && (
          <div className="mb-5 flex items-start gap-3 whitespace-pre-line rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
            <X
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span className="break-words">
              {error}
            </span>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{success}</span>
          </div>
        )}

        {/* =================================================
            PROFILE HEADER
        ================================================= */}

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

          {/* COVER */}

          <div className="relative h-40 overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 sm:h-48">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* HEADER */}

          <div className="relative px-5 pb-6 sm:px-8">
            <div className="-mt-16 flex flex-col gap-5 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-row sm:items-end">

                {/* AVATAR */}

                <div className="relative shrink-0">
                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white shadow-xl dark:border-gray-900 sm:h-36 sm:w-36">

                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        alt={displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitials(
                        displayName
                      )
                    )}
                  </div>

                  {editing && (
                    <label className="absolute bottom-2 right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-2 border-white bg-gray-900 text-white shadow-lg transition hover:bg-gray-800 dark:border-gray-900">
                      <Camera size={18} />

                      <input
                        type="file"
                        accept="image/*"
                        onChange={
                          handlePhotoChange
                        }
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* IDENTITY */}

                <div className="min-w-0 text-center sm:pb-2 sm:text-left">
                  <h1 className="truncate text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {displayName}
                  </h1>

                  <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {jobTitle}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 sm:justify-start">

                    {email && (
                      <span className="flex items-center gap-1.5">
                        <Mail size={15} />

                        <span className="max-w-[220px] truncate">
                          {email}
                        </span>
                      </span>
                    )}

                    {profile?.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} />

                        {profile.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTIONS */}

              {!editing ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setError("");
                    setSuccess("");
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Edit3 size={17} />

                  {t("profile.edit")}
                </button>
              ) : (
                <div className="flex w-full gap-2 sm:w-auto">

                  <button
                    type="button"
                    onClick={
                      handleCancel
                    }
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:flex-none"
                  >
                    <X size={17} />

                    {t("common.cancel")}
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleSave
                    }
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                  >
                    {saving ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />

                        {t(
                          "common.saving"
                        )}
                      </>
                    ) : (
                      <>
                        <Save size={17} />

                        {t(
                          "common.save"
                        )}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            EDIT MODE
        ================================================= */}

        {editing ? (
          <div className="mt-6 space-y-6">

            {/* CONTACT */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">

              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("profile.title")}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {t("profile.edit")}
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <InputField
                  label={t("profile.phone")}
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+212 6 XX XX XX XX"
                  icon={Phone}
                />

                <InputField
                  label={t(
                    "profile.location"
                  )}
                  name="location"
                  value={
                    formData.location
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Casablanca, Maroc"
                  icon={MapPin}
                />

                <InputField
                  label={t(
                    "profile.jobTitle"
                  )}
                  name="job_title"
                  value={
                    formData.job_title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Développeur Full Stack"
                  icon={User}
                />

                <InputField
                  label={t(
                    "profile.company"
                  )}
                  name="company"
                  value={
                    formData.company
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Nom de l'entreprise"
                  icon={User}
                />
              </div>

              {/* BIO */}

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("profile.bio")}
                </label>

                <textarea
                  name="bio"
                  value={
                    formData.bio
                  }
                  onChange={
                    handleChange
                  }
                  rows={5}
                  placeholder="Présentez-vous professionnellement..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
            </section>

            {/* SOCIAL */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">

              <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                {t("profile.linkedin")} /{" "}
                {t("profile.github")}
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                {/* LINKEDIN */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">

                    <LinkedInLogo
                      size={17}
                      className="text-[#0A66C2]"
                    />

                    {t(
                      "profile.linkedin"
                    )}
                  </label>

                  <input
                    type="url"
                    name="linkedin_url"
                    value={
                      formData.linkedin_url
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://linkedin.com/in/..."
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>

                {/* GITHUB */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">

                    <GitHubLogo size={17} />

                    {t(
                      "profile.github"
                    )}
                  </label>

                  <input
                    type="url"
                    name="github_url"
                    value={
                      formData.github_url
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </section>

            {/* FILES */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">

              <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                {t("profile.cv")} /{" "}
                {t("profile.photo")}
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                {/* PHOTO */}

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t(
                      "profile.photo"
                    )}
                  </p>

                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-indigo-500">

                    {photoPreview ? (
                      <img
                        src={
                          photoPreview
                        }
                        alt="Preview"
                        className="mb-4 h-24 w-24 rounded-2xl object-cover shadow-md"
                      />
                    ) : (
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <Camera
                          size={30}
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      <Upload size={16} />

                      {t(
                        "profile.photo"
                      )}
                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                      PNG, JPG, WEBP — 5 Mo max
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handlePhotoChange
                      }
                      className="hidden"
                    />
                  </label>

                  {photoFile && (
                    <p className="mt-2 truncate text-xs text-emerald-600">
                      Nouveau fichier :{" "}
                      {photoFile.name}
                    </p>
                  )}
                </div>

                {/* CV */}

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t(
                      "profile.cv"
                    )}
                  </p>

                  <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-indigo-500">

                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      <FileText size={32} />
                    </div>

                    <p className="max-w-full truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {cvFile
                        ? cvFile.name
                        : cvUrl
                          ? "CV actuel"
                          : t(
                              "profile.cv"
                            )}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      PDF uniquement — 10 Mo max
                    </p>

                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">
                      <Upload size={14} />

                      {cvFile
                        ? "Changer le CV"
                        : t(
                            "profile.uploadCv"
                          )}
                    </div>

                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={
                        handleCvChange
                      }
                      className="hidden"
                    />
                  </label>

                  {cvFile && (
                    <p className="mt-2 truncate text-xs text-emerald-600">
                      Nouveau fichier :{" "}
                      {cvFile.name}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>
        ) : (

          /* =================================================
             VIEW MODE
          ================================================= */

          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* LEFT */}

            <div className="space-y-6 lg:col-span-2">

              {/* ABOUT */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">

                <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                  {t("profile.bio")}
                </h2>

                <p className="whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {profile?.bio || "—"}
                </p>
              </section>

              {/* INFORMATION */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">

                <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                  Informations
                </h2>

                <div className="grid gap-6 sm:grid-cols-2">

                  <ProfileField
                    icon={Phone}
                    label={t(
                      "profile.phone"
                    )}
                    value={
                      profile?.phone
                    }
                  />

                  <ProfileField
                    icon={MapPin}
                    label={t(
                      "profile.location"
                    )}
                    value={
                      profile?.location
                    }
                  />

                  <ProfileField
                    icon={User}
                    label={t(
                      "profile.jobTitle"
                    )}
                    value={
                      profile?.job_title
                    }
                  />

                  <ProfileField
                    icon={Mail}
                    label="Email"
                    value={email}
                  />

                  <ProfileField
                    icon={User}
                    label={t(
                      "profile.company"
                    )}
                    value={
                      profile?.company
                    }
                  />
                </div>
              </section>

              {/* SOCIAL */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">

                <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                  Profils professionnels
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">

                  {linkedinUrl && (
                    <a
                      href={
                        linkedinUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4 transition hover:-translate-y-0.5 hover:border-[#0A66C2] hover:shadow-md dark:border-gray-700"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A66C2]/10 text-[#0A66C2]">
                        <LinkedInLogo
                          size={22}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          LinkedIn
                        </p>

                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                          Voir le profil
                        </p>
                      </div>
                    </a>
                  )}

                  {githubUrl && (
                    <a
                      href={
                        githubUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4 transition hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md dark:border-gray-700"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white">
                        <GitHubLogo
                          size={22}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          GitHub
                        </p>

                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                          Voir le profil
                        </p>
                      </div>
                    </a>
                  )}

                  {!linkedinUrl &&
                    !githubUrl && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Aucun profil professionnel renseigné.
                      </p>
                    )}
                </div>
              </section>
            </div>

            {/* RIGHT */}

            <div className="space-y-6">

              {/* CV */}

              <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                        {t(
                          "profile.cv"
                        )}
                      </p>

                      <h2 className="mt-1 text-xl font-bold">
                        Curriculum Vitae
                      </h2>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                      <FileText size={25} />
                    </div>
                  </div>
                </div>

                <div className="p-5">

                  {cvUrl ? (
                    <>
                      <div className="mb-4 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/70">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10">
                            <FileText
                              size={22}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                              CV.pdf
                            </p>

                            <p className="text-xs text-gray-400">
                              Document PDF
                            </p>
                          </div>
                        </div>
                      </div>

                      <a
                        href={cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                      >
                        <FileText size={17} />

                        Voir le CV
                      </a>
                    </>
                  ) : (
                    <div className="py-5 text-center">

                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-gray-800">
                        <FileText size={28} />
                      </div>

                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Aucun CV ajouté
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setEditing(true)
                        }
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                      >
                        <Upload size={16} />

                        Ajouter un CV
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* ACCOUNT TYPE */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Type de compte
                </p>

                <div className="mt-4 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <User size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {isRecruiter
                        ? t(
                            "chat.recruiter"
                          )
                        : t(
                            "chat.candidate"
                          )}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      JobConnect
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}