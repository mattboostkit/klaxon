import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'logo',
  title: 'Logos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'The website URL for this client/company',
    }),
    defineField({
      name: 'isMainLogo',
      title: 'Is Main Logo',
      type: 'boolean',
      description: 'Check this if this is the main company logo',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this logo (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      isMainLogo: 'isMainLogo',
    },
    prepare(selection) {
      const { title, media, isMainLogo } = selection;
      return {
        title,
        media,
        subtitle: isMainLogo ? 'Main Logo' : 'Client Logo',
      };
    },
  },
});
