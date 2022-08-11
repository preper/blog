module.exports = {
  title: 'preper\'s Blog',
  base: '/blog/',
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ['@vuepress/blog', {
      directories: [
        {
          id: 'post',
          dirname: '_posts',
          path: '/',
          itemPermalink: '/post/:year-:month-:day/:slug',
          pagination: {
            perPagePosts: 2,
          }
        }
      ],
      frontmatters: [
        {
          id: 'tag',
          keys: ['tag', 'tags'],
          path: '/tag/',
          layout: 'Tag',
          frontmatter: { title: 'Tag' },
          itemlayout: 'Tag',
          pagination: {
            perPagePosts: 3
          }
        }
      ]
    }]
  ],
  evergreen: true,
  // theme: '@vuepress/theme-blog',
  // themeConfig: {
  //   footer: {
  //     contact: [
  //       {
  //         type: 'github',
  //         link: 'https://github.com/preper'
  //       },
  //       {
  //         type: 'mail',
  //         link: 'mailto:qpreper@hotmail.com'
  //       }
  //     ],
  //     copyright: [
  //       {
  //         text: 'Copyright © 2020-present preper',
  //         link: 'https://github.com/preper'
  //       }
  //     ]
  //   },
  //   comment: {
  //     service: 'vssue',
  //     owner: 'preper',
  //     repo: 'blog',
  //     proxy: url => `https://cors-anywhere.herokuapp.com/${url}`,
  //     clientId: 'f8d910cf9f5bf81ec024',
  //     clientSecret: process.env.CLIENT_SECRET
  //   }
  // }
}
