
export default {
    name: 'svgIcon',
    title: 'SVG Icon',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'icon',
        title: 'Icon',
        type: 'text',
        description: 'Paste SVG code here',
        options: {
          language: 'xml'
        }
      }
    ]
  }
  