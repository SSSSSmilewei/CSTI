import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home as HomeIcon } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-claude-bg text-claude-text font-serif flex flex-col">
      <header className="border-b border-claude-border sticky top-0 bg-claude-bg/90 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-claude-accent" />
            <span className="font-bold text-lg tracking-wide">CS-Ideologies (CSTI)</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-claude-text hover:text-claude-accent transition-colors">首页</Link>
            <Link to="/archetypes" className="text-claude-text hover:text-claude-accent transition-colors">人格类型</Link>
            <Link to="/test" className="text-claude-text hover:text-claude-accent transition-colors">开始测试</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <div className="prose prose-stone prose-lg max-w-none text-claude-text">
          <h1>隐私政策</h1>
          <p>生效日期：2026年4月</p>
          <p>欢迎使用 CS-Ideologies（以下简称“本网站”或“CSTI”）。我们非常重视您的隐私保护。本隐私政策旨在向您说明，当您访问本网站或参与我们的性格/技术倾向测试时，我们如何处理可能涉及的隐私信息。</p>
          
          <h2>1. 信息收集</h2>
          <p>本网站的测试完全在您的本地浏览器中运行（Client-side）。您的作答记录、测试结果以及点击行为均<strong>不会</strong>被上传、存储到任何中央服务器或云端数据库。</p>
          
          <h2>2. Cookie 与本地存储</h2>
          <p>我们可能使用浏览器的本地存储（Local Storage）来临时保存您的测试进度，以便您在意外刷新页面后能够恢复测试。此数据完全保留在您的设备中，您可以随时在浏览器设置中清除它。本网站不使用用于追踪、广告或跨站分析的第三方 Cookie。</p>
          
          <h2>3. 第三方服务</h2>
          <p>本网站作为一个纯静态网页，可能托管于 GitHub Pages、Vercel 或其他静态托管平台。这些平台可能会基于提供基础网络服务的需要，收集访客的匿名访问日志（例如 IP 地址、浏览器类型等），这些日志受限于对应平台的隐私政策。</p>
          
          <h2>4. 信息共享与披露</h2>
          <p>由于我们不收集任何个人身份信息或测试结果，因此我们没有任何数据可以出售、交易或转移给第三方。</p>
          
          <h2>5. 您的权利</h2>
          <p>由于数据保存在本地，您拥有对自己数据的绝对控制权。如果您不希望保留任何记录，只需关闭浏览器页面或清除浏览器缓存即可。</p>
          
          <h2>6. 隐私政策的更新</h2>
          <p>我们保留随时更新本隐私政策的权利。如果我们对隐私政策进行重大修改，将在本页面发布更新后的版本。您的继续使用即被视为接受修改后的政策。</p>
          
          <h2>7. 联系我们</h2>
          <p>如果您对本隐私政策或本网站有任何疑问或建议，欢迎通过我们的开源仓库（GitHub）提交 Issue 或联系项目维护者。</p>
        </div>
      </main>

      <footer className="border-t border-claude-border bg-claude-bg py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-claude-text-light">
          <Link to="/" className="inline-flex items-center gap-2 hover:text-claude-accent transition-colors">
            <HomeIcon className="w-4 h-4" /> 返回首页
          </Link>
        </div>
      </footer>
    </div>
  );
};
