import React from "react";

const ContactSection = () => {
  return (
    <section className="bg-[#F9F5F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row shadow-lg rounded-xl overflow-hidden bg-white">
        {/* Contact Info */}
        <div className="bg-[#4B2E2E] text-white lg:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-white/80 mb-6">
            We'd love to hear from you! Whether you have a question or just want
            to say hello.
          </p>
          <ul className="space-y-4">
            <li>
              <span className="font-semibold">📍 Address:</span> Beethovenstr. 9, 86150 Augsburg, Germany
            </li>
            <li>
              <span className="font-semibold">📧 Email:</span>{" "}
              sweetcoco@gmail.com
            </li>
            <li>
              <span className="font-semibold">📞 Phone:</span> +49 7416834434
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="lg:w-1/2 p-8 bg-white">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message..."
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
