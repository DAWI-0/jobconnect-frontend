import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

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
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      const data = err.response?.data;
      setError(typeof data === "object" ? JSON.stringify(data) : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="first_name" placeholder="Prénom" value={form.first_name} onChange={handleChange} required />
        <input name="last_name" placeholder="Nom" value={form.last_name} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="CANDIDATE">Candidat</option>
          <option value="RECRUITER">Recruteur</option>
        </select>
        <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
        <input name="confirm_password" type="password" placeholder="Confirmer" value={form.confirm_password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "..." : "S'inscrire"}</button>
      </form>
      <Link to="/login">Connexion</Link>
    </div>
  );
}