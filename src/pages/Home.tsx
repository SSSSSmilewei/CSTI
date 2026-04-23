import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Code2, Cpu, GitBranch } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-claude-bg text-claude-text font-serif selection:bg-claude-accent selection:text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-claude-border sticky top-0 bg-claude-bg/90 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-claude-accent" />
            <span className="font-bold text-lg tracking-wide">CS-Ideologies (CSTI)</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-claude-text hover:text-claude-accent transition-colors">首页</Link>
            <Link to="/archetypes" className="text-claude-text hover:text-claude-accent transition-colors">人格类型</Link>
            <Link to="/test?mode=short" className="text-claude-text hover:text-claude-accent transition-colors">简短做题</Link>
            <Link to="/test" className="text-claude-text hover:text-claude-accent transition-colors">完整测试</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-claude-text">
            测测你到底是<br/>哪一种<span className="text-claude-accent italic">赛博人格</span>
          </h1>
          <p className="text-lg md:text-xl text-claude-text-light mb-12 leading-relaxed">
            CS-Ideologies (CSTI) 现已支持在线测试。这不仅是一场技术信仰的拷问，更是一次对代码灵魂的深度剖析。
            <br className="hidden md:block"/>
            完整版 80 道题，精简版 20 道题，测出你的阵营，看清你在赛博世界里的真实面貌。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/test?mode=short" 
              className="px-8 py-3 bg-claude-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md w-full sm:w-auto"
            >
              简短做题 (20题)
            </Link>
            <Link 
              to="/test" 
              className="px-8 py-3 bg-claude-text text-claude-bg rounded-lg font-medium hover:bg-claude-text/90 transition-all transform hover:-translate-y-0.5 shadow-md w-full sm:w-auto"
            >
              完整测试 (80题)
            </Link>
            <a 
              href="#about" 
              className="px-8 py-3 bg-claude-surface text-claude-text rounded-lg font-medium border border-claude-border hover:border-claude-accent hover:text-claude-accent transition-colors w-full sm:w-auto"
            >
              了解测试说明
            </a>
          </div>
        </div>

        {/* Feature grid */}
        <div className="bg-claude-surface border-y border-claude-border py-20" id="about">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">关于测试模型</h2>
              <p className="text-claude-text-light max-w-2xl mx-auto">
                本测试全称为 Computer Science Technology Ideologies (CSTI)，其理论模型参考了 MBTI、SBTI 以及著名的 8Values 政治坐标测试。<br/><br/>
                整套测试不只给出一个结果名，还会把状态落到四个正交的维度上，准确描绘出你的技术偏好和哲学立场。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Code2 className="w-6 h-6 text-claude-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">编程范式 (Paradigm)</h3>
                  <p className="text-claude-text-light text-sm leading-relaxed">
                    看你对代码的理解。是追求纯粹的逻辑与函数式编程，还是偏向于指令控制、内存管理与底层硬件的掌控？
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Cpu className="w-6 h-6 text-claude-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">系统架构 (System)</h3>
                  <p className="text-claude-text-light text-sm leading-relaxed">
                    看你倾向的系统哲学。是喜欢Unix哲学、极简主义与纯文本，还是拥抱重型IDE、大包大揽的框架与集成工具链？
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <GitBranch className="w-6 h-6 text-claude-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">开源与版权 (Copyright)</h3>
                  <p className="text-claude-text-light text-sm leading-relaxed">
                    看你如何看待代码的所有权。是原教旨的开源信徒、认为信息渴望自由，还是务实的商业主义者、支持私有财产保护？
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Terminal className="w-6 h-6 text-claude-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">技术演进 (Evolution)</h3>
                  <p className="text-claude-text-light text-sm leading-relaxed">
                    看你对待新技术的态度。是保守求稳、信奉“能跑就别动”，还是激进求变、渴望用最新框架重写一切的加速主义者？
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract/Joke section inspired by sbti.dev */}
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold mb-6">灵魂拷问</h2>
          <p className="text-claude-text-light mb-8 leading-relaxed">
            你到底是优雅的架构师，还是四处补锅的裁缝？<br/>
            你是真正的赛博游侠，还是只是被框架驯化的API调用师？<br/>
            准备好面对最真实的自己了吗？
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/test?mode=short" 
              className="px-8 py-3 bg-claude-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-sm"
            >
              立刻审判 (简短)
            </Link>
            <Link 
              to="/test" 
              className="px-8 py-3 bg-claude-surface text-claude-text border border-claude-border rounded-lg font-medium hover:border-claude-accent transition-colors shadow-sm"
            >
              深度审判 (完整)
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-claude-border bg-claude-bg py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-claude-text-light">
          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} CS-Ideologies (CSTI).</span>
            <Link to="/privacy" className="hover:text-claude-accent transition-colors underline underline-offset-2">隐私政策</Link>
          </div>
          <div className="flex gap-4">
            <span className="text-claude-text-light/50">特别鸣谢:</span>
            <a href="https://github.com/8values/8values.github.io" target="_blank" rel="noreferrer" className="hover:text-claude-accent transition-colors">8values</a>
            <a href="https://www.16personalities.com/" target="_blank" rel="noreferrer" className="hover:text-claude-accent transition-colors">MBTI</a>
            <a href="https://sbti.dev/" target="_blank" rel="noreferrer" className="hover:text-claude-accent transition-colors">SBTI</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
