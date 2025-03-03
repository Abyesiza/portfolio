import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  children: ReactNode;
  className?: string;
}

export function ContentCard({ children, className }: ContentCardProps) {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-200 dark:bg-neutral-900/30 dark:border-neutral-800 p-6 overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
} 