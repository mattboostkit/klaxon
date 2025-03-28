export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-27'

// Provide default values for development/build environments
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id'

// For local development only - for actual deployment, set proper environment variables in Vercel
if (process.env.NODE_ENV === 'development') {
  console.warn(
    'Using default Sanity configuration values. Set proper environment variables for production.'
  )
}
