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
    { label: '赞助', href: '/sponsor' },
    { label: '友链', href: '/link' },
    { label: '关于', href: '/about' },
  ],
}

// 页脚配置
export const FOOTER_CONFIG = {
  link: [
    { name: 'GitHub', url: 'https://github.com/Yaten-Z' },
    { name: '赞助', url: '/sponsor' },
    { name: 'RSS', url: '/rss.xml' },
  ]
}

// 赞助配置
export const SPONSOR_CONFIG = {
  enable: true,
  title: '赞助',
  description: '如果本站内容对你有帮助，欢迎扫码请我喝一杯咖啡。',
  wechatQRCode: '/wechat-qr.jpg',
}

// 评论配置
export type CommentProvider = 'waline' | 'giscus'

export const COMMENT_CONFIG = {
  enable: true,
  provider: 'giscus' as CommentProvider,
  waline: {
    serverURL: 'https://example.cn/',
  },
  giscus: {
    repo: 'Yaten-Z/blog-giscus',
    repoId: 'R_kgDOOzg2eg',
    category: 'General',
    categoryId: 'DIC_kwDOOzg2es4Cq1Mp',
    mapping: 'specific',
    strict: '0',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'bottom',
    lang: 'zh-CN',
  },
}
