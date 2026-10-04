import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ClassLevel,
  QuizAttempt,
  UserProfile,
  ActiveTab,
  Topic,
  Subject
} from '../types';
import {
  CURRICULUM_DATA,
  findTopic,
  getAllSubjectsForClass
} from '../data/curriculum';

interface ActiveQuizSession {
  topic: Topic;
  subject: Subject;
  mode: 'test' | 'practice';
  currentQuestionIndex: number;
  selectedAnswers: { [questionId: string]: number };
  isSubmitted: boolean;
  timeSpentSeconds: number;
  timeLimitSeconds: number; // e.g. 300 for 5m, 0 for untimed
  lastAttemptResult: QuizAttempt | null;
}

interface EduQuestContextType {
  selectedClass: ClassLevel;
  setSelectedClass: (c: ClassLevel) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedSubjectFilter: string;
  setSelectedSubjectFilter: (subId: string) => void;

  // User & Auth
  currentUser: UserProfile | null;
  signIn: (email: string, name?: string) => { success: boolean; error?: string };
  signUp: (email: string, name: string) => { success: boolean; error?: string };
  signOut: () => void;
  updateProfileGoal: (minutes: number) => void;

  // Bookmarks
  bookmarkedTopicIds: string[];
  toggleBookmark: (topicId: string) => void;
  isBookmarked: (topicId: string) => boolean;

  // Quiz / Test / Practice Sessions
  activeSession: ActiveQuizSession | null;
  startQuiz: (topicId: string, mode: 'test' | 'practice', customClass?: ClassLevel) => void;
  answerQuestion: (questionId: string, optionIndex: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  submitQuiz: () => void;
  retryQuiz: () => void;
  exitQuiz: () => void;

  // Quiz History & Progress
  quizHistory: QuizAttempt[];
  clearHistory: () => void;

  // Auth Modal
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;

  // Quick navigation
  viewTopicInLearn: (topicId: string, customClass?: ClassLevel) => void;
  selectedLearnTopicId: string | null;
  setSelectedLearnTopicId: (id: string | null) => void;
}

const EduQuestContext = createContext<EduQuestContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'eduquest_user_profile',
  CLASS: 'eduquest_selected_class',
  HISTORY: 'eduquest_quiz_history',
  BOOKMARKS: 'eduquest_bookmarks'
};

// Default sample demo user with some initial historical quiz attempts so Improve & Progress look rich immediately
const DEFAULT_DEMO_USER: UserProfile = {
  id: 'demo-student-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@eduquest.demo',
  selectedClass: '12',
  studyGoalMinutesPerDay: 45,
  streakDays: 4,
  lastActiveDate: new Date().toISOString(),
  bookmarkedTopicIds: ['c12-pol-cold-war', 'c12-math-integrals']
};

const INITIAL_HISTORY: QuizAttempt[] = [
  {
    id: 'attempt-init-1',
    classLevel: '12',
    subjectId: 'c12-pol-sci',
    subjectName: 'Political Science',
    topicId: 'c12-pol-cold-war',
    topicTitle: 'Cold War Era',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    timeSpentSeconds: 195,
    userAnswers: {
      'c12-cw-q1': 1,
      'c12-cw-q2': 2,
      'c12-cw-q3': 1,
      'c12-cw-q4': 2,
      'c12-cw-q5': 0 // missed
    },
    isCompleted: true
  },
  {
    id: 'attempt-init-2',
    classLevel: '12',
    subjectId: 'c12-pol-sci',
    subjectName: 'Political Science',
    topicId: 'c12-pol-south-asia',
    topicTitle: 'Contemporary South Asia',
    score: 1,
    totalQuestions: 3,
    percentage: 33, // weak topic for Improve recommendations
    date: new Date(Date.now() - 86400000).toISOString(),
    timeSpentSeconds: 120,
    userAnswers: {
      'c12-sa-q1': 0, // missed
      'c12-sa-q2': 2, // correct
      'c12-sa-q3': 0  // missed
    },
    isCompleted: true
  },
  {
    id: 'attempt-init-3',
    classLevel: '12',
    subjectId: 'c12-math',
    subjectName: 'Mathematics',
    topicId: 'c12-math-integrals',
    topicTitle: 'Integrals and Applications',
    score: 2,
    totalQuestions: 3,
    percentage: 67, // below 70% threshold
    date: new Date(Date.now() - 3600000 * 5).toISOString(),
    timeSpentSeconds: 240,
    userAnswers: {
      'c12-int-q1': 2,
      'c12-int-q2': 0,
      'c12-int-q3': 0 // missed
    },
    isCompleted: true
  }
];

export const EduQuestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Class level state
  const [selectedClass, setSelectedClassState] = useState<ClassLevel>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLASS);
      if (saved && ['6', '7', '8', '9', '10', '11', '12'].includes(saved)) {
        return saved as ClassLevel;
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return '12';
  });

  const setSelectedClass = (c: ClassLevel) => {
    setSelectedClassState(c);
    try {
      localStorage.setItem(STORAGE_KEYS.CLASS, c);
      if (currentUser) {
        const updated = { ...currentUser, selectedClass: c };
        setCurrentUser(updated);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
      }
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  };

  // 2. Navigation Tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('test');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedLearnTopicId, setSelectedLearnTopicId] = useState<string | null>(null);

  // 3. Current User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('User restore error:', e);
    }
    return DEFAULT_DEMO_USER;
  });

  // 4. Bookmarks
  const [bookmarkedTopicIds, setBookmarkedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Bookmark read error:', e);
    }
    return ['c12-pol-cold-war', 'c12-math-integrals'];
  });

  // 5. Quiz History
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('History read error:', e);
    }
    return INITIAL_HISTORY;
  });

  // 6. Active Quiz Session
  const [activeSession, setActiveSession] = useState<ActiveQuizSession | null>(null);

  // 7. Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Sync state to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.warn('User sync error:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(quizHistory));
    } catch (e) {
      console.warn('History sync error:', e);
    }
  }, [quizHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarkedTopicIds));
    } catch (e) {
      console.warn('Bookmark sync error:', e);
    }
  }, [bookmarkedTopicIds]);

  // Quiz timer ticker
  useEffect(() => {
    if (!activeSession || activeSession.isSubmitted) return;

    const timer = setInterval(() => {
      setActiveSession((prev) => {
        if (!prev || prev.isSubmitted) return prev;
        return {
          ...prev,
          timeSpentSeconds: prev.timeSpentSeconds + 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSession?.isSubmitted, activeSession?.topic?.id]);

  // Auth actions
  const signIn = (email: string, name?: string): { success: boolean; error?: string } => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return { success: false, error: 'Please enter your email address.' };
    }
    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      return { success: false, error: 'Please provide a valid email format (e.g. student@school.edu).' };
    }

    const userName = name?.trim() || trimmedEmail.split('@')[0].replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());

    const user: UserProfile = {
      id: 'usr_' + Date.now(),
      name: userName,
      email: trimmedEmail,
      selectedClass,
      studyGoalMinutesPerDay: 45,
      streakDays: (currentUser?.streakDays || 1) + 1,
      lastActiveDate: new Date().toISOString(),
      bookmarkedTopicIds
    };

    setCurrentUser(user);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signUp = (email: string, name: string): { success: boolean; error?: string } => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || trimmedName.length < 2) {
      return { success: false, error: 'Please enter your full name (minimum 2 characters).' };
    }
    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const user: UserProfile = {
      id: 'usr_' + Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      selectedClass,
      studyGoalMinutesPerDay: 45,
      streakDays: 1,
      lastActiveDate: new Date().toISOString(),
      bookmarkedTopicIds: []
    };

    setCurrentUser(user);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  const updateProfileGoal = (minutes: number) => {
    if (!currentUser) return;
    const updated = { ...currentUser, studyGoalMinutesPerDay: Math.max(15, minutes) };
    setCurrentUser(updated);
  };

  // Bookmark actions
  const toggleBookmark = (topicId: string) => {
    setBookmarkedTopicIds((prev) => {
      if (prev.includes(topicId)) {
        return prev.filter((id) => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const isBookmarked = (topicId: string) => bookmarkedTopicIds.includes(topicId);

  // Quiz / Practice actions
  const startQuiz = (topicId: string, mode: 'test' | 'practice', customClass?: ClassLevel) => {
    const targetClass = customClass || selectedClass;
    if (customClass && customClass !== selectedClass) {
      setSelectedClass(customClass);
    }

    const match = findTopic(targetClass, topicId);
    if (!match) {
      // Fallback: check other classes
      for (const c of CURRICULUM_DATA) {
        const found = findTopic(c.classLevel, topicId);
        if (found) {
          setSelectedClass(c.classLevel);
          setActiveSession({
            topic: found.topic,
            subject: found.subject,
            mode,
            currentQuestionIndex: 0,
            selectedAnswers: {},
            isSubmitted: false,
            timeSpentSeconds: 0,
            timeLimitSeconds: mode === 'test' ? 300 : 0,
            lastAttemptResult: null
          });
          return;
        }
      }
      return;
    }

    setActiveSession({
      topic: match.topic,
      subject: match.subject,
      mode,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isSubmitted: false,
      timeSpentSeconds: 0,
      timeLimitSeconds: mode === 'test' ? 300 : 0,
      lastAttemptResult: null
    });
  };

  const answerQuestion = (questionId: string, optionIndex: number) => {
    if (!activeSession || activeSession.isSubmitted) return;

    setActiveSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        selectedAnswers: {
          ...prev.selectedAnswers,
          [questionId]: optionIndex
        }
      };
    });
  };

  const nextQuestion = () => {
    if (!activeSession) return;
    if (activeSession.currentQuestionIndex < activeSession.topic.questions.length - 1) {
      setActiveSession((prev) => prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 } : null);
    }
  };

  const prevQuestion = () => {
    if (!activeSession) return;
    if (activeSession.currentQuestionIndex > 0) {
      setActiveSession((prev) => prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 } : null);
    }
  };

  const goToQuestion = (index: number) => {
    if (!activeSession) return;
    if (index >= 0 && index < activeSession.topic.questions.length) {
      setActiveSession((prev) => prev ? { ...prev, currentQuestionIndex: index } : null);
    }
  };

  const submitQuiz = () => {
    if (!activeSession || activeSession.isSubmitted) return;

    const questions = activeSession.topic.questions;
    let score = 0;

    questions.forEach((q) => {
      const selected = activeSession.selectedAnswers[q.id];
      if (selected !== undefined && selected === q.correctAnswer) {
        score += 1;
      }
    });

    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    const attempt: QuizAttempt = {
      id: 'attempt_' + Date.now(),
      classLevel: selectedClass,
      subjectId: activeSession.subject.id,
      subjectName: activeSession.subject.name,
      topicId: activeSession.topic.id,
      topicTitle: activeSession.topic.title,
      score,
      totalQuestions,
      percentage,
      date: new Date().toISOString(),
      timeSpentSeconds: activeSession.timeSpentSeconds,
      userAnswers: { ...activeSession.selectedAnswers },
      isCompleted: true
    };

    // Update history
    setQuizHistory((prev) => [attempt, ...prev]);

    // Update session state
    setActiveSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        isSubmitted: true,
        lastAttemptResult: attempt
      };
    });
  };

  const retryQuiz = () => {
    if (!activeSession) return;
    setActiveSession({
      ...activeSession,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isSubmitted: false,
      timeSpentSeconds: 0,
      lastAttemptResult: null
    });
  };

  const exitQuiz = () => {
    setActiveSession(null);
  };

  const clearHistory = () => {
    setQuizHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
    } catch (e) {
      console.warn(e);
    }
  };

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const viewTopicInLearn = (topicId: string, customClass?: ClassLevel) => {
    if (customClass && customClass !== selectedClass) {
      setSelectedClass(customClass);
    }
    setSelectedLearnTopicId(topicId);
    setActiveTab('learn');
    if (activeSession) {
      setActiveSession(null);
    }
  };

  return (
    <EduQuestContext.Provider
      value={{
        selectedClass,
        setSelectedClass,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedSubjectFilter,
        setSelectedSubjectFilter,
        currentUser,
        signIn,
        signUp,
        signOut,
        updateProfileGoal,
        bookmarkedTopicIds,
        toggleBookmark,
        isBookmarked,
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
        clearHistory,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        viewTopicInLearn,
        selectedLearnTopicId,
        setSelectedLearnTopicId
      }}
    >
      {children}
    </EduQuestContext.Provider>
  );
};

export const useEduQuest = (): EduQuestContextType => {
  const context = useContext(EduQuestContext);
  if (!context) {
    throw new Error('useEduQuest must be used within an EduQuestProvider');
  }
  return context;
};
