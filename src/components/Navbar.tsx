import React, { useState } from 'react';
import { useEduQuest } from '../context/EduQuestContext';
import { ActiveTab, ClassLevel } from '../types';
import {
  BookOpen,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  LogOut,
  User,
  Search,
  X,
  Menu,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedClass,
    setSelectedClass,
    currentUser,
    signOut,
    openAuthModal,
    searchQuery,
    setSearchQuery,
    activeSession,
    exitQuiz
  } = useEduQuest();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: CheckCircle },
    { id: 'test', label: 'Test', icon: HelpCircle },
    { id: 'improve', label: 'Improve', icon: TrendingUp },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    if (activeSession && !activeSession.isSubmitted) {
      if (window.confirm('You have an active quiz session. Do you want to leave it?')) {
        exitQuiz();
        setActiveTab(tab);
      }
    } else {
      if (activeSession) exitQuiz();
      setActiveTab(tab);
    }
    setIsMobileMenuOpen(false);
  };

  const handleClassChange = (c: ClassLevel) => {
    setSelectedClass(c);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#141b36] border-b border-[#232d56] text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ZONE 1: Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('test')}
              className="text-xl font-bold tracking-tight text-white hover:text-[#8497ce] transition-colors flex items-center gap-2 text-left"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              <span className="w-8 h-8 rounded-lg bg-[#232d56] border border-[#3b477b] flex items-center justify-center text-[#8497ce] font-bold text-lg">
                E
              </span>
              <span>EduQuest</span>
            </button>

            {/* Quick Class Pill for Mobile & Desktop context */}
            <div className="relative group">
              <button
                aria-label="Select Class"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-[#1e274b] hover:bg-[#283464] border border-[#2e3b72] rounded-md text-[#d5def8] transition-colors"
              >
                <span>Class {selectedClass}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8497ce]" />
              </button>
              <div className="hidden group-hover:block group-focus-within:block absolute left-0 top-full pt-1 z-50">
                <div className="bg-[#141b36] border border-[#2e3b72] rounded-lg shadow-xl p-1.5 w-36">
                  <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                    Select Class
                  </div>
                  {(['6', '7', '8', '9', '10', '11', '12'] as ClassLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => handleClassChange(lvl)}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md transition-colors flex items-center justify-between ${
                        selectedClass === lvl
                          ? 'bg-[#7e93c8] text-white font-semibold'
                          : 'text-slate-200 hover:bg-[#1e274b]'
                      }`}
                    >
                      <span>Class {lvl}</span>
                      {selectedClass === lvl && <span className="text-[10px]">●</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ZONE 2: 4 Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#222c54] text-white shadow-inner font-semibold border-b-2 border-[#7e93c8]'
                      : 'text-slate-300 hover:text-white hover:bg-[#1a2347]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#8497ce]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: Search & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input on Desktop */}
            <div className="relative hidden lg:block w-48 xl:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full bg-[#1b2347] border border-[#2e3b72] rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#7e93c8] focus:border-[#7e93c8] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-[#1e274b] rounded-md transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User Profile or Sign In CTA */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#1b2347] hover:bg-[#242e5a] border border-[#2e3b72] rounded-md text-xs font-medium text-white transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#8497ce]" />
                  <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-56 bg-[#141b36] border border-[#2e3b72] rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#232d56]">
                      <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                      <div className="text-[10px] text-[#8497ce] mt-1 font-medium">Class {selectedClass} Student</div>
                    </div>
                    <button
                      onClick={() => {
                        handleNavClick('improve');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-[#1e274b] flex items-center gap-2"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-[#8497ce]" />
                      <span>My Progress & Weak Topics</span>
                    </button>
                    <button
                      onClick={() => {
                        signOut();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-300 hover:bg-[#1e274b] flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] active:bg-[#667bb0] rounded-md transition-colors shadow-sm whitespace-nowrap"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-[#1e274b] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Row (Expandable) */}
        {isSearchOpen && (
          <div className="lg:hidden pb-3 pt-1 border-t border-[#232d56]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, questions, subjects..."
                className="w-full bg-[#1b2347] border border-[#2e3b72] rounded-md pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#7e93c8]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#232d56] space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#222c54] text-white font-semibold'
                      : 'text-slate-300 hover:bg-[#1a2347] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#8497ce]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
