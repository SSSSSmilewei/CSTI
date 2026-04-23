import React from 'react';
import type { Archetype, Badge, Axis } from '../data/types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import * as Icons from 'lucide-react';

interface ResultCardProps {
  archetype: Archetype;
  scores: Record<Axis, number>;
  badges: Badge[];
}

// Cast Icons to any to allow dynamic access by string name
const IconMap = (Icons as any);

const axisLabels: Record<Axis, string> = {
  paradigm: '编程范式',
  system: '系统架构',
  copyright: '开源版权',
  evolution: '技术演进'
};

import ReactMarkdown from 'react-markdown';

export const ResultCard: React.FC<ResultCardProps> = ({ archetype, scores, badges }) => {
  const data = [
    { subject: axisLabels.paradigm, A: scores.paradigm, fullMark: 100 },
    { subject: axisLabels.system, A: scores.system, fullMark: 100 },
    { subject: axisLabels.copyright, A: scores.copyright, fullMark: 100 },
    { subject: axisLabels.evolution, A: scores.evolution, fullMark: 100 },
  ];

  return (
    <div className="bg-claude-surface rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 max-w-4xl mx-auto border border-claude-border">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-sm uppercase tracking-widest text-claude-text-light mb-3">人格原型</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-claude-text mb-4">{archetype.name}</h1>
        {archetype.subtitle && (
          <div className="inline-block px-4 py-1.5 rounded-full bg-claude-border text-claude-text text-sm font-bold mb-6">
            {archetype.subtitle}
          </div>
        )}
        <p className="text-xl text-claude-text max-w-3xl mx-auto italic leading-relaxed border-l-4 border-claude-accent pl-6 text-left mb-8 bg-claude-bg/50 p-6 rounded-r-lg">
          "{archetype.quote || archetype.description}"
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-12">
        {/* Radar Chart */}
        <div className="lg:w-1/2 h-80 lg:h-auto min-h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
              <PolarGrid stroke="#E6E0D4" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#2c2825', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-serif)' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Score"
                dataKey="A"
                stroke="#D97757"
                fill="#D97757"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Bars */}
        <div className="lg:w-1/2 flex flex-col justify-center gap-6">
          {(Object.entries(scores) as [Axis, number][]).map(([axis, score]) => (
            <div key={axis} className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-claude-text">
                <span className="font-bold">{axisLabels[axis]}</span>
                <span className="text-claude-accent">{Math.round(score)}%</span>
              </div>
              <div className="h-2.5 bg-claude-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-claude-accent rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Description */}
      {archetype.detailedContent && (
        <div className="mb-16">
          <div className="w-16 h-1 bg-claude-accent mb-8"></div>
          <div className="prose prose-stone prose-lg max-w-none text-claude-text">
            <ReactMarkdown>{archetype.detailedContent}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Badges Grid */}
      {badges.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-claude-text mb-6 border-b border-claude-border pb-3 flex items-center gap-3">
            <Icons.Award className="w-6 h-6 text-claude-accent" />
            阵营徽章
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {badges.map((badge) => {
              const IconComponent = IconMap[badge.iconName] || Icons.Award;
              return (
                <div key={badge.id} className="flex flex-col items-center p-5 bg-claude-bg rounded-xl hover:bg-claude-surface transition-colors group relative cursor-help border border-claude-border hover:border-claude-accent shadow-sm hover:shadow-md">
                  <div className="p-3 bg-claude-surface rounded-full shadow-sm mb-3 border border-claude-border group-hover:border-claude-accent transition-colors">
                    <IconComponent className="w-7 h-7 text-claude-accent" />
                  </div>
                  <span className="text-sm font-bold text-center text-claude-text leading-tight">{badge.name}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-3 hidden group-hover:block w-56 p-3 bg-claude-text text-claude-bg text-xs rounded-lg z-10 text-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {badge.description}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-claude-text"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center border-t border-claude-border pt-8 mt-12 text-claude-text-light text-sm font-medium tracking-wide uppercase">
        CS-Ideologies (CSTI) &bull; {new Date().getFullYear()}
      </div>
    </div>
  );
};

