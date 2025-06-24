import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="text-gray-800">Get In </span>
          <span className="text-blue-600">Touch</span>
        </h2>
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
          <p className="text-gray-600 text-center mb-8">
            Feel free to reach out for projects, collaborations, or just to say hello!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/mujeeb100"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border-2 border-blue-500"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                {/* GitHub icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github text-blue-600"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-blue-600 font-semibold">GitHub</p>
                <p className="text-gray-800 font-medium">mujeeb100</p>
              </div>
            </a>

            {/* Twitter/X */}
            <a
              href="https://x.com/mujeeb20010?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border-2 border-blue-500"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                {/* Twitter icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter text-blue-600"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-blue-600 font-semibold">X</p>
                <p className="text-gray-800 font-medium">@mujeeb_ansari</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:bagbanikram@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                {/* Mail icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail text-blue-600"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-800 font-medium">muzeeb100@yahoo.co.in</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mujeebansari786/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                {/* LinkedIn icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin text-blue-600"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">LinkedIn</p>
                <p className="text-gray-800 font-medium">Mujeeb-Ansari</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
