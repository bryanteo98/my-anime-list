import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="w-full px-8 text-white bg-white shadow-sm">
      <div className="flex items-center justify-start w-full md:w-auto py-5 mx-auto ">
        <NavLink to="/" className="flex items-center">
          <span className="text-xl font-black text-black select-none">
            REACT<span className="text-blue-600">AnimeList</span>
          </span>
        </NavLink>
      </div>
    </header>
  );
}
