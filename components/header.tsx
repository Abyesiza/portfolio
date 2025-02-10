"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconUser,
  IconBrandGithub,
  IconMail,
  IconCode,
  IconBriefcase,
  IconHome,
  IconTools,
} from "@tabler/icons-react";

export function Header() {
  const links = [
    {
      title: "About Me",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/about",
    },
    {
      title: "Projects",
      icon: (
        <IconCode className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/projects",
    },
    {
      title: "Skills",
      icon: (
        <IconTools className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/skills",
    },
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Experience",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/experience",
    },
    {
      title: "Contact",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/contact",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/abyesiza",
    },

  ];
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 md:relative md:right-0 md:top-0 md:translate-y-0">
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 md:justify-center p-4 md:py-4">
        <FloatingDock
          desktopClassName="flex-col md:flex-row"
          mobileClassName="flex-col space-y-1.5"
          items={links}
        />
      </div>
    </div>
  );
}
