import React from 'react';
import { useEduQuest } from '../context/EduQuestContext';
import { ClassLevel, ActiveTab } from '../types';

export const Footer: React.FC = () => {
  const { setSelectedClass, setActiveTab, selectedClass } = useEduQuest();

  const handleClassClick = (lvl: ClassLevel) => {
    setSelectedClass(lvl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-[#141b36] border-t border-[#232d56] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Wordmark & Statement */}
          <div className="space-y-3">
            <div
              className="text-lg font-bold text-white tracking-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              EduQuest
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Interactive learning, continuous practice, diagnostic testing, and targeted improvement for Classes 6 through 12.
            </p>
            <div className="text-[11px] text-[#8497ce]">
              Learn · Practice · Test · Improve
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Learning Tracks
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => handleTabClick('learn')}
                  className="hover:text-white transition-colors"
                >
                  Learn Concepts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('practice')}
                  className="hover:text-white transition-colors"
                >
                  Practice Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('test')}
                  className="hover:text-white transition-colors"
                >
                  Topic-wise MCQ Quizzes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('improve')}
                  className="hover:text-white transition-colors"
                >
                  Improvement & Weak Topics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Secondary Classes */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Senior Secondary
            </div>
            <ul className="space-y-1.5">
              {(['12', '11', '10'] as ClassLevel[]).map((lvl) => (
                <li key={lvl}>
                  <button
                    onClick={() => handleClassClick(lvl)}
                    className={`transition-colors ${
                      selectedClass === lvl ? 'text-[#8497ce] font-semibold' : 'hover:text-white'
                    }`}
                  >
                    Class {lvl} Curriculum {selectedClass === lvl && '✓'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Middle Classes */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Middle & Foundation
            </div>
            <ul className="space-y-1.5">
              {(['9', '8', '7', '6'] as ClassLevel[]).map((lvl) => (
                <li key={lvl}>
                  <button
                    onClick={() => handleClassClick(lvl)}
                    className={`transition-colors ${
                      selectedClass === lvl ? 'text-[#8497ce] font-semibold' : 'hover:text-white'
                    }`}
                  >
                    Class {lvl} Curriculum {selectedClass === lvl && '✓'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#232d56] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>© {new Date().getFullYear()} EduQuest Interactive Platform. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Client-side persistent demo storage</span>
            <span aria-hidden="true">·</span>
            <span>Accessibility Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
