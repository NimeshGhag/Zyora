import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-red-700">404</p>
          <h1 className="mt-4 text-5xl text-emerald-700 font-semibold tracking-tight text-balancesm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty  sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              className="rounded-md bg-black text-white px-3.5 py-2.5 text-sm font-semibold shadow-xs hover:text-amber-300 "
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;
