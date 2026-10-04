import React, { useState } from 'react';
import { useEduQuest } from '../context/EduQuestContext';
import { getDeduplicatedQuizzes, getAllSubjectsForClass } from '../data/curriculum';
import {
  HelpCircle,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
  Search,
  BookOpen,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';

export const TestView: React.FC = () => {
  const {
    selectedClass,
    searchQuery,
    setSearchQuery,
    selectedSubjectFilter,
    setSelectedSubjectFilter,
    activeSession,
    startQuiz,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    submitQuiz,
    retryQuiz,
    exitQuiz,
    quizHistory,
    setActiveTab,
    viewTopicInLearn
  } = useEduQuest();

  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);

  // If a quiz session is active (mode === 'test')
  const isTesting = activeSession && activeSession.mode === 'test';

  // ----------------------------------------------------
  // VIEW 1: Active Quiz Session or Result Page
  // ----------------------------------------------------
  if (isTesting && activeSession) {
    const { topic, subject, currentQuestionIndex, selectedAnswers, isSubmitted, lastAttemptResult, timeSpentSeconds } = activeSession;
    const questions = topic.questions;
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    // ----------------------------------------------------
    // SUB-VIEW: Result Screen
    // ----------------------------------------------------
    if (isSubmitted && lastAttemptResult) {
      const { score, percentage } = lastAttemptResult;

      // Determine performance band
      let performanceLabel = 'Needs Work';
      let performanceColor = 'text-rose-600 bg-rose-50 border-rose-200';
      if (percentage >= 90) {
        performanceLabel = 'Mastered 🌟';
        performanceColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      } else if (percentage >= 75) {
        performanceLabel = 'Proficient 🎯';
        performanceColor = 'text-indigo-700 bg-indigo-50 border-indigo-200';
      } else if (percentage >= 50) {
        performanceLabel = 'Developing 📈';
        performanceColor = 'text-amber-700 bg-amber-50 border-amber-200';
      }

      const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}m ${s < 10 ? '0' : ''}${s}s`;
      };

      return (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Result Score Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-xl mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#1b2347] to-[#3a4982] p-1 shadow-md">
                <img
                  src="/src/assets/images/edu_achievement_trophy_1791115116443.jpg"
                  alt="Achievement Insignia"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Class {selectedClass} · {subject.name}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Quiz Result: {topic.title}
              </h2>

              <div className="my-5 flex flex-wrap items-center justify-center gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <div className="text-xs text-slate-500">Your Score</div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">
                    {score} <span className="text-sm font-normal text-slate-500">/ {totalQuestions}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <div className="text-xs text-slate-500">Percentage</div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">
                    {percentage}%
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <div className="text-xs text-slate-500">Time Taken</div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">
                    {formatTime(timeSpentSeconds)}
                  </div>
                </div>
              </div>

              {/* Performance Tag */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border mb-6">
                <span className={performanceColor}>{performanceLabel}</span>
              </div>

              {/* Working CTA buttons in lighter blue palette (#7e93c8, #8497ce, #798fca) */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={retryQuiz}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] active:bg-[#667bb0] rounded-xl transition-all shadow-sm flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>

                <button
                  onClick={() => startQuiz(topic.id, 'practice')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-[#edf0f9] hover:bg-[#e1e5f5] rounded-xl transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#7e93c8]" />
                  <span>Practice Missed Topics</span>
                </button>

                <button
                  onClick={() => {
                    exitQuiz();
                    setActiveTab('improve');
                  }}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  View Improvement Roadmap
                </button>

                <button
                  onClick={exitQuiz}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  All Quizzes
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Question Review Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Detailed Answers & Explanations ({score} of {totalQuestions} correct)
              </h3>
              <span className="text-xs text-slate-500">
                Review each solution below
              </span>
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userSelected = selectedAnswers[q.id];
                const isCorrect = userSelected === q.correctAnswer;
                const wasSkipped = userSelected === undefined;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-xl border transition-all ${
                      isCorrect
                        ? 'bg-emerald-50/30 border-emerald-200'
                        : wasSkipped
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-rose-50/30 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Difficulty: {q.difficulty}
                        </span>
                      </div>

                      {isCorrect ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Correct (+1)
                        </span>
                      ) : wasSkipped ? (
                        <span className="text-xs font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">
                          Unanswered
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (0)
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-3">{q.question}</h4>

                    {/* Options list showing user choice vs correct */}
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, optIdx) => {
                        const isUserChoice = userSelected === optIdx;
                        const isRightAnswer = optIdx === q.correctAnswer;

                        let style = 'bg-white border-slate-200 text-slate-700';
                        if (isRightAnswer) {
                          style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                        } else if (isUserChoice && !isCorrect) {
                          style = 'bg-rose-50 border-rose-500 text-rose-950';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-2 ${style}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded font-mono text-[11px] font-bold flex items-center justify-center bg-slate-100">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                              {isRightAnswer && (
                                <span className="text-emerald-700 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Correct Answer
                                </span>
                              )}
                              {isUserChoice && !isRightAnswer && (
                                <span className="text-rose-700 flex items-center gap-1">
                                  <XCircle className="w-3.5 h-3.5" /> Your Choice
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-3.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#7e93c8]" />
                        <span>Explanation:</span>
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // ----------------------------------------------------
    // SUB-VIEW: Active Quiz Taking Mode
    // ----------------------------------------------------
    const selectedOption = selectedAnswers[currentQuestion.id];

    const formatTimer = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5569a3] uppercase">
              <span>Class {selectedClass}</span>
              <span aria-hidden="true">·</span>
              <span>{subject.name}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{topic.title}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono tabular-nums">
              <Clock className="w-3.5 h-3.5 text-[#7e93c8]" />
              <span>Time: {formatTimer(timeSpentSeconds)}</span>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Quit this quiz attempt? Your answers will not be recorded.')) {
                  exitQuiz();
                }
              }}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Question Tracker Navigator */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/90 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = selectedAnswers[q.id] !== undefined;

              return (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                    isCurrent
                      ? 'ring-2 ring-[#7e93c8] bg-[#1b2347] text-white shadow-xs'
                      : isAnswered
                      ? 'bg-[#7e93c8] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  aria-label={`Jump to Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-medium shrink-0">
            {answeredCount} of {totalQuestions} Answered
          </div>
        </div>

        {/* Current Question Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-slate-500">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">
              Difficulty: {currentQuestion.difficulty}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Options List */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;

              return (
                <button
                  key={idx}
                  onClick={() => answerQuestion(currentQuestion.id, idx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#1b2347] border-[#1b2347] text-white shadow-sm ring-1 ring-[#7e93c8]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'bg-[#7e93c8] text-white'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isSelected && <CheckCircle className="w-5 h-5 text-[#8497ce]" />}
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentQuestionIndex === 0
                  ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] active:bg-[#667bb0] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Quiz</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Submit Confirmation Dialog */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <AlertCircle className="w-6 h-6 text-[#7e93c8]" />
                <h3 className="text-base font-bold">Ready to Submit Quiz?</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You have answered <span className="font-bold text-slate-900">{answeredCount}</span> of{' '}
                <span className="font-bold text-slate-900">{totalQuestions}</span> questions.
                {answeredCount < totalQuestions && (
                  <span className="block text-amber-600 font-medium mt-1">
                    Warning: You have {totalQuestions - answeredCount} unanswered questions remaining.
                  </span>
                )}
              </p>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Keep Reviewing
                </button>
                <button
                  onClick={() => {
                    setShowSubmitConfirm(false);
                    submitQuiz();
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] rounded-xl transition-colors shadow-sm"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW 2: Quiz Selection & Deduplicated Quizzes Grid
  // ----------------------------------------------------
  // Prevent duplicate quiz cards: deduplicate quizzes by subject and topic, so each subject/topic appears only once.
  const deduplicatedQuizzes = getDeduplicatedQuizzes(selectedClass);
  const subjects = getAllSubjectsForClass(selectedClass);

  // Filter by subject and search query
  const filteredQuizzes = deduplicatedQuizzes.filter((item) => {
    if (selectedSubjectFilter !== 'all' && item.subjectId !== selectedSubjectFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.topicTitle.toLowerCase().includes(q) ||
      item.topicDescription.toLowerCase().includes(q) ||
      item.subjectName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Subject Filter Bar */}
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
            All Subjects ({deduplicatedQuizzes.length} Quizzes)
          </button>
          {subjects.map((s) => {
            const count = deduplicatedQuizzes.filter((q) => q.subjectId === s.id).length;
            return (
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
                <span className="text-[10px] text-slate-400">({count})</span>
              </button>
            );
          })}
        </div>

        {searchQuery && (
          <div className="text-xs text-slate-500">
            Matching <span className="font-semibold text-slate-700">"{searchQuery}"</span>
            <button
              onClick={() => setSearchQuery('')}
              className="ml-2 text-[#7e93c8] underline text-xs"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Deduplicated Quiz Cards Grid */}
      {filteredQuizzes.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center border border-slate-200 text-slate-500">
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <div className="text-sm font-semibold text-slate-700">No quizzes match your filters</div>
          <p className="text-xs text-slate-500 mt-1">
            Try resetting your search query or selecting a different subject above.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredQuizzes.map((quiz) => {
            // Find recent attempt for this topic
            const pastAttempt = quizHistory.find(
              (h) => h.classLevel === selectedClass && h.topicId === quiz.topicId
            );

            return (
              <div
                key={quiz.uniqueKey}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-[#7e93c8] hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top metadata row with clean unboxed text and separator */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-[#5569a3] uppercase tracking-wide">
                      {quiz.subjectName}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{quiz.estimatedMinutes} mins</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5 line-clamp-1">
                    {quiz.topicTitle}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {quiz.topicDescription}
                  </p>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    <span>{quiz.questionCount} Questions</span>
                    <span aria-hidden="true">·</span>
                    <span>Diff: {quiz.difficultyLevels.join(', ')}</span>
                  </div>
                </div>

                <div>
                  {pastAttempt && (
                    <div className="flex items-center justify-between text-[11px] bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80 mb-3">
                      <span className="text-slate-500">Last Attempt:</span>
                      <span className="font-bold text-slate-800">
                        {pastAttempt.score}/{pastAttempt.totalQuestions} ({pastAttempt.percentage}%)
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewTopicInLearn(quiz.topicId)}
                      className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                      title="Review syllabus notes before starting"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>

                    {/* Keep quiz CTA button in requested lighter blue palette: #8497ce, #7e93c8, #798fca */}
                    <button
                      onClick={() => startQuiz(quiz.topicId, 'test')}
                      className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] active:bg-[#667bb0] transition-colors shadow-2xs flex items-center justify-center gap-2"
                    >
                      <span>Start Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
