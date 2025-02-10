"use client";
import { Header } from "@/components/header";
import { motion, useScroll, useTransform } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { IconBriefcase, IconCalendar, IconMapPin } from "@tabler/icons-react";

export default function ExperiencePage() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Ltd",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Led development of scalable web applications using React and Node.js. Mentored junior developers and implemented best practices.",
      achievements: [
        "Reduced application load time by 40%",
        "Implemented CI/CD pipeline",
        "Led team of 5 developers"
      ]
    },
    {
      title: "Data Scientist",
      company: "Data Analytics Co",
      location: "New York, NY",
      period: "2020 - 2022",
      description: "Developed machine learning models for predictive analytics. Worked with large-scale data processing and visualization.",
      achievements: [
        "Built ML models with 95% accuracy",
        "Automated data processing workflows",
        "Published 2 research papers"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "StartUp Inc",
      location: "Boston, MA",
      period: "2018 - 2020",
      description: "Full-stack development using React, Node.js, and MongoDB. Implemented key features and maintained codebase.",
      achievements: [
        "Launched 3 major product features",
        "Improved test coverage to 90%",
        "Mentored 2 junior developers"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "Tech Giants",
      location: "Seattle, WA",
      period: "2017 - 2018",
      description: "Worked on front-end development using React and TypeScript. Participated in agile development process.",
      achievements: [
        "Developed 5 reusable components",
        "Fixed 30+ critical bugs",
        "Contributed to design system"
      ]
    }
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="h-[150vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-between">
          <div className="flex flex-col items-center justify-center flex-grow pt-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center mb-8">
              Work Experience
            </h2>
            
            <div className="w-full overflow-hidden px-4 sm:px-8 lg:px-16 mb-12">
              <motion.div 
                style={{ x }}
                className="flex gap-8 md:gap-12"
              >
                {experiences.map((experience) => (
                  <motion.div
                    key={experience.title}
                    className="flex-shrink-0 first:ml-0"
                  >
                    <CardSpotlight className="w-[300px] sm:w-[400px] md:w-[450px] h-[320px] p-6">
                      <div className="space-y-4 h-full flex flex-col">
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                            {experience.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-neutral-300 mb-2">
                            <span className="flex items-center gap-2">
                              <IconBriefcase className="w-4 h-4" />
                              {experience.company}
                            </span>
                            <span className="flex items-center gap-2">
                              <IconMapPin className="w-4 h-4" />
                              {experience.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-400 mb-3">
                            <IconCalendar className="w-4 h-4" />
                            {experience.period}
                          </div>
                          <p className="text-neutral-300 text-sm">
                            {experience.description}
                          </p>
                        </div>

                        <div className="mt-auto space-y-2">
                          <h4 className="text-sm font-medium text-neutral-200">
                            Key Achievements
                          </h4>
                          <ul className="list-disc list-inside space-y-1">
                            {experience.achievements.map((achievement, index) => (
                              <li key={index} className="text-xs text-neutral-300">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardSpotlight>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="w-full flex justify-center pb-8">
            <Header />
          </div>
        </div>
      </div>
    </main>
  );
}
