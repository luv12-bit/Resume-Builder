import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useSelector(state => state.auth);

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <div className="min-h-fit pb-10 md:pb-20 scroll-mt-28">
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <Link to="/">
            <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
            <a href="#" className="hover:text-green-600 transition">
              Home
            </a>
            <a href="#features" className="hover:text-green-600 transition">
              Features
            </a>
            <a href="#testimonials" className="hover:text-green-600 transition">
              Testimonials
            </a>
            <a href="#cta" className="hover:text-green-600 transition">
              Contact
            </a>
            <Link to="/app/ats-score" className="hover:text-green-600 transition font-medium text-green-700">
              ATS Checker
            </Link>
          </div>

          <div className="flex gap-2">
            <Link
              to="/app?state=register"
              className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white "
              hidden={user}
            >
              Get started
            </Link>
            <Link
              to="/app?state=login"
              className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900 "
              hidden={user}
            >
              Login
            </Link>
            <Link to='/app' className="hidden md:block px-8 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white" hidden={!user}>
              Dashboard
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden active:scale-90 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-menu"
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <a
            href="#"
            className="text-white hover:text-slate-800 hover:font-bold"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-white hover:text-slate-800 hover:font-bold"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="text-white hover:text-slate-800 hover:font-bold"
          >
            Testimonials
          </a>
          <a
            href="#contact"
            className="text-white hover:text-slate-800 hover:font-bold"
          >
            Contact
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-green-600 hover:bg-green-700 transition text-white rounded-md flex"
          >
            X
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-green-300 blur-[100px] opacity-30"></div>

          {/* Avatars + Stars */}
          <div className="mt-14 flex justify-center gap-3 mb-6 flex-wrap">
            <span className="px-3 py-1 text-xs rounded-full bg-purple-200 text-green-700 font-medium">
              AI-powered
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-purple-200 text-green-700 font-medium">
              ATS-ready
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-purple-200 text-green-700 font-medium">
              Student-friendly
            </span>
          </div>

          {/* Headline + CTA */}
          <h1 className="text-4xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-17.5">
            Land your dream job with
            <span className="bg-linear-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
              AI-powered
            </span>
            resumes.
          </h1>

          <p className="max-w-md text-center text-base my-7">
            Create, edit and download professional resumes with AI-powered
            assistance.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 ">
            <Link
              to="/app"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-green-400 flex items-center gap-2 transition-colors"
            >
              Get started
              <FaArrowRightLong />
            </Link>
          </div>

          <p className="py-6 text-slate-600 mt-10 text-center">
            Built for students, freshers, and job seekers
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-slate-500">
            <span className="flex items-center">
              <span className="text-2xl mr-2">🎓</span>
              Student-friendly
            </span>
            <span className="flex items-center">
              <span className="text-2xl mr-2">🤖</span>
              AI-powered
            </span>
            <span className="flex items-center">
              <span className="text-2xl mr-2">📄</span>
              ATS-ready
            </span>
          </div>
        </div>
      </div>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
      </style>
    </>
  );
};

export default Hero;
