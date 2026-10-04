// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type {AnalyticsConfig} from "./types/analyticsTypes"

/**
 * title {string} website title
 * favicon {string} website favicon url
 * description {string} website description
 * author {string} author
 * avatar {string} Avatar used in the profile
 * motto {string} used in the profile
 * url {string} Website link
 * baseUrl {string} When using GitHubPages, you must enter the repository name, startWith '/', e.g. /repo_name
 * recentBlogSize {number} Number of recent articles displayed in the sidebar
 * archivePageSize {number} Number of articles on archive pages
 * postPageSize {number} Number of articles on blog pages
 * feedPageSize {number} Number of articles on feed pages
 * beian {string} Chinese policy
 * asideTagsMaxSize {number}
 *    0: disable,
 *    > 0: display the limited number of tags in the sidebar
 *    All tags will be displayed in single page "/tags".
 */
export const site = {
  title: 'Yaten\'s Blog', // required
  favicon: '/favicon.svg', // required
  description: 'Welcome to my independent blog website! ',
  author: "Yaten", // required
  avatar: '/avatar.jpg', // required
  url: 'https://blog.yaten.top', // required
  baseUrl: '', // When using GitHubPages, you must enter the repository name startWith '/'. e.g. '/astro-blog'
  motto: '我要去另一个世界找你',
  recentBlogSize: 5,
  archivePageSize: 25,
  postPageSize: 10,
  feedPageSize: 20,
  beian: '',
  asideTagsMaxSize: 0,
}

/**
 * busuanzi {boolean} link: https://busuanzi.ibruce.info/
 * lang {string} Default website language
 * codeFoldingStartLines {number}
 * ga {string|false}
 * memosUrl {string} memos server url
 * memosUsername {string} memos login name
 * memosPageSize {number} 10
 */
export const config = {
  lang: 'zh-cn' as 'en' | 'zh-cn' | 'zh-hant' | 'cs', // en | zh-cn | zh-hant | cs
  codeFoldingStartLines: 16, // Need to re-run the project to take effect

  // memos config
  memosUrl: '', // https://xxxx.xxx.xx
  memosUsername: '', // login name
  memosPageSize: 10, // number
}

/**
 * Navigator
 * name {string}
 * iconClass {string} icon style
 * href {string}  link url
 * target {string} optional "_self|_blank" open in current window / open in new window
 */
export const categories = [
  {
    name: "Blog",
    iconClass: "ri-draft-line",
    href: "/blog/1",
  },
  {
    name: "Feed",
    iconClass: "ri-lightbulb-flash-line",
    href: "/feed/1",
  },
  // {
  //   name: "Memos",
  //   iconClass: "ri-quill-pen-line",
  //   href: "/memos",
  // },
  {
    name: "Archive",
    iconClass: "ri-archive-line",
    href: "/archive/1",
  },
  {
    name: "Message",
    iconClass: "ri-chat-1-line",
    href: "/message",
  },
  {
    name: "Search",
    iconClass: "ri-search-line",
    href: "/search",
  },
  {
    name: "More",
    iconClass: "ri-more-fill",
    href: "javascript:void(0);",
    children: [
      {
        name: 'About',
        iconClass: 'ri-information-line',
        href: '/about',
      },
      {
        name: 'Friends',
        iconClass: 'ri-user-5-line',
        href: '/friends',
        target: '_self',
      },
    ]
  }
]

/**
 * Personal link address
 */
export const infoLinks = [
  {
    icon: 'ri-mail-fill',
    name: 'Email',
    outlink: 'mailto:Yaten-Z@outlook.com',
  },
  {
    icon: 'ri-github-fill',
    name: 'github',
    outlink: 'https://github.com/Yaten-Z',
  }
]

/**
 * donate
 * enable {boolean}
 * tip {string}
 * wechatQRCode: Image addresses should be placed in the public directory.
 */
export const donate = {
  enable: true,
  tip: "Thanks for the coffee !!!☕",
  wechatQRCode: "https://s1.imagehub.cc/images/2025/06/01/f649592e5352cd5760f84d40fb29770d.jpg",
}

/**
 * Friendship Links Page
 * name {string}
 * url {string}
 * avatar {string}
 * description {string}
 */
export const friendshipLinks =
  [
    {
      name: "Astro",
      url: "https://github.com/withastro/astro",
      avatar: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
      description: "The web framework for content-driven websites. ⭐️ Star to support our work!",
    },
    {
      name: "TATEN",
      url: "https://taten.xyz",
      avatar: "https://s1.imagehub.cc/images/2025/10/18/d98ee6f0b53fceae8b21eea8cd4a1845.png",
      description: "一群热爱编程的学生，致力于探索技术的无限可能。",
    },
    {
      name: "Lin Mohan",
      url: "https://home.linmohan.net/",
      avatar: "https://linmohan.net/avatar.png",
      description: "「代码重构世界，逻辑解构真理」",
    },
    {
      name: "Susan",
      url: "https://mryoung2022.github.io/",
      avatar: "https://s1.imagehub.cc/images/2025/11/29/4f89970e09825cb0f04c9989e370dc9d.png",
      description: "",
    },
    {
      name: "HHYYYY",
      url: "https://hhyyyy.cn/",
      avatar: "https://s1.imagehub.cc/images/2025/07/31/1fe122170bc941cc696119b9aaca6ead.jpg",
      description: "用科技之眼探索世界，用光影之笔记录瞬间",
    },
    {
      name: "LGCM",
      url: "http://www.LGCM.xyz",
      avatar: "https://s1.imagehub.cc/images/2025/07/30/75fb3a7a7532703f2e7f0c095dc417f1.jpg",
      description: "半个软件工程师",
    },
    {
      name: "Errorsia",
      url: "http://errorsia.com",
      avatar: "https://s1.imagehub.cc/images/2025/07/30/86668972c5b3fb5e440c6e1bba1f69db.png",
      description: "N/A",
    },
    {
      name: "HungryHenry",
      url: "https://hungryhenry.cn",
      avatar: "https://s1.imagehub.cc/images/2025/07/31/4b1f583c02e682ac790c6bfa7a52ec0b.jpg",
      description: "不是在写bug，就是在debug🐛",
    },
    {
      name: "Ruibin_Ningh",
      url: "https://www.ruibin-ningh.top/",
      avatar: "https://s1.imagehub.cc/images/2025/07/31/b2e402249619e45fd0a227d7f5161d5a.jpg",
      description: "不争于表象，只专于底层",
    },
    {
      name: "GuYang17",
      url: "https://guyang17.github.io/",
      avatar: "https://avatars.githubusercontent.com/u/196782409?v=4",
      description: "编程爱好者 | Minecraft玩家",
    },
    {
      name: "柠檬星",
      url: "https://blog.lemonstar.me",
      avatar: "https://blog.lemonstar.me/img/site-icon-lemon.png",
      description: "天空就是一杯橘子味的柠檬汽水",
    },
  ]

/**
 * Comment Feature
 * enable {boolean}
 * type {string} required waline | giscus
 * walineConfig.serverUrl {string} server link
 * walineConfig.lang {string} link: https://waline.js.org/guide/features/i18n.html
 * walineConfig.pageSize {number} number of comments per page. default 10
 * walineConfig.wordLimit {number} Comment word s limit. When a single number is filled in, it 's the maximum number of comment words. No limit when set to 0
 * walineConfig.count {number} recent comment numbers
 * walineConfig.pageview {boolean} display the number of page views and comments of the article
 * walineConfig.reaction {string | string[]} Add emoji interaction function to the article
 * walineConfig.requiredMeta {string[]}  Set required fields, default anonymous
 * walineConfig.whiteList {string[]} set some pages not to display reaction
 */
export const comment = {
  enable: true,
  type: 'giscus', // waline | giscus,
  walineConfig: {
    serverUrl: "",
    lang: 'en',
    pageSize: 20,
    wordLimit: '',
    count: 5,
    pageview: true,
    reaction: true,
    requiredMeta: ["nick", "mail"],
    whiteList: ['/message/', '/friends/'],
  },

  // giscus config
  giscusConfig: {
    'data-repo': "Yaten-Z/blog-giscus",
    'data-repo-id': "R_kgDOOzg2eg",
    'data-category': "General",
    'data-category-id': "DIC_kwDOOzg2es4Cq1Mp",
    'data-mapping': "pathname",
    'data-strict': "0",
    'data-reactions-enabled': "1",
    'data-emit-metadata': "0",
    'data-input-position': "bottom",
    'data-theme': "noborder_light",
    'data-lang': "zh-CN",
    'crossorigin': "anonymous",
  }

  //
}

/**
 * Analytics Feature Configuration
 *
 * This file centralizes the analytics configuration for the application.
 * It defines and exports the default settings for Umami and Google Analytics.
 */
export const analytics: AnalyticsConfig = {
  enable: false,
  umamiConfig: {
    enable: false,
    id: "",
    url: ""
  },
  gaConfig: {
    enable: false,
    id: ""
  },
  busuanzi: false,
};
