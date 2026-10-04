export type ClassLevel = '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: number; // index in options (0, 1, 2, 3)
  explanation: string;
  difficulty: Difficulty;
  hint?: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  keyConcepts: string[];
  summary: string;
  formulasOrFacts?: string[];
  questions: Question[];
}

export interface Subject {
  id: string;
  name: string;
  iconName: string; // lucide icon identifier
  color: string;
  description: string;
  topics: Topic[];
}

export interface ClassCurriculum {
  classLevel: ClassLevel;
  title: string;
  subtitle: string;
  subjects: Subject[];
}

export interface QuizAttempt {
  id: string;
  classLevel: ClassLevel;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string; // ISO string
  timeSpentSeconds: number;
  userAnswers: { [questionId: string]: number }; // questionId -> selectedOptionIndex
  isCompleted: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  selectedClass: ClassLevel;
  studyGoalMinutesPerDay: number;
  streakDays: number;
  lastActiveDate: string;
  bookmarkedTopicIds: string[];
}

export type ActiveTab = 'learn' | 'practice' | 'test' | 'improve';
