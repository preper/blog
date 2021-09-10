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
  },
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      platform: 'github',
      owner: 'preper',
      repo: 'blog',
      clientId: 'f8d910cf9f5bf81ec024',
      clientSecret: process.env.CLIENT_SECRET
    }
  }
}
