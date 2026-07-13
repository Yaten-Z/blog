import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "夏夜流萤",
		imgurl:
			"https://weavatar.com/avatar/d252655d40d6874417a720bad0a6c5f77f8f6a1fd2f882f8f338402dc37e4190?s=640",
		desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 10, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "Firefly Docs",
		imgurl: "https://docs-firefly.cuteleaf.cn/logo.png",
		desc: "Firefly 主题模板文档",
		siteurl: "https://docs-firefly.cuteleaf.cn",
		tags: ["Docs"],
		weight: 9,
		enabled: true,
	},
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
		weight: 8,
		enabled: true,
	},
	{
		title: "TATEN",
		imgurl: "https://s1.imagehub.cc/images/2025/10/18/d98ee6f0b53fceae8b21eea8cd4a1845.png",
		desc: "一群热爱编程的学生，致力于探索技术的无限可能。",
		siteurl: "https://taten.xyz",
		tags: ["Personal"],
		weight: 10,
		enabled: true
	},
	{
		title: "Lin Mohan",
		imgurl: "https://linmohan.net/avatar.png",
		desc: "「代码重构世界，逻辑解构真理」",
		siteurl: "https://home.linmohan.net/",
		tags: ["Personal"],
		weight: 9,
		enabled: true
	},
	{
		title: "Susan",
		imgurl: "https://s1.imagehub.cc/images/2025/11/29/4f89970e09825cb0f04c9989e370dc9d.png",
		desc: "",
		siteurl: "https://mryoung2022.github.io/",
		tags: ["Personal"],
		weight: 7,
		enabled: true
	},
	{
		title: "HHYYYY",
		imgurl: "https://s1.imagehub.cc/images/2025/07/31/1fe122170bc941cc696119b9aaca6ead.jpg",
		desc: "用科技之眼探索世界，用光影之笔记录瞬间",
		siteurl: "https://hhyyyy.cn/",
		tags: ["Personal"],
		weight: 6,
		enabled: true
	},
	{
		title: "LGCM",
		imgurl: "https://s1.imagehub.cc/images/2025/07/30/75fb3a7a7532703f2e7f0c095dc417f1.jpg",
		desc: "半个软件工程师",
		siteurl: "http://www.LGCM.xyz",
		tags: ["Personal"],
		weight: 5,
		enabled: true
	},
	{
		title: "Errorsia",
		imgurl: "https://s1.imagehub.cc/images/2025/07/30/86668972c5b3fb5e440c6e1bba1f69db.png",
		desc: "N/A",
		siteurl: "http://errorsia.com",
		tags: ["Personal"],
		weight: 4,
		enabled: true
	},
	{
		title: "HungryHenry",
		imgurl: "https://s1.imagehub.cc/images/2025/07/31/4b1f583c02e682ac790c6bfa7a52ec0b.jpg",
		desc: "不是在写bug，就是在debug🐛",
		siteurl: "https://hungryhenry.cn",
		tags: ["Personal"],
		weight: 3,
		enabled: true
	},
	{
		title: "Ruibin_Ningh",
		imgurl: "https://s1.imagehub.cc/images/2025/07/31/b2e402249619e45fd0a227d7f5161d5a.jpg",
		desc: "不争于表象，只专于底层",
		siteurl: "https://www.ruibin-ningh.top/",
		tags: ["Personal"],
		weight: 2,
		enabled: true
	},
	{
		title: "GuYang17",
		imgurl: "https://avatars.githubusercontent.com/u/196782409?v=4",
		desc: "编程爱好者 | Minecraft玩家",
		siteurl: "https://guyang17.github.io/",
		tags: ["Personal"],
		weight: 0,
		enabled: true
	},
	{
		title: "柠檬星",
		imgurl: "https://blog.lemonstar.me/img/site-icon-lemon.png",
		desc: "天空就是一杯橘子味的柠檬汽水",
		siteurl: "https://blog.lemonstar.me",
		tags: ["Blog"],
		weight: 0,
		enabled: true
	}
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
