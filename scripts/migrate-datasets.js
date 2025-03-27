require('dotenv').config();
const { createClient } = require('@sanity/client');

// Initialize clients for both datasets
const sourceClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'klaxon',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2025-03-27'
});

const targetClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2025-03-27'
});

async function migrateDocuments(documentType) {
  console.log(`Migrating ${documentType}...`);
  const documents = await sourceClient.fetch(`*[_type == "${documentType}"]`);
  
  for (const doc of documents) {
    try {
      await targetClient.createOrReplace(doc);
      console.log(`Migrated ${documentType} ${doc._id}`);
    } catch (error) {
      console.error(`Error migrating ${documentType} ${doc._id}:`, error.message);
    }
  }
}

async function runMigration() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('Missing required environment variables');
    process.exit(1);
  }

  const documentTypes = [
    'post',
    'author', 
    'category',
    'project',
    'video'
  ];

  for (const type of documentTypes) {
    await migrateDocuments(type);
  }

  console.log('Migration complete!');
}

runMigration().catch(console.error);
