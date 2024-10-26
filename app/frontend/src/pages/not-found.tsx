import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-lg space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tighter transition-transform hover:scale-110">
            404
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Oops! It seems like you’ve stumbled into uncharted territory.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            The page you're looking for might have been moved, deleted, or maybe it never existed.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex h-12 items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-transform hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          Return to the safety of home
        </Link>
        <div className="mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Or, perhaps you’d like to explore more from where you are:
          </p>
          <Link
            to="/projects"
            className="inline-block mt-2 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View Our Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
