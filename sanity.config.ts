import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Klaxon Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lcql4dst',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'klaxon',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
