import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/jobs/${id}/`);
      setJob(res.data);
    } catch {
      setError("Offre introuvable.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setApplyLoading(true);
    setApplyError("");
    setApplySuccess(false);

    try {
      await api.post("/applications/", { job_offer: id });
      setApplySuccess(true);
    } catch (err) {
      const data = err.response?.data;
      let msg = "Erreur lors de la candidature.";
      if (data?.detail) {
        msg = data.detail;
      } else if (data?.job_offer) {
        msg = data.job_offer.join(", ");
      } else if (data?.non_field_errors) {
        msg = data.non_field_errors.join(", ");
      } else if (typeof data === "object" && data !== null) {
        msg = JSON.stringify(data);
      }
      setApplyError(msg);
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!job) return null;

  return (
    <div>
      <Link to="/jobs">← Retour aux offres</Link>

      <h2>{job.title}</h2>
      <p>
        <strong>{job.company_name}</strong> — {job.location || "Non précisé"}
      </p>

      <div>
        <span>{job.contract_type}</span> | <span>{job.experience_level}</span> |{" "}
        <span>{job.remote ? "Remote" : "Sur site"}</span>
      </div>

      {job.salary_min && job.salary_max && (
        <p>Salaire : {job.salary_min} - {job.salary_max}</p>
      )}

      {job.skills?.length > 0 && (
        <p>Compétences : {job.skills.map((s) => s.name).join(", ")}</p>
      )}

      <p>
        Publié le :{" "}
        {job.published_at
          ? new Date(job.published_at).toLocaleDateString("fr-FR")
          : "-"}
      </p>
      {job.deadline && (
        <p>Date limite : {new Date(job.deadline).toLocaleDateString("fr-FR")}</p>
      )}

      <hr />
      <h3>Description</h3>
      <p style={{ whiteSpace: "pre-line" }}>{job.description || "Aucune description."}</p>
      <hr />

      {applySuccess && <p style={{ color: "green" }}>Candidature envoyée !</p>}
      {applyError && <p style={{ color: "red" }}>{applyError}</p>}

      {user ? (
        <button onClick={handleApply} disabled={applyLoading || applySuccess}>
          {applyLoading ? "Envoi..." : applySuccess ? "Déjà postulé" : "Postuler"}
        </button>
      ) : (
        <p>
          <Link to="/login">Connectez-vous</Link> pour postuler.
        </p>
      )}
    </div>
  );
}