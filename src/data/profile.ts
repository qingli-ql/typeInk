export const profile = {
  name: "Jinglong Li",
  email: "lijinglong.life@gmail.com",
  githubHandle: "@qingli-ql",
  githubUrl: "https://github.com/qingli-ql",
  wechatName: "晴立",
  wechatQrImage: "/images/wechat-qr.jpg",
} as const;

export const contactLinks = [
  {
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "GitHub",
    handle: profile.githubHandle,
    href: profile.githubUrl,
  },
] as const;
