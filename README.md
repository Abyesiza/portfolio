# Portfolio Web Application

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Convex for data management.

## Features

### Public Features
- **Home Page**: Showcase featured projects and skills
- **About Page**: Share your personal story and background
- **Experience Page**: Display your work history and education
- **Projects Page**: Showcase your portfolio projects with details
- **Skills Page**: Display your technical skills organized by categories
- **Contact Form**: Allow visitors to send you messages

### Dashboard Features
- **Projects Management**: Add, edit, and delete projects
- **Experience Management**: Manage your work and education history
- **Skills Management**: Organize and update your technical skills
- **Contact Management**: Review and manage contact form submissions
- **File Management**: Upload and manage files used in your portfolio
- **Private Vault**: Securely store passwords, notes, and images (only visible to you)

## Private Vault

The private vault feature provides a secure space to store sensitive information that is only accessible when logged into your dashboard:

- **Password Manager**: Securely store login credentials
- **Notes**: Keep private text notes organized by categories
- **Image Storage**: Save private images with secure access
- **Organization Features**:
  - Tag system for easy filtering
  - Categories for organization
  - Pin important items for quick access
  - Search functionality
  - Additional encryption option

## Tech Stack

- **Frontend**: Next.js 13 App Router, React, Tailwind CSS, shadcn/ui
- **Backend**: Convex (database, authentication, file storage)
- **Authentication**: Clerk
- **Image Upload**: UploadThing
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form, Zod validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Start the Convex development server:
   ```bash
   npx convex dev
   ```

## Deployment

This application can be deployed on Vercel or any other hosting service that supports Next.js applications.

```bash
npm run build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
