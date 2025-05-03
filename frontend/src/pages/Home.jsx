import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.authReducer);
  return (
    <div className="bg-[#000957] text-white min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
          All-in-One Task & Project Tracker
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-[#FFEB00]">
          Create projects, add tasks, mark progress, and stay organized.
        </p>
        {user.currentUser === null ? (
          <Link
            to="/register"
            className="inline-block bg-[#FFEB00] text-[#000957] font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition"
          >
            Get Started
          </Link>
        ) : null}
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 bg-white text-[#000957]">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-center">
          <img
            src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Task Planner"
            className="w-full rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Plan Your Projects with Ease
            </h2>
            <p className="text-lg mb-2">
              Create new projects with just a few clicks. Set goals, deadlines,
              and track your work in one place.
            </p>
            <p className="text-lg">
              Everything is designed for clarity and speed — no clutter, just
              productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Task Management Section */}
      <section className="px-4 py-16 text-white">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#FFEB00]">
              Manage Tasks Like a Pro
            </h2>
            <p className="text-lg mb-2">
              Add tasks to your project, set descriptions, mark them as done,
              and edit or delete them anytime.
            </p>
            <p className="text-lg">
              Status badges and clear layouts keep everything in view — so
              nothing falls through the cracks.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1514474959185-1472d4c4e0d4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Checklist Task"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to take control of your workflow?
        </h2>
        <p className="text-lg mb-8 text-[#FFEB00]">
          {user.currentUser === null
            ? "Sign up now and start organizing your life with simplicity and style."
            : "Take your productivity to the next level with our task tracker. Whether you're managing personal projects or collaborating with a team, we've got you covered."}
        </p>
        <Link
          to={user.currentUser === null ? "/register" : "/add-project"}
          className="inline-block bg-[#FFEB00] text-[#000957] font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition"
        >
          {user.currentUser === null ? "Create Account" : "Add Project"}
        </Link>
      </section>
    </div>
  );
};

export default Home;
