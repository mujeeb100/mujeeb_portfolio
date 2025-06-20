const WorkExperience = () => {
  return (
    <section id="experience" className="bg-gray-100 px-6 md:px-20 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Work <span className="text-blue-600">Experience</span>
      </h2>

      <div className="space-y-8">
        {/* Job Entry 1 */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full text-xl">
              🗄️
            </div>
            <div>
              <h3 className="text-lg font-bold">Full Stack Developer</h3>
              <p className="text-blue-600">HHMaster</p>
              <p className="text-sm text-gray-500">May 2024 – May 2025 • Remote</p>
            </div>
          </div>

          <h4 className="text-blue-600 font-semibold mt-4">
            Dyfana: Multi-Service Platform
          </h4>
          <p className="text-sm text-gray-600 mb-3">React.js, Node.js, TypeScript, TailwindCSS, JWT</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Developed a user-facing site for booking services with filters and Google Maps integration.</li>
            <li>Implemented sign-in, sign-up, and forgot password flows.</li>
            <li>Built an admin interface for user, guide, and approval management.</li>
            <li>Developed service provider portals to manage packages.</li>
          </ul>
          <a href="#" className="text-blue-600 text-sm mt-2 inline-block">Visit site ↗</a>
        </div>

        {/* Job Entry 2 */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h4 className="text-blue-600 font-semibold">
            FDIS Plan
          </h4>
          <p className="text-sm text-gray-600 mb-3">Next.js, TypeScript, TailwindCSS, ShadCN, DHTMLX</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Integrated DHTMLX Gantt chart for tracking timelines and tasks.</li>
            <li>Built drag-and-drop task assignment features.</li>
            <li>Implemented CRUD for services, employees, and roles.</li>
            <li>Developed PDF/Excel export functionality.</li>
          </ul>
          <a href="#" className="text-blue-600 text-sm mt-2 inline-block">Visit site ↗</a>
        </div>

        {/* Job Entry 3 */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h4 className="text-blue-600 font-semibold">
            Amuzic - Music Professional Booking Platform
          </h4>
          <p className="text-sm text-gray-600 mb-3">TypeScript, Next.js, PostgreSQL, Tailwind CSS</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Created a booking platform for music professionals.</li>
            <li>Built session scheduling with reminders and last-minute booking.</li>
            <li>Implemented area-based search for users.</li>
            <li>Built user/professional dashboards with profile and booking history.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
