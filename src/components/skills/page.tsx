import React from "react";

const skillsData = [
  {
    category: "Frontend",
    icon: "💻",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Vue.js",
      "Vuex",
      "Redux",
      "Bootstrap",
      "Material UI",
      "nuxt.js",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    icon: "🗄️",
    skills: ["Node.js", "PostgreSQL", "Prisma", "Redis", "Kafka"],
  },
  {
    category: "DevOps",
    icon: "☁️",
    skills: ["Docker", "Kubernetes", "AWS", "GitOps", "ArgoCD"],
  },
];

const TechnicalSkills = () => {
  return (
    <section
      id="skills"
      className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 md:px-20 py-20 transition-colors duration-300"
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        Technical <span className="text-blue-600 dark:text-blue-400">Skills</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillsData.map((group) => (
          <div
            key={group.category}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl p-6 shadow-md transition transform hover:-translate-y-2 hover:shadow-lg duration-300"
          >
            <h3 className="text-blue-600 dark:text-blue-400 font-semibold text-lg flex items-center mb-4">
              <span className="mr-2 text-xl">{group.icon}</span>{" "}
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm px-3 py-1 rounded-full font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnicalSkills;
