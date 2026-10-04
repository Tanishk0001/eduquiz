import React, { useState } from 'react';
import { useEduQuest } from '../context/EduQuestContext';
import { getAllSubjectsForClass } from '../data/curriculum';
import { Topic } from '../types';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Check,
  BookOpen
} from 'lucide-react';

export const PracticeView: React.FC = () => {
  const {
    selectedClass,
    activeSession,
    startQuiz,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    exitQuiz,
    viewTopicInLearn
  } = useEduQuest();

  const [showHint, setShowHint] = useState<boolean>(false);

  // If user is currently in an active practice session
  const isPracticing = activeSession && activeSession.mode === 'practice';

  // If not practicing, show topic selector for this class
  const subjects = getAllSubjectsForClass(selectedClass);

  if (!isPracticing || !activeSession) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-[#7e93c8] uppercase tracking-wider mb-1">
              Interactive Practice Mode
            </div>
            <h2
              className="text-2xl font-bold text-slate-900 mb-2"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Choose a Topic to Practice with Instant Feedback
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Unlike a timed exam, Practice Mode reveals immediate feedback, detailed rationales, and hints
              after every single choice. Master each concept at your own pace before taking a formal test.
            </p>
          </div>
        </div>

        {/* Subjects & Topics Grid */}
        <div className="space-y-6">
          {subjects.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: sub.color }}
                  />
                  <h3 className="text-base font-bold text-slate-900">{sub.name}</h3>
                  <span className="text-xs text-slate-400">({sub.topics.length} topics)</span>
                </div>
                <span className="text-xs text-slate-500">{sub.description}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sub.topics.map((topic: Topic) => (
                  <div
                    key={topic.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-[#7e93c8] hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 mb-1 line-clamp-1">
                        {topic.title}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                        {topic.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500">
                        {topic.questions.length} questions
                      </span>
                      <button
                        onClick={() => startQuiz(topic.id, 'practice')}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>Practice</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Active Practice Session UI
  const { topic, subject, currentQuestionIndex, selectedAnswers } = activeSession;
  const currentQuestion = topic.questions[currentQuestionIndex];
  const totalQuestions = topic.questions.length;
  const selectedOptionIndex = selectedAnswers[currentQuestion.id];
  const hasAnswered = selectedOptionIndex !== undefined;
  const isCorrect = hasAnswered && selectedOptionIndex === currentQuestion.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Practice Header Bar */}
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
          <button
            onClick={() => viewTopicInLearn(topic.id)}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Review Notes</span>
          </button>
          <button
            onClick={() => {
              if (window.confirm('Exit practice session?')) exitQuiz();
            }}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-lg transition-colors"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Question Stepper Indicator */}
      <div className="bg-white rounded-xl p-3 border border-slate-200/90 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {topic.questions.map((q, idx) => {
            const isCurrent = idx === currentQuestionIndex;
            const ans = selectedAnswers[q.id];
            const answered = ans !== undefined;
            const right = answered && ans === q.correctAnswer;

            return (
              <button
                key={q.id}
                onClick={() => goToQuestion(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                  isCurrent
                    ? 'ring-2 ring-[#7e93c8] font-extrabold shadow-xs'
                    : ''
                } ${
                  answered
                    ? right
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 font-medium shrink-0">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        {/* Difficulty & Prompt */}
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider text-slate-500">
              Difficulty: <span className="text-[#5569a3]">{currentQuestion.difficulty}</span>
            </span>
            {currentQuestion.hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-amber-600 hover:text-amber-700 text-xs font-medium flex items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>
            )}
          </div>

          {showHint && currentQuestion.hint && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Hint: </span>
                <span>{currentQuestion.hint}</span>
              </div>
            </div>
          )}

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options List with Instant Feedback States */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const isCorrectOption = idx === currentQuestion.correctAnswer;

            let optionStyle =
              'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

            if (hasAnswered) {
              if (isSelected && isCorrect) {
                optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-1 ring-rose-500';
              } else if (isCorrectOption) {
                // reveal the right answer
                optionStyle = 'bg-emerald-50/70 border-emerald-400 text-emerald-800';
              } else {
                optionStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => answerQuestion(currentQuestion.id, idx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                        : isCorrectOption && hasAnswered
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {hasAnswered && (
                  <div>
                    {isSelected && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    )}
                    {isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    )}
                    {!isSelected && isCorrectOption && (
                      <span className="text-xs font-bold text-emerald-700">Correct Answer</span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Card */}
        {hasAnswered && (
          <div
            className={`p-4 sm:p-5 rounded-xl border transition-all ${
              isCorrect
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">Excellent! Correct Answer</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-800">Review Concept Explanation</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-800">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Practice Navigation Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              currentQuestionIndex === 0
                ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {hasAnswered && (
              <button
                onClick={() => {
                  // Allow retrying this question
                  const updated = { ...selectedAnswers };
                  delete updated[currentQuestion.id];
                  // Set answers in context
                  answerQuestion(currentQuestion.id, -1);
                }}
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            )}

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={nextQuestion}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  startQuiz(topic.id, 'test');
                }}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Formal Test</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
