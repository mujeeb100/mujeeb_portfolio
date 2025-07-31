const WorkExperience = () => {
  return (
    <section
      id="experience"
      className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 md:px-20 py-20 transition-colors duration-300"
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        Work <span className="text-blue-600 dark:text-blue-400">Experience</span>
      </h2>

      <div className="space-y-8">
        {/* Experience Card Template */}
        {[
          {
            title: "Senior Front-end React Developer",
            company: "Vistra International Expanstion India Pvt Ltd.",
            duration: "May 2023 – Sep 2024 • Mumbai, India",
            project: "Payroll Management System",
            link: "https://www.onepayroll.net/",
            stack: "React.js, Redux, TypeScript, Tailwind CSS",
            icon: "🖥️",
            details: [
              "Built a payroll management system to automate employee payments and benefits.",
              "Ensured tax compliance and reduced payroll processing errors.",
              "Integrated with HR systems for seamless data flow.",
              "Created employee portals for payslip access and reporting.",
              "Delivered scalable architecture supporting small to large enterprises.",
            ],
          },
          {
            title: "Front-end Developer",
            company: "Psychx86 Technologies LLP",
            duration: "Jul 2022 – Mar 2023 • Mumbai, India (On-site at Niyogin FinTech)",
            project: "Niyogin Fintech Portal",
            link: "https://www.niyogin.com/",
            stack: "Vue.js, Vuex, Bootstrap",
            icon: "💼",
            details: [
              "Managed complex financial dashboard layouts and component architecture.",
              "Collaborated with cross-functional teams to deliver performant UIs.",
              "Focused on performance optimization and intuitive user experiences.",
            ],
          },
          {
            title: "Front-end Developer",
            company: "Cloudage Software Solution",
            duration: "May 2021 – May 2022 • Mumbai, India",
            project: "Cloudage Web Applications",
            link: "http://cloudage.tech/",
            stack: "HTML, CSS, JavaScript, Bootstrap",
            icon: "🌐",
            details: [
              "Worked closely with stakeholders to verify product functionality and UI expectations.",
              "Contributed to building modular, responsive web interfaces based on project specs.",
            ],
          },
          {
            title: "UI Developer",
            company: "Oblix Technologies",
            duration: "May 2019 – May 2021 • Mumbai, India",
            project: "Responsive Website Development",
            link: "",
            stack: "jQuery, Bootstrap, CSS3, HTML5",
            icon: "🧩",
            details: [
              "Designed intuitive and visually appealing web interfaces using modern CSS frameworks.",
              "Integrated third-party plugins and tools to enhance interactivity.",
              "Focused on cross-browser compatibility and responsive layouts.",
            ],
          },
        ].map((exp, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border dark:border-gray-700"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-10 h-10 flex items-center justify-center rounded-full text-xl">
                {exp.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold">{exp.title}</h3>
                <p className="text-blue-600 dark:text-blue-400">{exp.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</p>
              </div>
            </div>

            <h4 className="text-blue-600 dark:text-blue-400 font-semibold mt-4">
              {exp.project}
              {exp.link && (
                <>
                  {" — "}
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {new URL(exp.link).hostname}
                  </a>
                </>
              )}
            </h4>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{exp.stack}</p>

            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 space-y-1">
              {exp.details.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
