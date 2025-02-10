"use client";
import { Header } from "@/components/header";
import { motion, useScroll, useTransform } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { IconBrandGithub, IconExternalLink, IconStack2 } from "@tabler/icons-react";
import Link from "next/link";

export default function ProjectsPage() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  const projects = [
    {
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for visualizing and analyzing large-scale data sets with real-time updates and customizable charts.",
      tech: ["React", "D3.js", "Node.js", "MongoDB"],
      liveUrl: "https://dashboard.example.com",
      githubUrl: "https://github.com/username/dashboard",
      features: [
        "Real-time data visualization",
        "Interactive filtering system",
        "Responsive design",
        "Dark/Light theme support"
      ]
    },
    {
      title: "ML Pipeline Platform",
      description: "End-to-end machine learning pipeline for data processing, model training, and deployment with automated workflows.",
      tech: ["Python", "TensorFlow", "FastAPI", "Docker"],
      liveUrl: "https://ml-platform.example.com",
      githubUrl: "https://github.com/username/ml-platform",
      features: [
        "Automated model training",
        "API endpoints for predictions",
        "Performance monitoring",
        "Model versioning"
      ]
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with product management, cart functionality, and secure payment processing.",
      tech: ["Next.js", "Prisma", "Stripe", "PostgreSQL"],
      liveUrl: "https://shop.example.com",
      githubUrl: "https://github.com/username/ecommerce",
      features: [
        "Secure payment integration",
        "Product search & filtering",
        "User authentication",
        "Order tracking system"
      ]
    },
    {
      title: "Social Media App",
      description: "Modern social networking platform with real-time messaging, post sharing, and user interactions.",
      tech: ["React Native", "Firebase", "Redux", "WebSocket"],
      liveUrl: "https://social.example.com",
      githubUrl: "https://github.com/username/social-app",
      features: [
        "Real-time messaging",
        "Media sharing",
        "Push notifications",
        "Social authentication"
      ]
    }
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="h-[150vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-between">
          <div className="flex flex-col items-center justify-center flex-grow pt-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center mb-8">
              Featured Projects
            </h2>
            
            <div className="w-full overflow-hidden px-4 sm:px-8 lg:px-16 mb-12">
              <motion.div 
                style={{ x }}
                className="flex gap-8 md:gap-12"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.title}
                    className="flex-shrink-0 first:ml-0"
                  >
                    <CardSpotlight className="w-[300px] sm:w-[400px] md:w-[450px] h-[320px] p-6">
                      <div className="space-y-4 h-full flex flex-col">
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tech.map((tech) => (
                              <span 
                                key={tech}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-800/50 rounded-full text-xs text-neutral-300"
                              >
                                <IconStack2 className="w-3 h-3" />
                                {tech}
                              </span>
                            ))}
                          </div>
                          <p className="text-neutral-300 text-sm">
                            {project.description}
                          </p>
                        </div>

                        <div className="mt-auto space-y-2">
                          <h4 className="text-sm font-medium text-neutral-200">
                            Key Features
                          </h4>
                          <ul className="list-disc list-inside space-y-1">
                            {project.features.map((feature, index) => (
                              <li key={index} className="text-xs text-neutral-300">
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center gap-3 pt-2">
                            <Link 
                              href={project.githubUrl}
                              className="text-neutral-400 hover:text-neutral-200 transition-colors"
                              target="_blank"
                            >
                              <IconBrandGithub className="w-4 h-4" />
                            </Link>
                            <Link 
                              href={project.liveUrl}
                              className="text-neutral-400 hover:text-neutral-200 transition-colors"
                              target="_blank"
                            >
                              <IconExternalLink className="w-4 h-4" />
                            </Link>
                          </div>
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
