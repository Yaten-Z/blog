// 基础配置
export const BASE_CONFIG = {
  title: "Yaten's Blog",
  subtitle: "Yaten's Blog",
  description: '记录代码、文字与生活。',
  author: 'Yaten',
  favicon: '/favicon.svg',
  avatar: '/avatar.jpg',
  site_url: 'https://blog.yaten.top',
  create_time: '2023-03-24',
}

// 配色方案
export type PaletteName = 'paper' | 'mono' | 'normal'

export const THEME_CONFIG = {
  palette: 'paper',
} as const satisfies { palette: PaletteName }

// 文章页配置
export const POST_CONFIG = {
  toc: true,
}

// 导航栏配置
export const HEADER_CONFIG = {
  nav: [
    { label: '归档', href: '/archive' },
    { label: '分类', href: '/category' },
    { label: '动态', href: '/feed' },
    { label: '友链', href: '/link' },
    { label: '关于', href: '/about' },
  ],
}

// 页脚配置
export const FOOTER_CONFIG = {
  link: [
    { name: 'GitHub', url: 'https://github.com/Yaten-Z' },
    { name: 'RSS', url: '/rss.xml' },
  ]
}

// 评论配置
export const COMMENT_CONFIG = {
  enable: false,
  provider: 'waline',
  waline: {
    serverURL: 'https://example.cn/',
  },
}
