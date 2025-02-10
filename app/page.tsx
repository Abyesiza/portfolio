import { Hero } from "@/components/ui/hero";
import { Header } from "@/components/header";



export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <section className="h-screen relative flex flex-col justify-between">
        <Hero />
        <Header />
      </section>
    </main>
  );
}
