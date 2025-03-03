"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconArrowRight, IconDownload } from '@tabler/icons-react';
import Link from 'next/link';

export function AboutComp() {
  const [activeTab, setActiveTab] = useState('bio');

  // Bio content
  const bioContent = {
    name: "John Abyesiza",
    title: "Software Engineer & Web Developer",
    description: "I'm a passionate software engineer specializing in creating elegant, user-friendly web applications. With expertise in front-end and back-end technologies, I build scalable solutions that deliver exceptional user experiences. I'm committed to clean code, modern design principles, and staying current with emerging technologies.",
    highlights: [
      "5+ years of experience in web development",
      "Expertise in React, Next.js, Node.js and TypeScript",
      "Strong background in UI/UX design principles",
      "Passionate about creating accessible applications"
    ],
    resumeUrl: "/resume.pdf"
  };

  // Skills data
  const skills = [
    { category: "Front-end", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Back-end", items: ["Node.js", "Express", "Convex", "MongoDB", "PostgreSQL"] },
    { category: "Tools & Others", items: ["Git", "Docker", "CI/CD", "AWS", "Figma"] }
  ];

  // Journey/timeline content
  const journeyItems = [
    {
      year: "2023",
      title: "Senior Developer",
      company: "TechInnovate Solutions",
      description: "Leading development of enterprise web applications with focus on scalability and performance optimization."
    },
    {
      year: "2021",
      title: "Full Stack Developer",
      company: "Digital Crafters",
      description: "Developed and maintained multiple client websites using modern JavaScript frameworks and headless CMS solutions."
    },
    {
      year: "2019",
      title: "Junior Developer",
      company: "WebSphere Agency",
      description: "Started professional journey building responsive websites and e-commerce solutions."
    },
    {
      year: "2018",
      title: "Computer Science Degree",
      company: "Tech University",
      description: "Graduated with honors, specializing in web technologies and software engineering."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "John's attention to detail and innovative approach transformed our platform. His technical expertise combined with an eye for design produced exceptional results.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Working with John was seamless. He not only understood our technical requirements but also brought creative solutions that elevated the entire project.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "John's technical skills are matched by his ability to communicate complex concepts clearly. He's a true professional who delivers quality work consistently.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center mb-20 gap-8"
      >
        <div className="w-full md:w-1/2">
          <motion.div 
            className="relative w-80 h-80 mx-auto md:mx-0 rounded-3xl overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image 
              src="/profile-image.jpg" 
              alt="John Abyesiza"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-3xl"
            />
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2">
          <motion.span 
            className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            About Me
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {bioContent.name}
          </motion.h1>
          <motion.h2 
            className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {bioContent.title}
          </motion.h2>
          <motion.p 
            className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {bioContent.description}
          </motion.p>
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a 
              href="/resume.pdf" 
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconDownload size={18} />
              Resume
            </motion.a>
            <motion.a 
              href="https://github.com/yourusername" 
              className="p-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconBrandGithub className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/yourusername" 
              className="p-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconBrandLinkedin className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
            </motion.a>
            <motion.a 
              href="https://twitter.com/yourusername" 
              className="p-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconBrandTwitter className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
            </motion.a>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              View Projects
            </Link>
            {bioContent.resumeUrl && (
              <a
                href={bioContent.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <IconDownload className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Tabs */}
      <div className="mb-10">
        <div className="flex flex-wrap border-b border-neutral-200 dark:border-neutral-800 gap-1 md:gap-2">
          <button
            onClick={() => setActiveTab('bio')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'bio'
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Bio & Highlights
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'skills'
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('journey')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'journey'
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            My Journey
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'testimonials'
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Testimonials
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Bio & Highlights */}
        {activeTab === 'bio' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">My Approach</h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                I believe in creating technology that empowers users and solves real problems. My development 
                philosophy centers on three core principles: user-centric design, performance optimization, 
                and maintainable code.
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
                Each project begins with a deep dive into understanding user needs, followed by thoughtful 
                architecture planning and iterative development. I'm passionate about creating digital experiences 
                that balance aesthetic appeal with functional excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  View Projects
                </Link>
                {bioContent.resumeUrl && (
                  <a
                    href={bioContent.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <IconDownload className="mr-2 h-5 w-5" />
                    Download Resume
                  </a>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">Professional Highlights</h3>
              <ul className="space-y-3">
                {bioContent.highlights.map((highlight, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
        
        {/* Skills */}
        {activeTab === 'skills' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {skills.map((skillGroup, groupIndex) => (
              <motion.div 
                key={groupIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
                className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
              >
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (groupIndex * 0.1) + (index * 0.05) }}
                      className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-sm text-neutral-800 dark:text-neutral-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Journey */}
        {activeTab === 'journey' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-neutral-200 dark:before:bg-neutral-700"
          >
            {journeyItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative mb-12 last:mb-0"
              >
                <div className="absolute -left-8 top-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                </div>
                <div className="mb-1 text-sm font-medium text-blue-600 dark:text-blue-400">{item.year}</div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                <div className="text-neutral-600 dark:text-neutral-400 mb-2">{item.company}</div>
                <p className="text-neutral-700 dark:text-neutral-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Testimonials */}
        {activeTab === 'testimonials' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700"
              >
                <div className="mb-4 text-neutral-600 dark:text-neutral-300">
                  <svg className="h-8 w-8 text-neutral-300 dark:text-neutral-600 mb-2" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="italic leading-relaxed">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.designation}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <div className="mt-8 text-center">
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Let&apos;s create something amazing together
        </p>
      </div>
    </div>
  );
}
