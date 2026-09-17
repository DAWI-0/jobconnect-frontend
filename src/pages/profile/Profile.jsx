import { useEffect, useState } from "react";
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
   HELPERS
========================================================= */

function getInitials(user, profile) {
  const firstName =
    user?.first_name || profile?.user_first_name || "";

  const lastName =
    user?.last_name || profile?.user_last_name || "";

  if (firstName || lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  const email =
    user?.email || profile?.user_email || "";

  if (email) {
    return email.charAt(0).toUpperCase();
  }

  return "U";
}

function normalizeUrl(url) {
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  if (url.startsWith("/")) {
    return `http://127.0.0.1:8000${url}`;
  }

  return `http://127.0.0.1:8000/${url}`;
}

function safeText(value, fallback = "") {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === "object") {
    if (value.name) return String(value.name);
    if (value.company_name) return String(value.company_name);
    if (value.title) return String(value.title);
    if (value.label) return String(value.label);

    return fallback;
  }

  return String(value);
}

/* =========================================================
   GITHUB LOGO
========================================================= */

function GitHubLogo({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
        0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465
        -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
        .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.688
        -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004
        1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65
        .64.701 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855
        0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017
        C22 6.484 17.523 2 12 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* =========================================================
   LINKEDIN LOGO
========================================================= */

function LinkedInLogo({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.606 0 4.267 2.373 4.267 5.461v6.28ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM3.555 20.452h3.558V9H3.555v11.452Z" />
    </svg>
  );
}

/* =========================================================
   PROFILE FIELD
========================================================= */

function ProfileField({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {label}
          </p>

          <p className="mt-1 break-words text-sm font-semibold text-gray-900 dark:text-white">
            {safeText(value, "Non renseigné")}
          </p>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-sm
          text-gray-900
          outline-none
          transition
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-500/20
          dark:border-gray-600
          dark:bg-gray-800
          dark:text-white
          dark:placeholder-gray-500
        "
      />

    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */

export default function Profile() {
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

  /* =======================================================
     ROLE
  ======================================================= */

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

  /* =======================================================
     DISPLAY NAME
  ======================================================= */

  const displayName =
    user?.first_name || user?.last_name
      ? `${user?.first_name || ""} ${user?.last_name || ""}`.trim()
      : user?.username ||
        profile?.name ||
        user?.email?.split("@")[0] ||
        "Utilisateur";

  /* =======================================================
     FILL FORM
  ======================================================= */

  const fillForm = (profileData) => {
    const companyValue =
      typeof profileData?.company === "object"
        ? profileData?.company?.id || ""
        : profileData?.company || "";

    setFormData({
      phone: profileData?.phone || "",
      location: profileData?.location || "",
      bio: profileData?.bio || "",
      linkedin_url: profileData?.linkedin_url || "",
      github_url: profileData?.github_url || "",
      job_title: profileData?.job_title || "",
      company: companyValue,
    });

    setPhotoPreview(
      normalizeUrl(profileData?.profile_picture || "")
    );
  };

  /* =======================================================
     EXTRACT PROFILE
  ======================================================= */

  const extractProfile = (data) => {
    if (Array.isArray(data)) {
      return data.length > 0 ? data[0] : null;
    }

    if (Array.isArray(data?.results)) {
      return data.results.length > 0 ? data.results[0] : null;
    }

    if (data && typeof data === "object") {
      return data;
    }

    return null;
  };

  /* =======================================================
     FETCH
  ======================================================= */

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get(endpoint);

      console.log("PROFILE RESPONSE =", response.data);

      const profileData = extractProfile(response.data);

      if (profileData) {
        setProfile(profileData);
        fillForm(profileData);
      } else {
        setProfile(null);
      }

    } catch (err) {
      console.error("PROFILE ERROR =", err);

      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Impossible de charger le profil.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(() => {
    fetchProfile();
  }, [user, endpoint]);

  /* =======================================================
     CHANGE
  ======================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     PHOTO
  ======================================================= */

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image valide.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("La photo ne doit pas dépasser 5 MB.");
      return;
    }

    setError("");

    setPhotoFile(file);

    const previewUrl = URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  /* =======================================================
     CV
  ======================================================= */

  const handleCvChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const extension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    const allowedExtensions = [
      "pdf",
      "doc",
      "docx",
    ];

    if (!allowedExtensions.includes(extension)) {
      setError(
        "Le CV doit être au format PDF, DOC ou DOCX."
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Le CV ne doit pas dépasser 10 MB.");
      return;
    }

    setError("");
    setCvFile(file);
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = async () => {
    if (!profile?.id) {
      setError("Profil introuvable.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const hasFiles = cvFile || photoFile;

      let dataToSend;

      if (hasFiles) {
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

        if (isRecruiter) {
          form.append(
            "job_title",
            formData.job_title || ""
          );

          if (formData.company) {
            form.append(
              "company",
              formData.company
            );
          }
        }

        if (cvFile) {
          form.append("cv", cvFile);
        }

        if (photoFile) {
          form.append(
            "profile_picture",
            photoFile
          );
        }

        dataToSend = form;

      } else {
        dataToSend = {
          phone: formData.phone || "",
          location: formData.location || "",
          bio: formData.bio || "",
          linkedin_url:
            formData.linkedin_url || "",
          github_url:
            formData.github_url || "",
        };

        if (isRecruiter) {
          dataToSend.job_title =
            formData.job_title || "";

          if (formData.company) {
            dataToSend.company =
              formData.company;
          }
        }
      }

      await api.patch(
        `${endpoint}${profile.id}/`,
        dataToSend
      );

      setSuccess(
        "Profil mis à jour avec succès."
      );

      setCvFile(null);
      setPhotoFile(null);

      setEditing(false);

      await fetchProfile();

    } catch (err) {
      console.error(
        "SAVE PROFILE ERROR =",
        err
      );

      console.error(
        "SERVER RESPONSE =",
        err?.response?.data
      );

      const serverData =
        err?.response?.data;

      let message =
        "Impossible de mettre à jour le profil.";

      if (typeof serverData === "string") {
        message = serverData;
      } else if (serverData?.detail) {
        message = serverData.detail;
      } else if (
        serverData &&
        typeof serverData === "object"
      ) {
        const firstError =
          Object.values(serverData)[0];

        if (Array.isArray(firstError)) {
          message = firstError[0];
        } else if (
          typeof firstError === "string"
        ) {
          message = firstError;
        }
      }

      setError(message);

    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     CANCEL
  ======================================================= */

  const handleCancel = () => {
    if (profile) {
      fillForm(profile);
    }

    setCvFile(null);
    setPhotoFile(null);

    setEditing(false);
    setError("");
  };

  /* =======================================================
     URLS
  ======================================================= */

  const cvUrl = normalizeUrl(profile?.cv);

  const linkedinUrl = normalizeUrl(
    profile?.linkedin_url || ""
  );

  const githubUrl = normalizeUrl(
    profile?.github_url || ""
  );

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">

          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Chargement du profil...
          </p>

        </div>
      </div>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

      {/* =====================================================
          PROFILE HEADER
      ===================================================== */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-indigo-600
          shadow-lg
        "
      >

        {/* ===================================================
            PROFILE AREA
            UNE SEULE COULEUR :
            INDIGO-600
        =================================================== */}

        <div
          className="
            relative
            px-5
            pb-7
            pt-5
            sm:px-8
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              gap-5
              sm:flex-row
              sm:items-center
            "
          >

            {/* =================================================
                PHOTO
            ================================================= */}

            <div className="relative shrink-0">

              <div
                className="
                  flex
                  h-32
                  w-32
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border-4
                  border-white
                  bg-white
                  text-3xl
                  font-bold
                  text-indigo-600
                  shadow-xl
                "
              >

                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  getInitials(
                    user,
                    profile
                  )
                )}

              </div>

              {editing && (
                <label
                  htmlFor="profile-picture"
                  className="
                    absolute
                    bottom-0
                    right-0
                    flex
                    h-10
                    w-10
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-white
                    bg-indigo-600
                    text-white
                    shadow-lg
                    transition
                    hover:bg-indigo-700
                  "
                >

                  <Camera className="h-5 w-5" />

                  <input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />

                </label>
              )}

            </div>

            {/* =================================================
                NAME / ROLE / EMAIL

                MÊME COULEUR QUE LE BACKGROUND
                PAS DE DARK COLOR
            ================================================= */}

            <div
              className="
                min-w-0
                flex-1
                text-center
                text-white
                sm:text-left
              "
            >

              {/* NOM */}

              <h1
                className="
                  truncate
                  text-3xl
                  font-extrabold
                  leading-tight
                  text-white
                "
              >
                {displayName}
              </h1>

              {/* ROLE */}

              <p
                className="
                  mt-2
                  text-base
                  font-semibold
                  text-white
                "
              >
                {isRecruiter
                  ? safeText(
                      profile?.job_title,
                      "Recruteur"
                    )
                  : "Candidat"}
              </p>

              {/* EMAIL */}

              {user?.email && (
                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    text-white
                    sm:justify-start
                  "
                >

                  <Mail className="h-4 w-4 shrink-0 text-white" />

                  <span className="truncate">
                    {user.email}
                  </span>

                </div>
              )}

            </div>

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              justify-center
              gap-3
              sm:justify-end
            "
          >

            {!editing ? (
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccess("");
                  setEditing(true);
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-indigo-600
                  transition
                  hover:bg-gray-100
                "
              >

                <Edit3 className="h-4 w-4" />

                Modifier le profil

              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-indigo-600
                    transition
                    hover:bg-gray-100
                    disabled:opacity-50
                  "
                >

                  <X className="h-4 w-4" />

                  Annuler

                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-indigo-600
                    transition
                    hover:bg-gray-100
                    disabled:opacity-50
                  "
                >

                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}

                  {saving
                    ? "Enregistrement..."
                    : "Enregistrer"}

                </button>
              </>
            )}

          </div>

        </div>
      </div>

      {/* =====================================================
          MESSAGES
      ===================================================== */}

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">

          <CheckCircle2 className="h-5 w-5 shrink-0" />

          {success}

        </div>
      )}

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        {/* ===================================================
            LEFT
        =================================================== */}

        <div className="space-y-6 lg:col-span-2">

          {/* =================================================
              INFORMATIONS PERSONNELLES
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-6">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Informations personnelles
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Vos coordonnées et informations principales.
              </p>

            </div>

            {!editing ? (
              <div className="grid gap-4 sm:grid-cols-2">

                {/* LOCALISATION UNIQUEMENT ICI */}

                <ProfileField
                  icon={MapPin}
                  label="Localisation"
                  value={profile?.location}
                />

                <ProfileField
                  icon={Phone}
                  label="Téléphone"
                  value={profile?.phone}
                />

                {isRecruiter && (
                  <>
                    <ProfileField
                      icon={User}
                      label="Poste"
                      value={profile?.job_title}
                    />

                    <ProfileField
                      icon={User}
                      label="Entreprise"
                      value={profile?.company}
                    />
                  </>
                )}

              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">

                <InputField
                  label="Téléphone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="Votre numéro"
                />

                {/* LOCALISATION UNIQUEMENT ICI */}

                <InputField
                  label="Localisation"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="Casablanca, Maroc"
                />

                {isRecruiter && (
                  <>
                    <InputField
                      label="Poste"
                      value={formData.job_title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          job_title: e.target.value,
                        }))
                      }
                      placeholder="Ex: Responsable RH"
                    />

                    <InputField
                      label="Entreprise"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="ID de l'entreprise"
                    />
                  </>
                )}

              </div>
            )}

          </section>

          {/* =================================================
              BIO
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-6">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                À propos de moi
              </h2>

            </div>

            {!editing ? (
              <p className="whitespace-pre-line break-words text-sm leading-7 text-gray-600 dark:text-gray-300">
                {safeText(
                  profile?.bio,
                  "Aucune description renseignée."
                )}
              </p>
            ) : (
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
                rows={6}
                placeholder="Présentez-vous..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/20
                  dark:border-gray-600
                  dark:bg-gray-800
                  dark:text-white
                "
              />
            )}

          </section>

          {/* =================================================
              SOCIAL
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-6">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Réseaux professionnels
              </h2>

            </div>

            {!editing ? (
              <div className="grid gap-4 sm:grid-cols-2">

                {linkedinUrl ? (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-gray-200
                      p-4
                      text-gray-700
                      transition
                      hover:border-indigo-300
                      hover:text-indigo-600
                      dark:border-gray-700
                      dark:text-gray-200
                    "
                  >
                    <LinkedInLogo className="h-5 w-5" />

                    <span className="text-sm font-semibold">
                      LinkedIn
                    </span>
                  </a>
                ) : (
                  <div className="rounded-xl border border-gray-200 p-4 text-sm text-gray-400 dark:border-gray-700">
                    LinkedIn non renseigné
                  </div>
                )}

                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-gray-200
                      p-4
                      text-gray-700
                      transition
                      hover:border-indigo-300
                      hover:text-indigo-600
                      dark:border-gray-700
                      dark:text-gray-200
                    "
                  >
                    <GitHubLogo className="h-5 w-5" />

                    <span className="text-sm font-semibold">
                      GitHub
                    </span>
                  </a>
                ) : (
                  <div className="rounded-xl border border-gray-200 p-4 text-sm text-gray-400 dark:border-gray-700">
                    GitHub non renseigné
                  </div>
                )}

              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">

                <InputField
                  label="LinkedIn"
                  value={formData.linkedin_url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      linkedin_url: e.target.value,
                    }))
                  }
                  placeholder="https://linkedin.com/in/..."
                />

                <InputField
                  label="GitHub"
                  value={formData.github_url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      github_url: e.target.value,
                    }))
                  }
                  placeholder="https://github.com/..."
                />

              </div>
            )}

          </section>
        </div>

        {/* ===================================================
            RIGHT
        =================================================== */}

        <div className="space-y-6">

          {/* =================================================
              CV
          ================================================= */}

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <div className="bg-indigo-600 px-5 py-4">

              <div className="flex items-center gap-3 text-white">

                <FileText className="h-6 w-6" />

                <div>

                  <h2 className="font-bold">
                    Curriculum Vitae
                  </h2>

                  <p className="text-xs text-white/80">
                    PDF, DOC ou DOCX · 10 MB max
                  </p>

                </div>

              </div>

            </div>

            <div className="p-5">

              {cvUrl ? (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        CV disponible
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Votre CV est enregistré.
                      </p>

                    </div>

                  </div>

                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      mt-4
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-indigo-600
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-indigo-700
                    "
                  >
                    <FileText className="h-4 w-4" />
                    Voir le CV
                  </a>

                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 p-5 text-center dark:border-gray-600">

                  <FileText className="mx-auto h-8 w-8 text-gray-400" />

                  <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                    Aucun CV ajouté
                  </p>

                </div>
              )}

              {editing && (
                <div className="mt-4">

                  <label
                    htmlFor="cv-upload"
                    className="
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-indigo-200
                      bg-indigo-50
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-indigo-700
                      transition
                      hover:bg-indigo-100
                      dark:border-indigo-900
                      dark:bg-indigo-950
                      dark:text-indigo-300
                    "
                  >

                    <Upload className="h-4 w-4" />

                    {cvFile
                      ? cvFile.name
                      : cvUrl
                        ? "Remplacer le CV"
                        : "Ajouter un CV"}

                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleCvChange}
                    />

                  </label>

                </div>
              )}

            </div>
          </section>

          {/* =================================================
              ACCOUNT
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              Compte
            </h2>

            <div className="space-y-4">

              <div>

                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.email || "Non renseigné"}
                </p>

              </div>

              <div>

                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Type de compte
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {isRecruiter
                    ? "Recruteur"
                    : "Candidat"}
                </p>

              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
} 