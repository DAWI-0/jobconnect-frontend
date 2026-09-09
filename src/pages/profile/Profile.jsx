import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function ProfileField({ label, value }) {
  if (!value) return null;
  return (
    <div className="text-sm">
      <span className="font-medium text-slate-700 dark:text-slate-300">
        {label} :
      </span>{" "}
      <span className="text-slate-600 dark:text-slate-400">{value}</span>
    </div>
  );
}

export default function Profile() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({});
  const [cvFile, setCvFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      let endpoint = "";
      if (user.role === "CANDIDATE") endpoint = "/accounts/candidates/";
      else if (user.role === "RECRUITER") endpoint = "/accounts/recruiters/";
      else {
        setLoading(false);
        return;
      }

      const res = await api.get(endpoint);
      const data = res.data.results?.[0] || res.data[0] || res.data;
      setProfile(data);

      setFormData({
        phone: data.phone || "",
        location: data.location || "",
        bio: data.bio || "",
        linkedin_url: data.linkedin_url || "",
        github_url: data.github_url || "",
        job_title: data.job_title || "",
      });
    } catch {
      setError(t("profile.loadError"));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const endpoint =
        user.role === "CANDIDATE"
          ? `/accounts/candidates/${profile.id}/`
          : `/accounts/recruiters/${profile.id}/`;

      const hasFiles = cvFile || photoFile;

      let payload;
      let config = {};

      if (hasFiles) {
        // FormData seulement si fichiers
        payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          payload.append(key, value);
        });
        if (cvFile) payload.append("cv", cvFile);
        if (photoFile) payload.append("profile_picture", photoFile);
        // NE PAS définir Content-Type manuellement — axios met le boundary tout seul
      } else {
        // JSON si pas de fichiers — plus fiable pour les champs texte
        payload = { ...formData };
      }

      const res = await api.patch(endpoint, payload, config);

        setProfile(res.data);
        setFormData({
        phone: res.data.phone || "",
        location: res.data.location || "",
        bio: res.data.bio || "",
        linkedin_url: res.data.linkedin_url || "",
        github_url: res.data.github_url || "",
        job_title: res.data.job_title || "",
        });

        setMessage(t("profile.saveSuccess"));
        setEditing(false);
        setCvFile(null);
        setPhotoFile(null);
    } catch (err) {
      const detail =
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data || {});
      setError(t("profile.saveError") + " " + detail);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <p className="py-8 text-center text-slate-600 dark:text-slate-400">
        {t("common.loading")}
      </p>
    );

  if (!profile && user?.role !== "ADMIN")
    return (
      <p className="py-8 text-center text-red-500">
        {error || t("profile.notFound")}
      </p>
    );

  const isCandidate = user?.role === "CANDIDATE";
  const isRecruiter = user?.role === "RECRUITER";

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
        {t("profile.title")}
      </h2>

      {message && (
        <p className="mb-4 rounded-lg bg-green-100 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </p>
      )}

      {!editing ? (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          {/* Avatar + nom */}
          <div className="flex items-center gap-4">
            {profile?.profile_picture ? (
              <img
                src={profile.profile_picture}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-500/20"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white ring-2 ring-indigo-100 dark:ring-indigo-500/20">
                {(user?.first_name?.[0] || "") +
                  (user?.last_name?.[0] || "") || "U"}
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
              <p className="mt-1 text-xs font-medium text-primary">
                {user?.role}
              </p>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Infos */}
          <div className="grid gap-3">
            <ProfileField label={t("profile.phone")} value={profile?.phone} />

            {isCandidate && (
              <>
                <ProfileField
                  label={t("profile.location")}
                  value={profile?.location}
                />
                <ProfileField label={t("profile.bio")} value={profile?.bio} />
                <ProfileField
                  label={t("profile.linkedin")}
                  value={profile?.linkedin_url}
                />
                <ProfileField
                  label={t("profile.github")}
                  value={profile?.github_url}
                />
                {profile?.cv && (
                  <div className="text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {t("profile.cv")} :
                    </span>{" "}
                    <a
                      href={profile.cv}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      Voir
                    </a>
                  </div>
                )}
              </>
            )}

            {isRecruiter && (
              <>
                <ProfileField
                  label={t("profile.jobTitle")}
                  value={profile?.job_title}
                />
                <ProfileField
                  label={t("profile.company")}
                  value={profile?.company_name}
                />
              </>
            )}
          </div>

          <button
            onClick={() => setEditing(true)}
            className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {t("profile.edit")}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("profile.phone")}
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          {isCandidate && (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t("profile.location")}
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t("profile.bio")}
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t("profile.linkedin")}
                </label>
                <input
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t("profile.github")}
                </label>
                <input
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t("profile.cv")} (PDF, DOC, DOCX)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files[0])}
                  className="w-full text-sm text-slate-600 dark:text-slate-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t("profile.photo")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files[0])}
                  className="w-full text-sm text-slate-600 dark:text-slate-400"
                />
              </div>
            </>
          )}

          {isRecruiter && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("profile.jobTitle")}
              </label>
              <input
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {saving ? t("common.saving") : t("common.save")}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setError("");
                setCvFile(null);
                setPhotoFile(null);
              }}
              className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}