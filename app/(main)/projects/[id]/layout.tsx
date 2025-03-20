export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

// This is needed to tell Next.js this is a dynamic route
export const dynamic = 'force-dynamic'; 