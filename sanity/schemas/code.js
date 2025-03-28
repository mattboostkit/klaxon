import { defineType } from 'sanity';

export default defineType({
  name: 'code',
  title: 'Code',
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'PHP', value: 'php' },
          { title: 'Python', value: 'python' },
          { title: 'Bash', value: 'bash' },
          { title: 'Markdown', value: 'markdown' },
        ],
      },
    },
    {
      name: 'filename',
      title: 'Filename',
      type: 'string',
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
    },
  ],
});
