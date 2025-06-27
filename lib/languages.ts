export const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "zh-CN",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    flag: "🇨🇳",
  },
  {
    code: "zh-TW",
    name: "Chinese (Traditional)",
    nativeName: "繁體中文",
    flag: "🇹🇼",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇦🇪",
  },
]

export type TranslationKey =
  | "title"
  | "description"
  | "howToUse"
  | "userExperience"
  | "faqs"
  | "defaultText"
  | "enterText"
  | "textColor"
  | "backgroundColor"
  | "fontSize"
  | "blurEffect"
  | "width"
  | "height"
  | "borderRadius"
  | "reset"
  | "download"
  | "share"
  | "shareTitle"
  | "shareDesc"
  | "shareToSocial"
  | "copyImage"
  | "copyLink"
  | "shareTwitter"
  | "shareFacebook"
  | "shareWeChat"
  | "shareQQ"
  | "shareTelegram"
  | "shareWhatsApp"
  | "shareLinkedIn"
  | "shareReddit"
  | "generateSocialCard"
  | "socialCardGenerated"
  | "imageCopied"
  | "linkCopied"
  | "shareText"
  | "batchGenerate"
  | "batchGenerateTitle"
  | "batchGenerateDesc"
  | "multiLineText"
  | "multiLineTextPlaceholder"
  | "uploadFile"
  | "supportedFormats"
  | "generateAll"
  | "downloadAll"
  | "batchProgress"
  | "generatingImages"
  | "packagingDownload"
  | "batchComplete"
  | "charliXcxTitle"
  | "charliXcxIntro"
  | "bratAlbumTitle"
  | "bratAlbumDesc"
  | "bratImpactTitle"
  | "bratImpactDesc"
  | "bratGeneratorPurpose"
  | "howToUseTitle"
  | "step1Title"
  | "step1Desc"
  | "step2Title"
  | "step2Desc"
  | "step3Title"
  | "step3Desc"
  | "step4Title"
  | "step4Desc"
  | "userExperienceTitle"
  | "userStatsTitle"
  | "userStat1"
  | "userStat1Desc"
  | "userStat2"
  | "userStat2Desc"
  | "userStat3"
  | "userStat3Desc"
  | "userStat4"
  | "userStat4Desc"
  | "userFeaturesTitle"
  | "feature1Title"
  | "feature1Desc"
  | "feature2Title"
  | "feature2Desc"
  | "feature3Title"
  | "feature3Desc"
  | "feature4Title"
  | "feature4Desc"
  | "feature5Title"
  | "feature5Desc"
  | "feature6Title"
  | "feature6Desc"
  | "userReviewsTitle"
  | "review1Text"
  | "review1Author"
  | "review1Role"
  | "review2Text"
  | "review2Author"
  | "review2Role"
  | "review3Text"
  | "review3Author"
  | "review3Role"
  | "faqTitle"
  | "faq1Q"
  | "faq1A"
  | "faq2Q"
  | "faq2A"
  | "faq3Q"
  | "faq3A"
  | "faq4Q"
  | "faq4A"
  | "faq5Q"
  | "faq5A"
  | "faq6Q"
  | "faq6A"
  | "privacyPolicy"
  | "termsOfService"

export const translations: { [key: string]: { [key in TranslationKey]: string } } = {
  en: {
    title: "Brat Generator",
    description: "Create stunning Brat-style images inspired by Charli XCX's iconic album cover.",
    howToUse: "How to Use",
    userExperience: "User Experience",
    faqs: "FAQs",
    defaultText: "brat",
    enterText: "Enter Text",
    textColor: "Text Color",
    backgroundColor: "Background Color",
    fontSize: "Font Size",
    blurEffect: "Blur Effect",
    width: "Width",
    height: "Height",
    borderRadius: "Border Radius",
    reset: "Reset",
    download: "Download",
    share: "Share",
    shareTitle: "Share Your Creation",
    shareDesc: "Share your Brat-style image with friends and social media",
    shareToSocial: "Share to Social Media",
    copyImage: "Copy Image",
    copyLink: "Copy Link",
    shareTwitter: "Share on Twitter",
    shareFacebook: "Share on Facebook",
    shareWeChat: "Share on WeChat",
    shareQQ: "Share on QQ",
    shareTelegram: "Share on Telegram",
    shareWhatsApp: "Share on WhatsApp",
    shareLinkedIn: "Share on LinkedIn",
    shareReddit: "Share on Reddit",
    generateSocialCard: "Generate Social Card",
    socialCardGenerated: "Social card generated!",
    imageCopied: "Image copied to clipboard!",
    linkCopied: "Link copied to clipboard!",
    shareText: "Check out my Brat-style image created with Brat Generator! 🎨✨",
    batchGenerate: "Batch Generate",
    batchGenerateTitle: "Batch Generation",
    batchGenerateDesc: "Generate multiple images at once from text lines or uploaded files",
    multiLineText: "Multi-line Text",
    multiLineTextPlaceholder: "Enter each text on a new line...\nbrat\ncharli xcx\npop music\nlime green",
    uploadFile: "Upload File",
    supportedFormats: "Supported: .txt, .csv, .xlsx",
    generateAll: "Generate All",
    downloadAll: "Download All as ZIP",
    batchProgress: "Progress",
    generatingImages: "Generating images...",
    packagingDownload: "Packaging download...",
    batchComplete: "Batch generation complete!",
    charliXcxTitle: "About Charli XCX & Brat",
    charliXcxIntro:
      "Charli XCX is a visionary pop artist known for her experimental sound and futuristic aesthetic. Her influence extends beyond music, shaping trends in fashion and digital culture.",
    bratAlbumTitle: "The 'Brat' Album",
    bratAlbumDesc:
      "'Brat' is Charli XCX's highly anticipated album, celebrated for its bold sound and striking visual identity. The album's lime green aesthetic has become a cultural phenomenon.",
    bratImpactTitle: "The Impact of 'Brat'",
    bratImpactDesc:
      "The 'Brat' album has sparked a wave of creativity online, with fans creating their own versions of the iconic cover. Its unique style has inspired countless memes and social media trends.",
    bratGeneratorPurpose:
      "This generator is a tribute to Charli XCX's 'Brat' album, allowing fans to create their own personalized images in the same iconic style.",
    howToUseTitle: "How to Use the Brat Generator",
    step1Title: "Enter Your Text",
    step1Desc: "Type the text you want to appear on your Brat-style image.",
    step2Title: "Customize Colors",
    step2Desc: "Choose your preferred text and background colors.",
    step3Title: "Adjust Settings",
    step3Desc: "Fine-tune the font size, blur effect, and dimensions.",
    step4Title: "Download & Share",
    step4Desc: "Download your image and share it with the world!",
    userExperienceTitle: "User Experience",
    userStatsTitle: "User Statistics",
    userStat1: "100K+",
    userStat1Desc: "Images Generated",
    userStat2: "50K+",
    userStat2Desc: "Happy Users",
    userStat3: "10",
    userStat3Desc: "Languages Supported",
    userStat4: "5",
    userStat4Desc: "Continents Reached",
    userFeaturesTitle: "Key Features",
    feature1Title: "Instant Preview",
    feature1Desc: "See your image update in real-time as you adjust settings.",
    feature2Title: "High-Quality Downloads",
    feature2Desc: "Download your image in high-resolution PNG format.",
    feature3Title: "Multi-Language Support",
    feature3Desc: "Create images in 10 different languages.",
    feature4Title: "Completely Free",
    feature4Desc: "Use the generator for free, with no hidden costs.",
    feature5Title: "Mobile-Friendly",
    feature5Desc: "Create images on any device, anywhere.",
    feature6Title: "No Registration",
    feature6Desc: "No account needed, start creating right away!",
    userReviewsTitle: "User Reviews",
    review1Text: "This generator is amazing! I love how easy it is to create Brat-style images.",
    review1Author: "Alex M.",
    review1Role: "Graphic Designer",
    review2Text: "I'm obsessed with the Brat album, and this tool is perfect for making my own versions.",
    review2Author: "Sophie L.",
    review2Role: "Social Media Manager",
    review3Text: "The multi-language support is fantastic! I can create images for my international audience.",
    review3Author: "David K.",
    review3Role: "Content Creator",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "What is the Brat Generator?",
    faq1A:
      "The Brat Generator is a free online tool that allows you to create images in the style of Charli XCX's 'Brat' album cover.",
    faq2Q: "How do I use the Brat Generator?",
    faq2A:
      "Simply enter your text, customize the colors and settings, and download your image. See the 'How to Use' section for more detailed instructions.",
    faq3Q: "Is the Brat Generator free?",
    faq3A: "Yes, the Brat Generator is completely free to use.",
    faq4Q: "Do I need to create an account?",
    faq4A: "No, you do not need to create an account to use the Brat Generator.",
    faq5Q: "What languages are supported?",
    faq5A: "The Brat Generator supports 10 languages, including English, Chinese, Japanese, and more.",
    faq6Q: "Can I use the images for commercial purposes?",
    faq6A:
      "The images created with the Brat Generator are for personal use only. Please respect the copyright of Charli XCX and her record label.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
  },
  "zh-CN": {
    title: "Brat 生成器",
    description: "创建受 Charli XCX 标志性专辑封面启发的精美 Brat 风格图像。",
    howToUse: "如何使用",
    userExperience: "用户体验",
    faqs: "常见问题",
    defaultText: "brat",
    enterText: "输入文字",
    textColor: "文字颜色",
    backgroundColor: "背景颜色",
    fontSize: "字体大小",
    blurEffect: "模糊效果",
    width: "宽度",
    height: "高度",
    borderRadius: "边框半径",
    reset: "重置",
    download: "下载",
    share: "分享",
    shareTitle: "分享你的作品",
    shareDesc: "与朋友和社交媒体分享你的 Brat 风格图像",
    shareToSocial: "分享到社交媒体",
    copyImage: "复制图片",
    copyLink: "复制链接",
    shareTwitter: "分享到 Twitter",
    shareFacebook: "分享到 Facebook",
    shareWeChat: "分享到微信",
    shareQQ: "分享到 QQ",
    shareTelegram: "分享到 Telegram",
    shareWhatsApp: "分享到 WhatsApp",
    shareLinkedIn: "分享到 LinkedIn",
    shareReddit: "分享到 Reddit",
    generateSocialCard: "生成社交卡片",
    socialCardGenerated: "社交卡片已生成！",
    imageCopied: "图片已复制到剪贴板！",
    linkCopied: "链接已复制到剪贴板！",
    shareText: "看看我用 Brat 生成器创建的 Brat 风格图像！🎨✨",
    batchGenerate: "批量生成",
    batchGenerateTitle: "批量生成",
    batchGenerateDesc: "从文本行或上传的文件一次生成多张图片",
    multiLineText: "多行文本",
    multiLineTextPlaceholder: "每行输入一个文本...\nbrat\ncharli xcx\n流行音乐\n青柠绿",
    uploadFile: "上传文件",
    supportedFormats: "支持格式：.txt, .csv, .xlsx",
    generateAll: "生成全部",
    downloadAll: "打包下载ZIP",
    batchProgress: "进度",
    generatingImages: "正在生成图片...",
    packagingDownload: "正在打包下载...",
    batchComplete: "批量生成完成！",
    charliXcxTitle: "关于 Charli XCX & Brat",
    charliXcxIntro:
      "Charli XCX 是一位有远见的流行艺术家，以其实验性的声音和未来主义的美学而闻名。她的影响力超越了音乐，塑造了时尚和数字文化的趋势。",
    bratAlbumTitle: "The 'Brat' Album",
    bratAlbumDesc:
      "'Brat' is Charli XCX's highly anticipated album, celebrated for its bold sound and striking visual identity. The album's lime green aesthetic has become a cultural phenomenon.",
    bratImpactTitle: "The Impact of 'Brat'",
    bratImpactDesc:
      "'Brat' album has sparked a wave of creativity online, with fans creating their own versions of the iconic cover. Its unique style has inspired countless memes and social media trends.",
    bratGeneratorPurpose:
      "This generator is a tribute to Charli XCX's 'Brat' album, allowing fans to create their own personalized images in the same iconic style.",
    howToUseTitle: "如何使用 Brat 生成器",
    step1Title: "输入你的文字",
    step1Desc: "输入你想要出现在 Brat 风格图像上的文字。",
    step2Title: "自定义颜色",
    step2Desc: "选择你喜欢的文字和背景颜色。",
    step3Title: "调整设置",
    step3Desc: "微调字体大小、模糊效果和尺寸。",
    step4Title: "下载并分享",
    step4Desc: "下载你的图像并与世界分享！",
    userExperienceTitle: "用户体验",
    userStatsTitle: "用户统计",
    userStat1: "10万+",
    userStat1Desc: "生成的图像",
    userStat2: "5万+",
    userStat2Desc: "快乐的用户",
    userStat3: "10",
    userStat3Desc: "支持的语言",
    userStat4: "5",
    userStat4Desc: "到达的大洲",
    userFeaturesTitle: "主要特点",
    feature1Title: "即时预览",
    feature1Desc: "在你调整设置时，实时查看你的图像更新。",
    feature2Title: "高质量下载",
    feature2Desc: "以高分辨率 PNG 格式下载你的图像。",
    feature3Title: "多语言支持",
    feature3Desc: "用 10 种不同的语言创建图像。",
    feature4Title: "完全免费",
    feature4Desc: "免费使用生成器，没有隐藏费用。",
    feature5Title: "移动友好",
    feature5Desc: "在任何设备上随时随地创建图像。",
    feature6Title: "无需注册",
    feature6Desc: "无需帐户，立即开始创作！",
    userReviewsTitle: "用户评论",
    review1Text: "这个生成器太棒了！我喜欢创建 Brat 风格图像的容易程度。",
    review1Author: "Alex M.",
    review1Role: "平面设计师",
    review2Text: "我沉迷于 Brat 专辑，这个工具非常适合制作我自己的版本。",
    review2Author: "Sophie L.",
    review2Role: "社交媒体经理",
    review3Text: "多语言支持太棒了！我可以为我的国际观众创建图像。",
    review3Author: "David K.",
    review3Role: "内容创作者",
    faqTitle: "常见问题",
    faq1Q: "什么是 Brat 生成器？",
    faq1A: "Brat 生成器是一个免费的在线工具，允许你创建 Charli XCX 的 'Brat' 专辑封面风格的图像。",
    faq2Q: "如何使用 Brat 生成器？",
    faq2A: "只需输入你的文字，自定义颜色和设置，然后下载你的图像。有关更详细的说明，请参阅 '如何使用' 部分。",
    faq3Q: "Brat 生成器是免费的吗？",
    faq3A: "是的，Brat 生成器是完全免费使用的。",
    faq4Q: "我需要创建一个帐户吗？",
    faq4A: "不，你不需要创建一个帐户来使用 Brat 生成器。",
    faq5Q: "支持哪些语言？",
    faq5A: "Brat 生成器支持 10 种语言，包括英语、中文、日语等。",
    faq6Q: "我可以将这些图像用于商业目的吗？",
    faq6A: "使用 Brat 生成器创建的图像仅供个人使用。请尊重 Charli XCX 及其唱片公司的版权。",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
  },
}
