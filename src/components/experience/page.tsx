const WorkExperience = () => {
  return (
    <section id="experience" className="bg-gray-100 px-6 md:px-20 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Work <span className="text-blue-600">Experience</span>
      </h2>

      <div className="space-y-8">
        {/* Senior Front-end React Developer */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full text-xl">
              🖥️
            </div>
            <div>
              <h3 className="text-lg font-bold">Senior Front-end React Developer</h3>
              <p className="text-blue-600">Vistra International Expanstion India Pvt Ltd.</p>
              <p className="text-sm text-gray-500">May 2023 – Sep 2024 • Mumbai, India</p>
            </div>
          </div>

          <h4 className="text-blue-600 font-semibold mt-4">
            Payroll Management System — <a href="https://www.onepayroll.net/" target="_blank" rel="noopener noreferrer" className="underline">onepayroll.net</a>
          </h4>
          <p className="text-sm text-gray-600 mb-3">React.js, Redux, TypeScript, Tailwind CSS</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Built a payroll management system to automate employee payments and benefits.</li>
            <li>Ensured tax compliance and reduced payroll processing errors.</li>
            <li>Integrated with HR systems for seamless data flow.</li>
            <li>Created employee portals for payslip access and reporting.</li>
            <li>Delivered scalable architecture supporting small to large enterprises.</li>
          </ul>
        </div>

        {/* Front-end Developer - Niyogin FinTech */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full text-xl">
              💼
            </div>
            <div>
              <h3 className="text-lg font-bold">Front-end Developer</h3>
              <p className="text-blue-600">Psychx86 Technologies LLP</p>
              <p className="text-sm text-gray-500">Jul 2022 – Mar 2023 • Mumbai, India (On-site at Niyogin FinTech)
              </p>
            </div>
          </div>

          <h4 className="text-blue-600 font-semibold mt-4">
            Niyogin Fintech Portal — <a href="https://www.niyogin.com/" target="_blank" rel="noopener noreferrer" className="underline">niyogin.com</a>
          </h4>
          <p className="text-sm text-gray-600 mb-3">Vue.js, Vuex, Bootstrap</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Managed complex financial dashboard layouts and component architecture.</li>
            <li>Collaborated with cross-functional teams to deliver performant UIs.</li>
            <li>Focused on performance optimization and intuitive user experiences.</li>
          </ul>
        </div>

        {/* Front-end Developer - Cloudage Software Solution */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full text-xl">
              🌐
            </div>
            <div>
              <h3 className="text-lg font-bold">Front-end Developer</h3>
              <p className="text-blue-600">Cloudage Software Solution</p>
              <p className="text-sm text-gray-500">May 2021 – May 2022 • Mumbai, India</p>
            </div>
          </div>

          <h4 className="text-blue-600 font-semibold mt-4">
            Cloudage Web Applications — <a href="http://cloudage.tech/" target="_blank" rel="noopener noreferrer" className="underline">cloudage.tech</a>
          </h4>
          <p className="text-sm text-gray-600 mb-3">HTML, CSS, JavaScript, Bootstrap</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Worked closely with stakeholders to verify product functionality and UI expectations.</li>
            <li>Contributed to building modular, responsive web interfaces based on project specs.</li>
          </ul>
        </div>

        {/* UI Developer - Oblix Technologies */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full text-xl">
              🧩
            </div>
            <div>
              <h3 className="text-lg font-bold">UI Developer</h3>
              <p className="text-blue-600">Oblix Technologies</p>
              <p className="text-sm text-gray-500">May 2019 – May 2021 • Mumbai, India</p>
            </div>
          </div>

          <h4 className="text-blue-600 font-semibold mt-4">Responsive Website Development</h4>
          <p className="text-sm text-gray-600 mb-3">jQuery, Bootstrap, CSS3, HTML5</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Designed intuitive and visually appealing web interfaces using modern CSS frameworks.</li>
            <li>Integrated third-party plugins and tools to enhance interactivity.</li>
            <li>Focused on cross-browser compatibility and responsive layouts.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
