# Yaten's Blog

[[English]](./README.md) | [[简体中文]](./README-ZH-CN.md)

博客地址：[blog.yaten.top](https://blog.yaten.top)

Yaten 的个人博客，基于 [Astro Theme Yi](https://github.com/cirry/astro-yi) 主题构建，快速和简洁。

### 🔥 特色功能
- [x] 支持GithubPages
- [x] 支持多端显示
- [x] 支持暗黑显示
- [x] 集成Memos
- [x] 支持国际化
- [x] 支持搜索功能
- [x] 友好的SEO
- [x] 支持站点地图和rss
- [x] 支持草稿箱
- [x] 支持waline评论系统
- [x] 支持图片懒加载和预览
- [x] 支持文章永久固定链接
- [x] 支持meriand
- [x] 支持mathjax
- [x] 支持expressive-code
- [x] 支持按钮样式
- [x] 支持显示Github仓库详情
- [x] 支持旁白

......等等

### Vercel一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https%3A%2F%2Fgithub.com%2FYaten-Z%2Fblog)

试试吧，点击上面的按钮，就可以一键部署了。

### 👨🏻‍💻 手动部署

推荐使用：`nodejs >= 22.12.0`，`pnpm >= 11`。

```bash
git clone https://github.com/Yaten-Z/blog.git
cd blog
npm install -g pnpm
pnpm i 
npm run dev # preview
```

将您最喜欢的文章写在 `src/content/blog` 文件夹中，在 `src/content/feed` 文件夹中编写您想发布的动态内容。

```bash
npm run build # build
```

打包完成后，在根目录中会生成一个 dist 文件夹。将 'dist' 文件夹上传到 Web 服务器目录中，即可完成部署。

### github pages部署

只需在`/src/consts.ts`中修改`site`对象中的`url`和`baseUrl`属性：

```js
export const site = {
  // ...
  url: 'https://blog.yaten.top', // 必填 你的网站主域名
  baseUrl: '', // 必填，仓库名称
  // ...
}
```

## 配置

本博客的唯一的配置文件就是：`src/consts.ts`，您可以根据自己的需求进行一些修改。

```ts
export const site = {
  title: "Yaten's Blog",
  favicon: '/favicon.svg',
  description: 'Welcome to my independent blog website! ',
  author: "Yaten",
  avatar: '/avatar.jpg',
  motto: '我要去另一个世界找你',
  url: 'https://blog.yaten.top',
  baseUrl: '', // 用斜杠开头 '/astro-blog'
  recentBlogSize: 5,
  archivePageSize: 25,
  postPageSize: 10,
  feedPageSize: 20,
  beian: ''
}

export const config = {
  lang: 'zh-cn', // English: en | 简体中文: zh-cn | 繁體中文: zh-hant | cs
  codeFoldingStartLines: 16, // Need to re-run the project to take effect

  // memos config
  memosUrl: '', // https://xxxx.xxx.xx
  memosUsername: '', // login name
  memosPageSize: 10, // number
}

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
  },
]
```

> 导航栏、赞赏功能、友情链接、评论系统以及统计配置都在同一个文件 `src/consts.ts` 中。
