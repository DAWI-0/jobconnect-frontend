import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Briefcase,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const CATEGORIES = [
  { label: "Développement", rotate: -2 },
  { label: "Design", rotate: 1.5 },
  { label: "Marketing", rotate: -1 },
  { label: "Finance", rotate: 2 },
  { label: "Ressources Humaines", rotate: -1.5 },
  { label: "Data", rotate: 1 },
  { label: "Vente", rotate: -2.5 },
  { label: "Support client", rotate: 1.8 },
];

const ROLES = [
  { value: "CANDIDATE", label: "Candidat", desc: "Je cherche un emploi", icon: User },
  { value: "RECRUITER", label: "Recruteur", desc: "Je recrute des talents", icon: Briefcase },
];

function extractErrorMessage(err) {
  const data = err.response?.data;
  if (!data) return "Une erreur est survenue. Veuillez réessayer.";
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  const firstField = Object.values(data)[0];
  if (Array.isArray(firstField)) return firstField[0];
  if (typeof firstField === "string") return firstField;
  return "Une erreur est survenue. Veuillez réessayer.";
}

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    role: "CANDIDATE",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const setRole = (role) => setForm({ ...form, role });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) return setError("Mots de passe différents");
    if (form.password.length < 8) return setError("8 caractères minimum");
    setError("");
    setLoading(true);
    try {
      const payload = { ...form };
      delete payload.confirm_password;
      await api.post("/accounts/users/", payload);
      await login({ email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const passwordsMismatch =
    form.confirm_password.length > 0 && form.password !== form.confirm_password;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Branding panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary to-secondary p-12 text-white lg:flex">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          <span className="text-white">Job</span>
          <span className="text-white/70">Connect</span>
        </Link>

        <div className="max-w-sm">
          <h1 className="text-4xl font-bold leading-tight">
            Deux façons de rejoindre JobConnect.
          </h1>
          <p className="mt-4 text-white/80">
            Un compte candidat pour postuler aux meilleures offres, ou un
            compte recruteur pour publier les vôtres.
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {CATEGORIES.map(({ label, rotate }) => (
              <span
                key={label}
                style={{ transform: `rotate(${rotate}deg)` }}
                className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} JobConnect
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-8 inline-flex text-2xl font-bold tracking-tight lg:hidden"
          >
            <span className="text-primary">Job</span>
            <span className="text-secondary">Connect</span>
          </Link>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Créer un compte
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Rejoignez JobConnect en quelques étapes.
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span className="break-words">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <fieldset className="m-0 border-0 p-0">
              <legend className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Je suis un...
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map(({ value, label, desc, icon: Icon }) => {
                  const selected = form.role === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRole(value)}
                      aria-pressed={selected}
                      className={`flex flex-col items-start gap-2 rounded-lg border-2 p-3.5 text-start transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                        selected
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                      }`}
                    >
                      <Icon size={20} className={selected ? "text-primary" : "text-slate-400"} />
                      <span>
                        <span
                          className={`block text-sm font-semibold ${
                            selected ? "text-primary" : "text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          {label}
                        </span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                          {desc}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Prénom
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  autoComplete="given-name"
                  placeholder="Amine"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Nom
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  autoComplete="family-name"
                  placeholder="Benali"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 ps-11 pe-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 ps-11 pe-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-pressed={showPassword}
                  aria-label={
                    showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
                  }
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 rounded text-slate-400 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-slate-400">8 caractères minimum</p>
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.confirm_password}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-lg border bg-white py-2.5 ps-11 pe-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-slate-900 dark:text-white ${
                    passwordsMismatch
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-900/50 dark:focus:ring-red-900/20"
                      : "border-slate-200 focus:border-primary focus:ring-primary/10 dark:border-slate-700 dark:focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-pressed={showConfirm}
                  aria-label={
                    showConfirm ? "Masquer le mot de passe" : "Afficher le mot de passe"
                  }
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 rounded text-slate-400 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:text-slate-300"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordsMismatch && (
                <p className="mt-1.5 text-xs text-red-500">
                  Les mots de passe ne correspondent pas
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Inscription...
                </>
              ) : (
                "S'inscrire"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Déjà un compte ?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}