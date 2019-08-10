const _ = require('lodash')

const row2ColSizeSm = (head, data) => ({
  type: 'box',
  layout: 'horizontal',
  contents: [
    {
      color: '#555555',
      flex: 0,
      size: 'sm',
      text: head,
      type: 'text',
    },
    {
      align: 'end',
      color: '#111111',
      size: 'sm',
      text: data,
      type: 'text',
      wrap: true,
    }
  ]
})

module.exports = ({ ctx, event }) => ({
  type: 'flex',
  altText: 'this is a flex message',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      contents: [
        {
          color: '#1DB446',
          size: 'lg',
          text: 'INFO',
          type: 'text',
          weight: 'bold',
        },
        {
          type: 'separator',
          color: '#cccccc'
        },
        row2ColSizeSm('host', _.get(ctx, 'header.host', '')),
        row2ColSizeSm('user-agent', _.get(ctx, 'header.user-agent', '')),
        row2ColSizeSm('x-forwarded-for', _.get(ctx, 'header.x-forwarded-for', '')),
      ]
    }
  }
})
