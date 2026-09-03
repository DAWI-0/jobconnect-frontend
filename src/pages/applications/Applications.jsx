import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/");
      setApplications(res.data.results || res.data);
    } catch {
      setError("Erreur lors du chargement des candidatures.");
    } finally {
      setLoading(false);
    }
  };

  const statusLabel = {
    PENDING: "En attente",
    REVIEWING: "En cours d'examen",
    SHORTLISTED: "Présélectionné",
    INTERVIEW: "Entretien",
    ACCEPTED: "Accepté",
    REJECTED: "Refusé",
    WITHDRAWN: "Retiré",
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Mes candidatures</h2>

      {applications.length === 0 ? (
        <p>Aucune candidature.</p>
      ) : (
        <div>
          {applications.map((app) => (
            <div
              key={app.id}
              style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}
            >
              <h3>
                <Link to={`/jobs/${app.job_offer}`}>
                  {app.job_title || "Offre"}
                </Link>
              </h3>
              <p>{app.company_name}</p>
              <p>
                {app.location || "Non précisé"} | {app.contract_type || "-"}
              </p>
              <p>Statut : {statusLabel[app.status] || app.status}</p>
              <p>
                Postulé le :{" "}
                {new Date(app.applied_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}