import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Modified auth check function to be more permissive in development
const isAuthenticated = async (req: Request) => {
  try {
    // For development, we'll allow uploads without strict auth checks
    // In production, you should implement proper authentication here
    console.log("UploadThing middleware running - allowing upload");
    return true; // Allow all uploads for now
  } catch (error) {
    console.error("Auth verification error:", error);
    return false;
  }
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  projectImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const isAuthed = await isAuthenticated(req);
      if (!isAuthed) throw new Error("Unauthorized");
      return { isAuthed };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Project image upload complete");
      return { uploadedBy: "admin" };
    }),
    
  experienceLogo: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const isAuthed = await isAuthenticated(req);
      if (!isAuthed) throw new Error("Unauthorized");
      return { isAuthed };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Experience logo upload complete");
      return { uploadedBy: "admin" };
    }),
    
  skillIcon: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const isAuthed = await isAuthenticated(req);
      if (!isAuthed) throw new Error("Unauthorized");
      return { isAuthed };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Skill icon upload complete");
      return { uploadedBy: "admin" };
    }),
    
  vaultImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const isAuthed = await isAuthenticated(req);
      if (!isAuthed) throw new Error("Unauthorized");
      return { isAuthed };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Vault image upload complete");
      return { uploadedBy: "admin" };
    }),

  aboutImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const isAuthed = await isAuthenticated(req);
      if (!isAuthed) throw new Error("Unauthorized");
      return { isAuthed };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for about image:", file);
      return { uploadedBy: "About Page" };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
export type OurEndpoints = keyof typeof ourFileRouter; 