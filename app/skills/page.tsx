import { Header } from "@/components/header";

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <section className="h-screen relative flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center flex-grow p-8">
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 text-center mb-12">
            Technical Expertise
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl w-full">
            {[
              { name: "React", level: "Advanced" },
              { name: "Next.js", level: "Advanced" },
              { name: "TypeScript", level: "Advanced" },
              { name: "Python", level: "Advanced" },
              { name: "Data Analysis", level: "Expert" },
              { name: "Machine Learning", level: "Intermediate" },
              { name: "SQL", level: "Advanced" },
              { name: "Node.js", level: "Intermediate" },
              { name: "React Native", level: "Advanced" },
            ].map((skill) => (
              <div
                key={skill.name}
                className="group relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 p-4 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {skill.level}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Header />
      </section>
    </main>
  );
}
