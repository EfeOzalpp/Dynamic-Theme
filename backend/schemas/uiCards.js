export default {
    name: 'imageAsset',
    title: 'Image Asset',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'image1',
        title: 'Image 1',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'image2',
        title: 'Image 2',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'caption1',
        title: 'Caption 1',
        type: 'string',
      },
      {
        name: 'caption2',
        title: 'Caption 2',
        type: 'string',
      },
      {
        name: 'alt1',
        title: 'Alternative text 1',
        type: 'string',
      },
      {
        name: 'alt2',
        title: 'Alternative text 2',
        type: 'string',
      },
      {
        name: 'url1',
        title: 'URL 1',
        type: 'url',
      },
    ],
  };
  