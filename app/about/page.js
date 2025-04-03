"use client";

import { useState } from "react";

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to a server
    console.log("Form submitted:", formData);
    alert("Thank you for your message!");
    setFormData({ name: "", email: "", message: "" });
  };

  const teamMembers = [
    {
      name: "Rishabh Raj Pathak",
      // role: "Project Lead & Full Stack Developer",
      contribution:
        "Led project development, implemented frontend & backend integration",
    },
    {
      name: "Sahil",
      // role: "ML Engineer",
      contribution: "Developed and trained the demand forecasting model",
    },
    {
      name: "Shatru Bonerjee",
      // role: "Data Scientist",
      contribution:
        "Data preprocessing, feature engineering, and model evaluation",
    },
    {
      name: "Varun",
      // role: "UI/UX Designer",
      contribution: "Designed user interface",
    },
  ];

  const techStack = [
    { name: "Next.js", description: "React framework for the frontend" },
    { name: "Chart.js", description: "Interactive charts and visualizations" },
    {
      name: "XGBoost",
      description: "Machine learning model for demand forecasting",
    },
    { name: "TailwindCSS", description: "Utility-first CSS framework" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white/90">
          About the Project
        </h1>

        {/* Project Overview */}
        <div className="card p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-gray-300 mb-4">
            This project aims to forecast electricity demand in Delhi using
            advanced machine learning techniques. We utilize historical demand
            data and various features like weather patterns, holidays, and
            seasonal trends to predict future electricity consumption.
          </p>
          <h3 className="text-xl font-semibold mb-2">Methodology</h3>
          <p className="text-gray-300 mb-4">
            Our forecasting model is built using XGBoost, trained on historical
            electricity demand data from Delhi. The model considers multiple
            features including:
          </p>
          <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
            <li>Historical demand patterns</li>
            <li>Weather conditions</li>
            <li>Day of week and seasonal effects</li>
            <li>Holiday and special event impacts</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="card p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="p-4 bg-slate-800 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400">
                  {tech.name}
                </h3>
                <p className="text-gray-300">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="card p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center p-4 bg-slate-800 rounded-lg"
              >
                <div className="w-24 h-24 mx-auto bg-slate-700 rounded-full mb-4" />
                <h3 className="text-lg font-semibold text-blue-400">
                  {member.name}
                </h3>
                <p className="text-gray-300 font-medium mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.contribution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="card p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="max-w-lg">
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 bg-slate-800 rounded-lg border border-slate-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 bg-slate-800 rounded-lg border border-slate-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-2 bg-slate-800 rounded-lg border border-slate-700 text-white h-32"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
