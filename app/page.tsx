import { Hero } from "@/components/ui/hero";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      <section className="min-h-[100svh] relative flex flex-col">
        <div className="flex-grow flex items-center justify-center py-16 md:py-24">
          <Hero />
        </div>
        <Header />
      </section>
    </main>
  );
}
