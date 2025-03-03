"use client";
import { PageContainer } from "@/components/ui/page-container";
import { ContentCard } from "@/components/ui/content-card";
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconSend, IconBrandTwitter, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContact = useMutation(api.contacts.create);

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
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      
      // Reset form and show success message
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Failed to submit your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer contentOverflow={true}>
      <div className="w-full max-w-5xl mx-auto px-4 pt-8 pb-16">
        <h2 className="page-title">
          Get in Touch
        </h2>
        
        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Contact Form */}
          <ContentCard>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <IconCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                <p className="text-center mt-4 font-light text-sm text-neutral-500 dark:text-neutral-400">
                  I&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-neutral-800 dark:text-neutral-200"
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-neutral-800 dark:text-neutral-200"
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 text-base bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-neutral-400"
                    placeholder="What&apos;s on your mind?"
                    required
                  />
                </div>
                
                {error && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <IconSend className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </ContentCard>

          {/* Contact Info */}
          <div className="space-y-5">
            <ContentCard>
              <h3 className="section-title">
                Let's Connect
              </h3>
              <p className="body-text mb-4">
                Feel free to reach out for collaborations, opportunities, or just to say hello.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 transition-colors"
                  >
                    {link.icon}
                    <span className="text-sm">{link.name}</span>
                  </a>
                ))}
              </div>
            </ContentCard>

            <ContentCard>
              <h3 className="section-title">
                Office Hours
              </h3>
              <div className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                <p>Monday - Friday</p>
                <p>9:00 AM - 5:00 PM (UTC)</p>
                <p className="pt-1.5">I typically respond within 24 hours during business hours.</p>
              </div>
            </ContentCard>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
