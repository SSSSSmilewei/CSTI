import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home as HomeIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { archetypes } from '../data/archetypes';
import { badges } from '../data/badges';
import * as Icons from 'lucide-react';

const IconMap = (Icons as any);

export const Archetypes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'archetypes' | 'badges'>('archetypes');
  const [selectedArchetypeIndex, setSelectedArchetypeIndex] = useState(0);
  const [selectedBadgeIndex, setSelectedBadgeIndex] = useState(0);

  const selectedArchetype = archetypes[selectedArchetypeIndex];
  const selectedBadge = badges[selectedBadgeIndex];

  return (
    <div className="min-h-screen bg-claude-bg text-claude-text font-serif flex flex-col">
      {/* Header */}
      <header className="border-b border-claude-border sticky top-0 bg-claude-bg/90 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-claude-accent" />
            <span className="font-bold text-lg tracking-wide">CS-Ideologies (CSTI)</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-claude-text hover:text-claude-accent transition-colors">首页</Link>
            <Link to="/archetypes" className="text-claude-accent transition-colors">人格类型</Link>
            <Link to="/test?mode=short" className="text-claude-text hover:text-claude-accent transition-colors">简短做题</Link>
            <Link to="/test" className="text-claude-text hover:text-claude-accent transition-colors">完整测试</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">全部图鉴</h1>
          <p className="text-claude-text-light text-lg">
            浏览所有 {archetypes.length} 种人格原型与 {badges.length} 种阵营徽章。
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('archetypes')}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${activeTab === 'archetypes' ? 'bg-claude-accent text-white shadow-md' : 'bg-claude-surface text-claude-text border border-claude-border hover:border-claude-accent'}`}
          >
            人格原型
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${activeTab === 'badges' ? 'bg-claude-accent text-white shadow-md' : 'bg-claude-surface text-claude-text border border-claude-border hover:border-claude-accent'}`}
          >
            阵营徽章
          </button>
        </div>

        {activeTab === 'archetypes' && (
          <div className="flex flex-col gap-8">
            {/* Horizontal Selector */}
            <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide snap-x">
              {archetypes.map((arch, index) => (
                <button
                  key={arch.name}
                  onClick={() => setSelectedArchetypeIndex(index)}
                  className={`snap-center flex-shrink-0 px-6 py-4 rounded-xl border transition-all text-left min-w-[200px] ${
                    selectedArchetypeIndex === index 
                      ? 'bg-claude-surface border-claude-accent shadow-md' 
                      : 'bg-claude-bg border-claude-border hover:bg-claude-surface hover:border-claude-text-light opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="font-bold text-lg text-claude-text mb-1">{arch.name}</div>
                  {arch.subtitle && <div className="text-xs text-claude-text-light uppercase tracking-wider">{arch.subtitle}</div>}
                </button>
              ))}
            </div>

            {/* Selected Character Display */}
            <div className="bg-claude-surface rounded-2xl p-8 md:p-12 border border-claude-border shadow-sm min-h-[500px]">
              <div className="mb-10 text-center">
                <h2 className="text-sm uppercase tracking-widest text-claude-text-light mb-3">原型代号</h2>
                <h1 className="text-4xl md:text-5xl font-bold text-claude-text mb-4">{selectedArchetype.name}</h1>
                {selectedArchetype.subtitle && (
                  <div className="inline-block px-4 py-1.5 rounded-full bg-claude-border text-claude-text text-sm font-bold mb-6">
                    {selectedArchetype.subtitle}
                  </div>
                )}
                <p className="text-xl text-claude-text max-w-3xl mx-auto italic leading-relaxed border-l-4 border-claude-accent pl-6 text-left mb-8 bg-claude-bg/50 p-6 rounded-r-lg">
                  "{selectedArchetype.quote || selectedArchetype.description}"
                </p>
              </div>

              {selectedArchetype.detailedContent ? (
                <div className="prose prose-stone prose-lg max-w-none text-claude-text mx-auto">
                  <ReactMarkdown>{selectedArchetype.detailedContent}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-center text-claude-text-light py-20 italic">
                  暂无深入分析报告...
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="flex flex-col gap-8">
            {/* Horizontal Selector */}
            <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide snap-x">
              {badges.map((badge, index) => {
                const IconComponent = IconMap[badge.iconName] || Icons.Award;
                return (
                  <button
                    key={badge.id}
                    onClick={() => setSelectedBadgeIndex(index)}
                    className={`snap-center flex flex-col items-center flex-shrink-0 p-4 rounded-xl border transition-all min-w-[140px] ${
                      selectedBadgeIndex === index 
                        ? 'bg-claude-surface border-claude-accent shadow-md opacity-100' 
                        : 'bg-claude-bg border-claude-border hover:bg-claude-surface hover:border-claude-text-light opacity-60 hover:opacity-100'
                    }`}
                  >
                    <IconComponent className={`w-8 h-8 mb-2 ${selectedBadgeIndex === index ? 'text-claude-accent' : 'text-claude-text-light'}`} />
                    <div className="font-bold text-sm text-claude-text text-center">{badge.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Badge Display */}
            <div className="bg-claude-surface rounded-2xl p-8 md:p-12 border border-claude-border shadow-sm min-h-[500px]">
              <div className="mb-10 text-center">
                <div className="inline-block p-6 bg-claude-bg rounded-full border border-claude-border mb-6">
                  {React.createElement(IconMap[selectedBadge.iconName] || Icons.Award, { className: "w-16 h-16 text-claude-accent" })}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-claude-text mb-4">{selectedBadge.name}</h1>
                <p className="text-xl text-claude-text max-w-3xl mx-auto italic leading-relaxed mb-8">
                  "{selectedBadge.quote || selectedBadge.description}"
                </p>
              </div>

              {selectedBadge.detailedContent ? (
                <div className="prose prose-stone prose-lg max-w-none text-claude-text mx-auto">
                  <ReactMarkdown>{selectedBadge.detailedContent}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-center text-claude-text-light py-20 italic">
                  暂无深入分析报告...
                </div>
              )}
            </div>
          </div>
        )}
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
