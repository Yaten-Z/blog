# Yaten's Blog

[[English]](./README.md) | [[简体中文]](./README-ZH-CN.md)

Website: [blog.yaten.top](https://blog.yaten.top)

Yaten's personal blog, built on the [Astro Theme Yi](https://github.com/cirry/astro-yi) theme — a content-focused Astro blog theme, fast and concise.

### 🔥 Features

- [x] Support github pages.
- [x] Supports multi-platform display.
- [x] Supports dark mode.
- [x] Supports Memos.
- [x] supports i18n.
- [x] Supports search functionality.
- [x] SEO-friendly
- [x] Supports sitemap and RSS.
- [x] Supports article drafts.
- [x] Supports Waline/Giscus Comment.
- [x] Image lazy loading and scaling support.
- [x] Supports fixed permalinks for articles.
- [x] Supports meriand
- [x] Supports mathjax
- [x] Supports expressive code
- [x] Support Button
- [x] Support Github Card
- [x] Support Admonitions

......

### Vercel Deplyment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https%3A%2F%2Fgithub.com%2FYaten-Z%2Fblog)

Give it a try! Click the button above, and you can deploy with just one click.

### 👨🏻‍💻 Manual Installation

Recommended for use `nodejs >= 22.12.0`,`pnpm >= 11`。

```bash
git clone https://github.com/Yaten-Z/blog.git
cd blog
npm install -g pnpm # install pnpm
pnpm i  # installs dependencies
npm run dev # preview, starts local dev server at localhost:4321
```

```bash
npm run build # build your production site to ./dist 
```
After the packaging is completed, Upload the `dist` folder to the web server directory.

### GitHub Pages deployment

In /src/consts.ts, modify the contents of the site field:

```js
export const site = {
  // ...
  url: 'https://blog.yaten.top', // required,  website origin
  baseUrl: '', // When using GitHubPages, you must enter the repository name startwith '/'
  // ...
}
```

## Configuration

The only profile for this blog is: `src/consts.ts`, you can make some modifications according to your needs.

```ts
export const site = {
  title: "Yaten's Blog",
  favicon: '/favicon.svg',
  description: 'Welcome to my independent blog website! ',
  author: "Yaten",
  avatar: '/avatar.jpg',
  motto: '我要去另一个世界找你',
  url: 'https://blog.yaten.top',
  baseUrl: '',
  recentBlogSize: 5,
  archivePageSize: 25,
  postPageSize: 10,
  feedPageSize: 20,
  beian: '',
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

> Navigation, donation, friendship links, comments and analytics are all configured in the same file `src/consts.ts`.

### Write a blog 

With the Yi theme, all you need to do is create a new md document in `src/content/blog` and you're ready to start writing your blog.

According to Astro's Markdown document standard, each document should have its own frontmatter information and add `---` as the beginning and the end of the document's header in md to mark the frontmatter, which gives us a lot of convenience:.

1. for example, if we want to add tags and categories to a document or top some documents, we can add some attributes to the document in Frontmatter, such as `tags`, `sticky` and so on.

2. For example, to avoid using Chinese as the blog path and file name, we can set `title` as the title of the md document in Chinese, and the file name in English with `-` as the word connecting symbol.

In Astro-Yi, You need to set two important properties: **title** and **date**, the following is the simplest frontmatter setup for a Md document:

```yaml
---
title: Display pictures
date: 2024-03-05
---
```

If you feel that this is not quite enough, Yi also provides more properties for you to use, this is a complete example:

```yaml
---
title: Display pictures
description: Display pictures
date: 2024-03-05
tags: [astro]
category: astro
sticky: 100  // Document top weight, the larger the number, the greater the weight
slug: poem/ci //  Permanent link to document
mathjax: false // enable formula display
mermaid: false // enable mermaid
draft: false
toc: true
donate: false
comment: false
ogImage: https://xxxxx/xxxxx/xxxxx // cover image
---
```

### Write a feed

With the Yi theme, all you need to do is create a new md document in `src/content/feed` and you're ready to start writing.

feed frontmatter needs to set an important property **date**, the rest of the attributes are optional.

```yaml
---
date: 2024-03-20
---
```

### Modify icons

All the icons in the blog are using the open source icon library [remixicon](https://remixicon.cn/), you can replace your favorite icons by yourself.

### Note

In the `astro.config.js` file in the root directory, it is recommended to modify the `site` property to correctly generate the site map.

```js
export default defineConfig({
  site: 'https://blog.yaten.top',// Modify to your own website address
  // ...
})
```

Add a line to the path of your sitemap file at the end of the robots.txt file in the public directory.


```text
Sitemap: [blog-url]/sitemap-0.xml
// ps：Sitemap: https://blog.yaten.top/sitemap-0.xml
```
