import Link from 'next/link';

const heroStats = [
  {
    title: 'Energy edge',
    body: '实时掌握动力电池、充电网络与硬件供应链的最新脉动。',
  },
  {
    title: 'Market signals',
    body: '模型自动提炼财报、产能与价格策略，帮助你提早洞察趋势。',
  },
  {
    title: 'Secure workspace',
    body: '账号登录后解锁私人仪表板、下载报告与协作工具。',
  },
];

export default function HomePage() {
  return (
    <div className="hero">
      <div className="hero-card">
        <div className="card-accent">Next.js + TypeScript</div>
        <h1>Welcome to Tesla Insights</h1>
        <p>
          一个为新能源创新者设计的轻量门户。浏览精选亮点，或登录解锁全量报告、生产数据与交互式可视化。
        </p>
        <div className="features">
          {heroStats.map((item) => (
            <div key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
        <div className="link-row">
          <Link href="/login">立即登录</Link>
          <span aria-hidden>→</span>
          <span className="helper">无需繁琐配置，体验全新 Next.js 网站。</span>
        </div>
      </div>
      <div className="hero-card">
        <h2 style={{ marginTop: 0 }}>设计亮点</h2>
        <p className="helper">
          极简布局、可读性为先的排版，以及可扩展的组件化结构，方便将来接入 API 或数据库。
        </p>
        <ul>
          <li>App Router 架构，已准备好服务器组件与路由拓展。</li>
          <li>全局样式与卡片式 UI，便于调整品牌色彩。</li>
          <li>独立登录页面，包含基础表单校验与状态提示。</li>
        </ul>
      </div>
    </div>
  );
}
