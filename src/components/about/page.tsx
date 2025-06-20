const About = () => {
  return (
    <section id="about" className="px-6 md:px-20 py-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        About <span className="text-blue-600">Me</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Frontend Card */}
        <div className="p-6 rounded-xl shadow-md bg-white border hover:shadow-xl transition">
          <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full mb-4">
            <span className="text-xl">{"</>"}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Frontend Development</h3>
          <p className="text-gray-600">
            Building responsive and interactive user interfaces using React, Next.js, and modern CSS frameworks like Tailwind.
          </p>
        </div>

        {/* Backend Card */}
        <div className="p-6 rounded-xl shadow-md bg-white border hover:shadow-xl transition">
          <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full mb-4">
            <span className="text-xl">🗄️</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Backend Development</h3>
          <p className="text-gray-600">
            Developing robust APIs and server-side applications using Node.js, TypeScript, and various database technologies.
          </p>
        </div>

        {/* DevOps Card */}
        <div className="p-6 rounded-xl shadow-md bg-white border hover:shadow-xl transition">
          <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full mb-4">
            <span className="text-xl">☁️</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">DevOps Engineering</h3>
          <p className="text-gray-600">
            Implementing CI/CD pipelines, container orchestration, and cloud infrastructure using Docker, Kubernetes, AWS, and GitOps.
          </p>
        </div>
      </div>

      {/* Description Paragraph */}
      <div className="bg-blue-50 p-6 rounded-xl shadow text-gray-700 text-md leading-relaxed">
        Im a fullstack developer and DevOps engineer based in Aurangabad, Maharashtra. I specialize in building scalable web applications with modern technologies and implementing efficient deployment pipelines.
        <br /><br />
        With experience in both frontend and backend development, as well as DevOps practices, I bring a comprehensive approach to software development, from concept to deployment and maintenance.
      </div>
    </section>
  );
};

export default About;
