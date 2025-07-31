import React from "react";
import "./home.css";

function Home1() {
  return (
    <section
      id="home"
      className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 lg:px-32 py-20 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-xl">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Hi, I&apos;m{" "}
          <span className="text-blue-600 dark:text-blue-400 typing-effect inline-block">
            Mujeeb Ansari
          </span>
        </h1>

        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-6">
          Full Stack Developer
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Building responsive and interactive frontend interfaces using modern
          technologies.
          <br />
          Focused on performance, accessibility, and user experience.
        </p>

        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">
            View Projects
          </button>
          <button className="border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition">
            Contact Me
          </button>
        </div>
      </div>

     <div className="mb-12 lg:mb-0">
  <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-10 rounded-3xl shadow-2xl text-white text-center transform transition duration-300 hover:scale-105">
    <div className="text-6xl mb-4">{"</>"}</div>
    <div className="font-bold text-2xl md:text-3xl">Full Stack Software</div>
    <div className="text-lg md:text-xl opacity-90">Developer</div>
  </div>
</div>

    </section>
  );
}

export default Home1;
