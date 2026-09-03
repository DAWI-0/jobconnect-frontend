import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    contract_type: "",
    experience_level: "",
    remote: "",
  });
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  const fetchJobs = async (url = "/jobs/") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.contract_type) params.append("contract_type", filters.contract_type);
      if (filters.experience_level) params.append("experience_level", filters.experience_level);
      if (filters.remote) params.append("remote", filters.remote);

      const query = params.toString();
      const fullUrl = query ? `${url}?${query}` : url;

      const res = await api.get(fullUrl);
      setJobs(res.data.results || res.data);
      setPagination({
        count: res.data.count || 0,
        next: res.data.next,
        previous: res.data.previous,
      });
    } catch {
      setError("Erreur lors du chargement des offres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const goToPage = (url) => {
    if (!url) return;
    const relative = url.replace("http://127.0.0.1:8000/api", "");
    fetchJobs(relative);
  };

  return (
    <div>
      <h2>Offres d'emploi</h2>

      <form onSubmit={applyFilters}>
        <input
          name="search"
          placeholder="Rechercher..."
          value={filters.search}
          onChange={handleFilterChange}
        />
        <select name="contract_type" value={filters.contract_type} onChange={handleFilterChange}>
          <option value="">Tous contrats</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="INTERNSHIP">Stage</option>
          <option value="FREELANCE">Freelance</option>
          <option value="PART_TIME">Temps partiel</option>
        </select>
        <select name="experience_level" value={filters.experience_level} onChange={handleFilterChange}>
          <option value="">Tous niveaux</option>
          <option value="ENTRY">Débutant</option>
          <option value="JUNIOR">Junior</option>
          <option value="MID">Intermédiaire</option>
          <option value="SENIOR">Senior</option>
        </select>
        <select name="remote" value={filters.remote} onChange={handleFilterChange}>
          <option value="">Tous</option>
          <option value="true">Remote</option>
          <option value="false">Sur site</option>
        </select>
        <button type="submit">Filtrer</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Chargement...</p>}

      <p>{pagination.count} offre(s)</p>

      <div>
        {jobs.map((job) => (
          <div key={job.id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
            <h3>{job.title}</h3>
            <p>{job.company_name} — {job.location || "Non précisé"}</p>
            <p>{job.contract_type} | {job.experience_level} | {job.remote ? "Remote" : "Sur site"}</p>
            {job.salary_min && job.salary_max && (
              <p>Salaire : {job.salary_min} - {job.salary_max}</p>
            )}
            {job.skills?.length > 0 && (
              <p>Skills : {job.skills.map((s) => s.name).join(", ")}</p>
            )}
            <Link to={`/jobs/${job.id}`}>
              <button>Voir détail</button>
            </Link>
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => goToPage(pagination.previous)} disabled={!pagination.previous}>
          Précédent
        </button>
        <button onClick={() => goToPage(pagination.next)} disabled={!pagination.next}>
          Suivant
        </button>
      </div>
    </div>
  );
}