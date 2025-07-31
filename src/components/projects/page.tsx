const Projects = () => {
  return (
    <section
      id="projects"
      className="px-6 md:px-20 py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300"
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        Featured <span className="text-blue-600 dark:text-blue-400">Projects</span>
      </h2>

      <div className="space-y-8">
        {/* Project Cards */}
        {[
          {
            title: "Payroll Management System",
            description: [
              "A web-based solution that automates employee salary processing, tax calculations, leave adjustments, and payslip generation.",
              "Admins can configure pay cycles, manage employee records, and track salary disbursement history with ease.",
              "The system ensures compliance with government regulations and provides detailed reports for audits and HR operations.",
            ],
            stack: [
              "React",
              "TypeScript",
              ".Net",
              "JWT",
              "RTK Query",
              "i18n Next",
              "Tailwind CSS",
            ],
          },
          {
            title: "Niyogin Fintech Portal",
            description: [
              "A comprehensive platform for managing financial services, including loan applications, customer accounts, and transaction history.",
              "Features include real-time data analytics, user-friendly dashboards, and secure transaction processing.",
              "The portal is designed to enhance user experience while ensuring robust security and compliance with financial regulations.",
            ],
            stack: ["Vue", "TypeScript", "Nuxt.js", "i18n Next", "Tailwind CSS"],
          },
          {
            title: "Saffola Oil Official Website",
            description: [
              "A modern, responsive website for Saffola Oil, showcasing their products, health benefits, and recipes.",
              "The site features a clean design, easy navigation, and engaging content to promote healthy cooking with Saffola products.",
              "Built with a focus on user experience and brand consistency.",
            ],
            stack: [
              "HTML5",
              "CSS3",
              "JavaScript",
              "React",
              "Redux",
              "Tailwind CSS",
            ],
          },
        ].map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              {project.title}
            </h3>
            {project.description.map((para, i) => (
              <p
                key={i}
                className="text-gray-700 dark:text-gray-300 mb-2 last:mb-4"
              >
                {para}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm px-3 py-1 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
              >
                Live Demo ↗
              </a>
              <a
                href="#"
                className="border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900 transition"
              >
                GitHub ⭢
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
