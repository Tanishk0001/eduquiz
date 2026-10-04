import React from 'react';
import { useEduQuest } from '../context/EduQuestContext';
import { getAllSubjectsForClass, findTopic } from '../data/curriculum';
import { Subject, Topic } from '../types';
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  Target,
  BarChart2,
  Trash2
} from 'lucide-react';

export const ImproveView: React.FC = () => {
  const {
    selectedClass,
    quizHistory,
    startQuiz,
    viewTopicInLearn,
    setActiveTab,
    clearHistory
  } = useEduQuest();

  const subjects = getAllSubjectsForClass(selectedClass);

  // Filter attempts for the selected class
  const classAttempts = quizHistory.filter((a) => a.classLevel === selectedClass);

  // Group attempts by topic to find the latest score or average score per topic
  const topicStatsMap = new Map<
    string,
    {
      topicId: string;
      topicTitle: string;
      subjectId: string;
      subjectName: string;
      attemptsCount: number;
      latestPercentage: number;
      bestPercentage: number;
      lastAttemptDate: string;
      missedQuestionsCount: number;
    }
  >();

  classAttempts.forEach((attempt) => {
    const existing = topicStatsMap.get(attempt.topicId);
    const missed = attempt.totalQuestions - attempt.score;

    if (!existing) {
      topicStatsMap.set(attempt.topicId, {
        topicId: attempt.topicId,
        topicTitle: attempt.topicTitle,
        subjectId: attempt.subjectId,
        subjectName: attempt.subjectName,
        attemptsCount: 1,
        latestPercentage: attempt.percentage,
        bestPercentage: attempt.percentage,
        lastAttemptDate: attempt.date,
        missedQuestionsCount: missed
      });
    } else {
      existing.attemptsCount += 1;
      existing.bestPercentage = Math.max(existing.bestPercentage, attempt.percentage);
      existing.missedQuestionsCount += missed;
      // If newer date
      if (new Date(attempt.date) > new Date(existing.lastAttemptDate)) {
        existing.latestPercentage = attempt.percentage;
        existing.lastAttemptDate = attempt.date;
      }
    }
  });

  const topicStatsList = Array.from(topicStatsMap.values());

  // Weak topics: latest score < 70% or missed questions > 0
  const weakTopics = topicStatsList
    .filter((t) => t.latestPercentage < 70)
    .sort((a, b) => a.latestPercentage - b.latestPercentage);

  // Mastered topics: latest score >= 80%
  const strongTopics = topicStatsList
    .filter((t) => t.latestPercentage >= 80)
    .sort((a, b) => b.latestPercentage - a.latestPercentage);

  // Recommendations:
  // 1. Weak topics first
  // 2. Unattempted topics in subjects where student has low score
  const attemptedTopicIds = new Set(topicStatsList.map((t) => t.topicId));
  const unattemptedTopics: { subjectName: string; topicId: string; topicTitle: string; description: string }[] = [];

  subjects.forEach((s: Subject) => {
    s.topics.forEach((t: Topic) => {
      if (!attemptedTopicIds.has(t.id)) {
        unattemptedTopics.push({
          subjectName: s.name,
          topicId: t.id,
          topicTitle: t.title,
          description: t.description
        });
      }
    });
  });

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#7e93c8] uppercase tracking-wider mb-1">
              Personalized Adaptive Learning
            </div>
            <h2
              className="text-2xl font-bold text-slate-900 mb-2"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Mastery Analysis & Improvement Plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              We analyze your quiz attempts, incorrect responses, and accuracy scores to detect conceptual
              weaknesses and generate high-yield practice recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('test')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] rounded-xl transition-colors shadow-2xs whitespace-nowrap"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: WEAK TOPICS / IMMEDIATE ATTENTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">
              Topics Needing Immediate Practice ({weakTopics.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">Accuracy &lt; 70%</span>
        </div>

        {weakTopics.length === 0 ? (
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-sm font-bold text-emerald-900">No Weak Topics Detected!</div>
            <p className="text-xs text-emerald-700 mt-1 max-w-md mx-auto">
              All your attempted quizzes in Class {selectedClass} have scored above 70%. Keep up the high standard or test yourself on fresh topics below.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weakTopics.map((topic) => (
              <div
                key={topic.topicId}
                className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-500 uppercase">{topic.subjectName}</span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      Current Score: {topic.latestPercentage}%
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1">{topic.topicTitle}</h4>
                  <p className="text-xs text-slate-600 mb-3">
                    You have attempted this topic {topic.attemptsCount} {topic.attemptsCount === 1 ? 'time' : 'times'}.
                    Reinforce the fundamental principles before your next exam.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => viewTopicInLearn(topic.topicId)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    <span>Study Notes</span>
                  </button>

                  <button
                    onClick={() => startQuiz(topic.topicId, 'practice')}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Practice Weak Areas</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: RECOMMENDED NEXT STEPS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[#7e93c8]" />
          <h3 className="text-base font-bold text-slate-900">
            Recommended Practice Queue
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {unattemptedTopics.slice(0, 3).map((item) => (
            <div
              key={item.topicId}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-[#7e93c8] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-[#5569a3] uppercase">{item.subjectName}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-1 mb-2 line-clamp-1">{item.topicTitle}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => startQuiz(item.topicId, 'practice')}
                  className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-[#edf0f9] hover:bg-[#e1e5f5] rounded-lg transition-colors"
                >
                  Practice
                </button>
                <button
                  onClick={() => startQuiz(item.topicId, 'test')}
                  className="flex-1 py-1.5 text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] rounded-lg transition-colors"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: COMPREHENSIVE QUIZ ATTEMPTS HISTORY */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#7e93c8]" />
              <span>Quiz Attempt History ({classAttempts.length})</span>
            </h3>
            <span className="text-xs text-slate-500">Tracked locally in your browser storage</span>
          </div>

          {classAttempts.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your quiz history?')) {
                  clearHistory();
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {classAttempts.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            No quiz attempts recorded yet for Class {selectedClass}. Take a quiz to start tracking your performance!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-3">Subject & Topic</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Percentage</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classAttempts.map((attempt) => (
                  <tr key={attempt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{attempt.topicTitle}</div>
                      <div className="text-[11px] text-slate-500">{attempt.subjectName}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800 tabular-nums">
                      {attempt.score} / {attempt.totalQuestions}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold tabular-nums ${
                          attempt.percentage >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : attempt.percentage >= 60
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {attempt.percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {formatDate(attempt.date)}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startQuiz(attempt.topicId, 'practice')}
                          className="px-2.5 py-1 rounded text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold transition-colors"
                        >
                          Practice
                        </button>
                        <button
                          onClick={() => startQuiz(attempt.topicId, 'test')}
                          className="px-2.5 py-1 rounded text-white bg-[#7e93c8] hover:bg-[#7286bc] font-semibold transition-colors"
                        >
                          Retake
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
