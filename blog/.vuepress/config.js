module.exports = {
  title: 'preper\'s Blog',
  theme: '@vuepress/theme-blog',
  base: '/blog/',
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  markdown: {
    lineNumbers: true
  },
  evergreen: true,
  themeConfig: {
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/preper'
        },
        {
          type: 'mail',
          link: 'mailto:qpreper@hotmail.com'
        }
      ],
      copyright: [
        {
          text: 'Copyright © 2020-present preper',
          link: 'https://github.com/preper'
        }
      ]
    }
  }
}
