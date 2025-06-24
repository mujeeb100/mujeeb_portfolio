import React from "react";
import "./home.css";

function Home1() {
  return (
    //        <section id="about" className="px-6 md:px-20 py-20 bg-white">

    <section
      id="home"
      className="flex flex-col-reverse lg:flex-row items-center justify-between  px-8 lg:px-32 py-20 min-h-screen "
    >
      <div className="max-w-xl">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Hi, I'm{" "}
          <span className="text-blue-600 typing-effect inline-block">
            Mujeeb Ansari
          </span>
        </h1>

        <h2 className="text-xl font-medium text-gray-700 mb-6">
          Front End Developer
        </h2>
        <p className="text-gray-500 mb-8">
          Building responsive and interactive frontend interfaces using modern
          technologies.
          <br />
          Focused on performance, accessibility, and user experience.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">
            View Projects
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition">
            Contact Me
          </button>
        </div>
      </div>

      <div className="mb-12 lg:mb-0">
        <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-10 rounded-2xl shadow-2xl text-white text-center">
          <div className="text-4xl mb-2">{"</>"}</div>
          <div className="font-semibold text-lg">Front End Software</div>
          <div className="text-sm">Developer</div>
        </div>
      </div>
    </section>
  );
}

export default Home1;
