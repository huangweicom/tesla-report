'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setStatus('请输入邮箱和密码后再尝试登录。');
      return;
    }
    if (!email.includes('@')) {
      setStatus('邮箱格式看起来不正确。');
      return;
    }
    setStatus('✅ 准备就绪！在接入后端后可在此触发真正的认证流程。');
  };

  return (
    <div className="login-shell">
      <div className="card-accent" style={{ marginBottom: '1rem' }}>
        安全登录
      </div>
      <h1 style={{ margin: '0 0 0.5rem' }}>登录 Tesla Insights</h1>
      <p className="helper" style={{ marginBottom: '1.5rem' }}>
        输入凭据访问报告、协作工具与个性化仪表板。
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-row" style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">邮箱</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-row" style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">密码</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button" type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>
          登录
        </button>
      </form>
      <p className="helper" style={{ marginTop: '1rem' }}>
        还没有账号？稍后即可接入自助注册、OAuth 或 SSO 以满足你的需求。
      </p>
      {status && <div className="status">{status}</div>}
      <div className="link-row" style={{ justifyContent: 'space-between' }}>
        <span className="helper">返回主页了解更多亮点</span>
        <Link href="/">返回主页 →</Link>
      </div>
    </div>
  );
}
