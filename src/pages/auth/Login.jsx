import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

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

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

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
            Vos candidatures et vos offres, au même endroit.
          </h1>
          <p className="mt-4 text-white/80">
            Connectez-vous pour suivre l'avancement de vos candidatures ou
            gérer les offres que vous avez publiées.
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
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-8 inline-flex text-2xl font-bold tracking-tight lg:hidden"
          >
            <span className="text-primary">Job</span>
            <span className="text-secondary">Connect</span>
          </Link>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Connexion
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Heureux de vous revoir.
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span className="break-words">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                  autoComplete="current-password"
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Pas encore de compte ?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}