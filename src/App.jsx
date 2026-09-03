import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Jobs from "./pages/jobs/Jobs";
import JobDetails from "./pages/jobs/JobDetails";
import Applications from "./pages/applications/Applications";
import Favorites from "./pages/favorites/Favorites";
import Chat from "./pages/messaging/Chat";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            <Route path="/jobs" element={<Jobs />} />

            <Route path="/jobs/:id" element={<JobDetails />} />

            <Route path="/applications" element={<Applications />} />

            <Route path="/favorites" element={<Favorites />} />

            <Route path="/chat" element={<Chat />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;