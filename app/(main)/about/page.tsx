import { AboutComponent } from "@/components/about";
import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Joel Abyesiza",
  description: "Learn more about Joel Abyesiza, a software engineer and web developer focused on creating elegant, user-friendly applications."
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
       <Header/>
       <AboutComponent/>
    </div>
  );
}
