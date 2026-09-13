import { Link } from "react-router-dom";
import NotFoundImage from "../assets/404.svg";

function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-slate-50 px-6 py-12 text-slate-900 dark:bg-slate-950 dark:text-white">
      
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 text-center md:flex-row md:text-left">

        {/* Image */}
        <div className="w-full max-w-md">
          <img
            src={NotFoundImage}
            alt="Page introuvable"
            className="mx-auto w-full"
          />
        </div>

        {/* Content */}
        <div className="max-w-md">

          <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            404
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Page introuvable
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:opacity-95"
          >
            Retour à l'accueil
          </Link>

        </div>

      </div>

    </main>
  );
}

export default NotFound;

