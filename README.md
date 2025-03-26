# Klaxon Studio Website

This is a modern website for Klaxon Studio built with Next.js, Tailwind CSS, Framer Motion, and Sanity.io for content management.

## Features

- **Next.js 14** with App Router for optimized performance
- **Sanity.io** integration for blog content management
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **Responsive design** for all device sizes
- **SEO optimized** pages and content

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Sanity Studio Setup

1. Create a Sanity.io account and project
2. Update the `sanity.config.ts` file with your project ID
3. Run Sanity Studio:

```bash
npm run sanity
# or
yarn sanity
```

4. Access Sanity Studio at [http://localhost:3333](http://localhost:3333)

## Video Requirements

For the hero video section:

- **Format**: MP4 or WebM
- **Resolution**: Maximum 1920x1080
- **Size**: Maximum 10MB
- **Aspect Ratio**: 16:9 recommended
- **Duration**: 10-30 seconds
- **Compression**: H.264 codec for MP4, VP9 for WebM
- **Place in**: `/public` directory

## Deployment

The site is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (for authenticated API calls)
   - `REVALIDATE_TOKEN` (for on-demand revalidation)

## Project Structure

- `/app`: Next.js app router pages and layouts
- `/components`: React components
- `/lib`: Utility functions
- `/public`: Static assets
- `/sanity`: Sanity.io configuration and schemas

## License

This project is licensed under the MIT License.