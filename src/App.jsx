import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Layout from "./components/layout/Layout";

import Home from "./pages/home/Home";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Jobs from "./pages/jobs/Jobs";
import JobDetails from "./pages/jobs/JobDetails";
import JobForm from "./pages/jobs/recruiter/JobForm";

import Applications from "./pages/applications/Applications";
import RecruiterApplications from "./pages/applications/RecruiterApplications";

import Favorites from "./pages/favorites/Favorites";

import Profile from "./pages/profile/Profile";

import Chat from "./pages/messaging/Chat";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* =========================
              LAYOUT
          ========================= */}
          <Route element={<Layout />}>

            {/* =========================
                PUBLIC
            ========================= */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />


            {/* =========================
                CANDIDATE
            ========================= */}
            <Route path="/applications" element={<Applications />} />
            <Route path="/favorites" element={<Favorites />} />


            {/* =========================
                PROFILE
            ========================= */}
            <Route path="/profile" element={<Profile />} />


            {/* =========================
                RECRUITER
            ========================= */}

            {/* Liste des jobs */}
            <Route
              path="/recruiter/jobs"
              element={<Jobs />}
            />

            {/* Créer un nouveau job */}
            <Route
              path="/recruiter/jobs/new"
              element={<JobForm />}
            />

            {/* Modifier un job */}
            <Route
              path="/recruiter/jobs/:id/edit"
              element={<JobForm />}
            />

            {/* Applications reçues */}
            <Route
              path="/recruiter/applications"
              element={<RecruiterApplications />}
            />


            {/* =========================
                CHAT
            ========================= */}
            <Route
              path="/chat"
              element={<Chat />}
            />

          </Route>


          {/* =========================
              AUTH
          ========================= */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* =========================
              404
          ========================= */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;