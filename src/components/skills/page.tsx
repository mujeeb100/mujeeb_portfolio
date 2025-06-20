const TechnicalSkills = () => {
  return (
    <section id="skills" className="bg-gray-100 px-6 md:px-20 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Technical <span className="text-blue-600">Skills</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Frontend Skills */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-blue-600 font-semibold text-lg flex items-center mb-4">
            <span className="mr-2 text-xl">💻</span> Frontend
          </h3>
          <div className="flex flex-wrap gap-2">
            {["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "React Native", "Next.js", "Tailwind CSS"].map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Backend Skills */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-blue-600 font-semibold text-lg flex items-center mb-4">
            <span className="mr-2 text-xl">🗄️</span> Backend
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Node.js", "PostgreSQL", "Prisma", "Redis", "Kafka"].map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* DevOps Skills */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-blue-600 font-semibold text-lg flex items-center mb-4">
            <span className="mr-2 text-xl">☁️</span> DevOps
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Docker", "Kubernetes", "AWS", "GitOps", "ArgoCD"].map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
