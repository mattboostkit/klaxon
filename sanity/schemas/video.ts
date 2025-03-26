import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'video',
  title: 'Videos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      description: 'Image to show before the video plays',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
