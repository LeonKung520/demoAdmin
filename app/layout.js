import "./globals.css";

export const metadata = {
  title: "星桥后台管理",
  description: "后台管理登录与数据展示页面"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
