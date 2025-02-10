import { AboutComp } from "@/components/aboutC";
import { Header } from "@/components/header";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
       <AboutComp/>
       <Header/>
    </div>
  );
}
