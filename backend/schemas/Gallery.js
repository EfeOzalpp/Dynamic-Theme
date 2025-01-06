export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
              description: 'Provide a short description of the image.',
              validation: (Rule) =>
                Rule.required()
                  .max(150)
                  .error('Alt text is required'),
            },
          ],
        },
      ],
    },
  ],
};
