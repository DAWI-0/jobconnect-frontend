import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4 text-xl text-gray-600">
        Page introuvable
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-black px-5 py-2.5 text-white hover:bg-gray-800"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;
