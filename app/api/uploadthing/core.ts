import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(() => {
      return { userId: "123" };
    })
    .onUploadComplete(() => {
      console.log("Upload complete");
    }),
}; 