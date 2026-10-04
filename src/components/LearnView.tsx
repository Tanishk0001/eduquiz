import React, { useState } from 'react';
import { useEduQuest } from '../context/EduQuestContext';
import { getAllSubjectsForClass } from '../data/curriculum';
import { Topic, Subject } from '../types';
import {
  BookOpen,
  CheckCircle,
  HelpCircle,
  Bookmark,
  Clock,
  Lightbulb,
  FileText,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const LearnView: React.FC = () => {
  const {
    selectedClass,
    searchQuery,
    setSearchQuery,
    selectedSubjectFilter,
    setSelectedSubjectFilter,
    startQuiz,
    toggleBookmark,
    isBookmarked,
    selectedLearnTopicId,
    setSelectedLearnTopicId
  } = useEduQuest();

  const subjects = getAllSubjectsForClass(selectedClass);

  // Filter subjects based on filter tab
  const activeSubjectList =
    selectedSubjectFilter === 'all'
      ? subjects
      : subjects.filter((s) => s.id === selectedSubjectFilter);

  // Collect all topics with their parent subject
  const allTopicPairs: { subject: Subject; topic: Topic }[] = [];
  subjects.forEach((s: Subject) => {
    s.topics.forEach((t: Topic) => {
      allTopicPairs.push({ subject: s, topic: t });
    });
  });

  // Filter by search query
  const filteredTopicPairs = allTopicPairs.filter(({ subject, topic }) => {
    if (selectedSubjectFilter !== 'all' && subject.id !== selectedSubjectFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      topic.title.toLowerCase().includes(query) ||
      topic.description.toLowerCase().includes(query) ||
      topic.summary.toLowerCase().includes(query) ||
      subject.name.toLowerCase().includes(query) ||
      topic.keyConcepts.some((k) => k.toLowerCase().includes(query))
    );
  });

  // Currently active topic for deep reading
  const activePair =
    selectedLearnTopicId
      ? allTopicPairs.find((p) => p.topic.id === selectedLearnTopicId) || allTopicPairs[0]
      : allTopicPairs[0];

  const currentTopic = activePair?.topic;
  const currentSubject = activePair?.subject;

  return (
    <div className="space-y-6">
      {/* Subject Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedSubjectFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedSubjectFilter === 'all'
                ? 'bg-[#1b2347] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Subjects ({subjects.length})
          </button>
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubjectFilter(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedSubjectFilter === s.id
                  ? 'bg-[#1b2347] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{s.name}</span>
              <span className="text-[10px] text-slate-400">({s.topics.length})</span>
            </button>
          ))}
        </div>

        {searchQuery && (
          <div className="text-xs text-slate-500">
            Filtering by <span className="font-semibold text-slate-700">"{searchQuery}"</span>
            <button
              onClick={() => setSearchQuery('')}
              className="ml-2 text-[#7e93c8] underline text-xs"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {filteredTopicPairs.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center border border-slate-200 text-slate-500">
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <div className="text-sm font-semibold text-slate-700">No topics found</div>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or selecting a different subject filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSubjectFilter('all');
            }}
            className="mt-3 px-4 py-1.5 text-xs font-semibold bg-[#7e93c8] text-white rounded-lg hover:bg-[#7286bc]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Topics Sidebar List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider px-1">
              Topics in Class {selectedClass} ({filteredTopicPairs.length})
            </div>

            <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
              {filteredTopicPairs.map(({ subject, topic }) => {
                const isSelected = currentTopic?.id === topic.id;
                const bookmarked = isBookmarked(topic.id);

                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedLearnTopicId(topic.id)}
                    className={`cursor-pointer text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-white border-[#7e93c8] shadow-sm ring-1 ring-[#7e93c8]'
                        : 'bg-white hover:bg-slate-50 border-slate-200/90'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[11px] font-semibold text-[#5569a3] uppercase tracking-wide">
                          {subject.name}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-1">
                          {topic.title}
                        </h3>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(topic.id);
                        }}
                        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark topic'}
                        className="text-slate-400 hover:text-amber-500 transition-colors p-1"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${bookmarked ? 'fill-amber-400 text-amber-500' : ''}`}
                        />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{topic.estimatedMinutes} mins read</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{topic.questions.length} Questions</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep Concept Reader (8 cols) */}
          {currentTopic && currentSubject ? (
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              {/* Header Visual Banner */}
              <div className="relative bg-gradient-to-r from-[#171f3f] to-[#253265] text-white p-6 sm:p-8">
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-[#8497ce] tracking-wide uppercase">
                      Class {selectedClass} · {currentSubject.name}
                    </span>
                    <button
                      onClick={() => toggleBookmark(currentTopic.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isBookmarked(currentTopic.id) ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                      <span>{isBookmarked(currentTopic.id) ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>

                  <h2
                    className="text-xl sm:text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {currentTopic.title}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    {currentTopic.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-300 mt-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8497ce]" />
                      <span>{currentTopic.estimatedMinutes} min study guide</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-[#8497ce]" />
                      <span>{currentTopic.questions.length} MCQ practice items</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Study Notes Content */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Topic Summary */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-[#7e93c8]" />
                    <span>Executive Summary</span>
                  </h3>
                  <div className="bg-[#f7f8fd] border border-[#e4e7f5] rounded-xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentTopic.summary}
                  </div>
                </div>

                {/* Key Concepts / Takeaways */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Core Learning Concepts</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentTopic.keyConcepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-2.5 shadow-2xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#edeef8] text-[#5569a3] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-xs text-slate-700 leading-normal">{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formulas or Key Facts */}
                {currentTopic.formulasOrFacts && currentTopic.formulasOrFacts.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-[#7e93c8]" />
                      <span>Essential Formulas & Canonical Facts</span>
                    </h3>
                    <div className="bg-[#1b2347] text-white rounded-xl p-4 border border-[#2d3a6e] space-y-2">
                      {currentTopic.formulasOrFacts.map((fact, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-200">
                          <span className="text-[#8497ce]">▸</span>
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Action Deck */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    Ready to test your comprehension of this topic?
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => startQuiz(currentTopic.id, 'practice')}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800 bg-[#edf0f9] hover:bg-[#e1e5f5] transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-[#7e93c8]" />
                      <span>Practice Topic</span>
                    </button>
                    {/* Keep quiz CTA button in requested lighter blue palette: #7e93c8, #8497ce */}
                    <button
                      onClick={() => startQuiz(currentTopic.id, 'test')}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] active:bg-[#667bb0] transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>Start Quiz</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-8 bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500">
              Select a topic from the left to read its study guide.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
