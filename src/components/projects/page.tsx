const Projects = () => {
  return (
    <section id="projects" className="px-6 md:px-20 py-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        Featured <span className="text-blue-600">Projects</span>
      </h2>

      <div className="space-y-8">
        {/* Project Card 1 */}
        <div className="bg-white border rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">iTranscoder</h3>
          <p className="text-gray-700 mb-2">
            A highly scalable video transcoding application that takes videos and converts them into multiple formats.
          </p>
          <p className="text-gray-700 mb-2">
            Users can upload videos and track the progress and status of transcoding in real-time. After successful processing,
            users receive download links for the transcoded videos which they can share with others.
          </p>
          <p className="text-gray-700 mb-4">
            The application is designed with scalability in mind, handling high volumes of video processing efficiently through distributed architecture.
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {["React", "Node.js", "FFmpeg", "AWS Lambda", "S3", "Docker", "Redis"].map((tech) => (
              <span
                key={tech}
                className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
            >
              Live Demo ↗
            </a>
            <a
              href="#"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition"
            >
              GitHub ⭢
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
