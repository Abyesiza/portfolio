"use client";
import { Header } from "@/components/header";
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconSend, IconBrandTwitter } from "@tabler/icons-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const socialLinks = [
    {
      name: "GitHub",
      icon: <IconBrandGithub className="w-5 h-5" />,
      href: "https://github.com/abyesiza",
    },
    {
      name: "LinkedIn",
      icon: <IconBrandLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/abyesiza",
    },
    {
      name: "Twitter",
      icon: <IconBrandTwitter className="w-5 h-5" />,
      href: "https://twitter.com/abyesiza",
    },
    {
      name: "Email",
      icon: <IconMail className="w-5 h-5" />,
      href: "mailto:abyesizajoel@gmail.com",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="h-[150vh]">
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Main Content Section */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col items-center justify-center px-4 pt-8">
              {/* Title */}
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center mb-8">
                Get in Touch
              </h2>
              
              {/* Contact Grid */}
              <div className="w-full max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  {/* Contact Form */}
                  <div className="backdrop-blur-sm bg-neutral-900/30 rounded-2xl border border-neutral-800/50 p-5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-200 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-all"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-200 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-all"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-200 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-all min-h-[100px] resize-y"
                          placeholder="Your message..."
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl transition-colors"
                      >
                        <IconSend className="w-4 h-4" />
                        Send Message
                      </button>
                    </form>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <div className="backdrop-blur-sm bg-neutral-900/30 rounded-2xl border border-neutral-800/50 p-5">
                      <h3 className="text-lg font-semibold text-neutral-200 mb-3">
                        Let's Connect
                      </h3>
                      <p className="text-neutral-400 text-sm mb-4">
                        Feel free to reach out for collaborations, opportunities, or just to say hello.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {socialLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2.5 bg-neutral-800/50 rounded-xl text-neutral-300 hover:text-neutral-200 hover:bg-neutral-700/50 transition-colors"
                          >
                            {link.icon}
                            <span className="text-sm">{link.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="backdrop-blur-sm bg-neutral-900/30 rounded-2xl border border-neutral-800/50 p-5">
                      <h3 className="text-lg font-semibold text-neutral-200 mb-3">
                        Office Hours
                      </h3>
                      <div className="space-y-1.5 text-sm text-neutral-400">
                        <p>Monday - Friday</p>
                        <p>9:00 AM - 5:00 PM (UTC)</p>
                        <p className="pt-1.5">I typically respond within 24 hours during business hours.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Header Section */}
          <div className="mt-auto">
            <Header />
          </div>
        </div>
      </div>
    </main>
  );
}
