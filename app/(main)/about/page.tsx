import { AboutComponent } from "@/components/about";
import { PageContainer } from "@/components/ui/page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Joel Abyesiza",
  description: "Learn more about Joel Abyesiza, a software engineer and web developer focused on creating elegant, user-friendly applications."
};

export default function About() {
  return (
    <PageContainer contentOverflow={true}>
      <AboutComponent/>
    </PageContainer>
  );
}
