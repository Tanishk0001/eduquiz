import React from 'react';
import { useEduQuest } from '../context/EduQuestContext';
import { Flame, Award, BookCheck, Target, ArrowRight } from 'lucide-react';

export const HeroProgress: React.FC = () => {
  const {
    selectedClass,
    quizHistory,
    currentUser,
    setActiveTab,
    selectedSubjectFilter,
    setSelectedSubjectFilter
  } = useEduQuest();

  // Compute metrics from quizHistory for this user & class
  const classAttempts = quizHistory.filter((a) => a.classLevel === selectedClass);
  const totalCompleted = classAttempts.length;

  const averageScore =
    totalCompleted > 0
      ? Math.round(classAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalCompleted)
      : 0;

  const masteredCount = classAttempts.filter((a) => a.percentage >= 80).length;
  const streakDays = currentUser?.streakDays || 1;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#141b36] via-[#1a2348] to-[#253265] text-white rounded-2xl shadow-md border border-[#2b386c] mb-8">
      {/* Background illustration with measured contrast scrim */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
        <img
          src="/src/assets/images/hero_eduquest_learning_1791115094413.jpg"
          alt="Educational backdrop"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141b36] via-[#141b36]/90 to-transparent" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          {/* Tagline & Title */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8497ce] mb-2">
            <span>Learn · Practice · Test · Improve</span>
          </div>

          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3 text-balance"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Class {selectedClass} Interactive Learning & Mastery Dashboard
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
            Strengthen your conceptual grasp through guided syllabus notes, instant-feedback practice sets,
            and comprehensive timed examinations.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('test')}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] active:bg-[#667bb0] rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <span>Take a Topic Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#e1e7fa] bg-[#1e274c] hover:bg-[#273466] border border-[#3b497e] rounded-xl transition-all"
            >
              Practice Mode
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#e1e7fa] bg-[#1e274c] hover:bg-[#273466] border border-[#3b497e] rounded-xl transition-all"
            >
              Browse Study Notes
            </button>
          </div>
        </div>

        {/* Polished Metrics Grid - NOTICE: strictly NO avatar initials or avatar text as requested */}
        <div className="mt-8 pt-6 border-t border-[#2d3a6e]/70 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#192247]/70 backdrop-blur-xs border border-[#2e3c74] rounded-xl p-3.5 sm:p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Study Streak</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
              {streakDays} <span className="text-xs font-normal text-slate-300">Days</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Active daily streak</div>
          </div>

          <div className="bg-[#192247]/70 backdrop-blur-xs border border-[#2e3c74] rounded-xl p-3.5 sm:p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Quizzes Taken</span>
              <BookCheck className="w-4 h-4 text-[#8497ce]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
              {totalCompleted}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">In Class {selectedClass}</div>
          </div>

          <div className="bg-[#192247]/70 backdrop-blur-xs border border-[#2e3c74] rounded-xl p-3.5 sm:p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Avg. Score</span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
              {averageScore}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Overall accuracy</div>
          </div>

          <div className="bg-[#192247]/70 backdrop-blur-xs border border-[#2e3c74] rounded-xl p-3.5 sm:p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Mastered</span>
              <Award className="w-4 h-4 text-indigo-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
              {masteredCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Score ≥ 80%</div>
          </div>
        </div>
      </div>
    </section>
  );
};
