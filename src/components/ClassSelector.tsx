import React from 'react';
import { useEduQuest } from '../context/EduQuestContext';
import { ClassLevel } from '../types';
import { getAllSubjectsForClass } from '../data/curriculum';
import { GraduationCap } from 'lucide-react';

const CLASSES: { level: ClassLevel; label: string; badge: string }[] = [
  { level: '6', label: 'Class 6', badge: 'Primary' },
  { level: '7', label: 'Class 7', badge: 'Middle' },
  { level: '8', label: 'Class 8', badge: 'Middle' },
  { level: '9', label: 'Class 9', badge: 'Secondary' },
  { level: '10', label: 'Class 10', badge: 'Board' },
  { level: '11', label: 'Class 11', badge: 'Sr. Sec.' },
  { level: '12', label: 'Class 12', badge: 'Senior Board' }
];

export const ClassSelector: React.FC = () => {
  const { selectedClass, setSelectedClass, setSelectedSubjectFilter, activeSession, exitQuiz } = useEduQuest();

  const handleSelectClass = (level: ClassLevel) => {
    if (activeSession && !activeSession.isSubmitted) {
      if (!window.confirm('Switching class will close the active quiz session. Continue?')) {
        return;
      }
      exitQuiz();
    }
    setSelectedClass(level);
    setSelectedSubjectFilter('all');
  };

  const currentSubjects = getAllSubjectsForClass(selectedClass);

  return (
    <section className="bg-white border-b border-slate-200/80 shadow-xs py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-[#7e93c8]" />
          <span>Curriculum Level:</span>
          <span className="text-slate-500 font-normal">
            Class {selectedClass} · {currentSubjects.length} subjects available
          </span>
        </div>

        {/* Horizontal scrollable or wrapped buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CLASSES.map((item) => {
            const isSelected = selectedClass === item.level;
            return (
              <button
                key={item.level}
                onClick={() => handleSelectClass(item.level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#1b2347] text-white shadow-sm ring-2 ring-[#7e93c8]/40'
                    : 'bg-[#f0f2f9] hover:bg-[#e4e7f4] text-slate-700'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`text-[10px] px-1 py-0.2 rounded font-medium ${
                    isSelected ? 'bg-[#7e93c8]/40 text-white' : 'text-slate-500'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
