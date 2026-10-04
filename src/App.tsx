import React from 'react';
import { EduQuestProvider, useEduQuest } from './context/EduQuestContext';
import { Navbar } from './components/Navbar';
import { ClassSelector } from './components/ClassSelector';
import { HeroProgress } from './components/HeroProgress';
import { LearnView } from './components/LearnView';
import { PracticeView } from './components/PracticeView';
import { TestView } from './components/TestView';
import { ImproveView } from './components/ImproveView';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab, activeSession } = useEduQuest();

  // Hide the hero banner if the user is in the middle of answering a quiz/practice question
  // so they have maximum focus on the question content
  const isInActiveQuizSession = activeSession !== null && !activeSession.isSubmitted;

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4fa] text-[#1e2540]">
      {/* Top Bar Contract Navigation */}
      <Navbar />

      {/* Class Level Selector Bar (Controls entire curriculum) */}
      <ClassSelector />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Polished Hero Progress Section (Avatar initials & text removed per prompt) */}
        {!isInActiveQuizSession && <HeroProgress />}

        {/* Dynamic Views: Learn, Practice, Test, Improve */}
        <section aria-label="Active Learning Workspace">
          {activeTab === 'learn' && <LearnView />}
          {activeTab === 'practice' && <PracticeView />}
          {activeTab === 'test' && <TestView />}
          {activeTab === 'improve' && <ImproveView />}
        </section>
      </main>

      {/* Auth Modal for Sign In / Sign Up with LocalStorage Persistence */}
      <AuthModal />

      {/* Clean Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <EduQuestProvider>
      <AppContent />
    </EduQuestProvider>
  );
}
