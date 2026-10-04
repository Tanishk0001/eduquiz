import React, { useState } from 'react';
import { useEduQuest } from '../context/EduQuestContext';
import { ClassLevel } from '../types';
import { X, Lock, Mail, User, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    signIn,
    signUp,
    selectedClass,
    setSelectedClass
  } = useEduQuest();

  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [chosenClass, setChosenClass] = useState<ClassLevel>(selectedClass);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'signin') {
      const res = signIn(email, name);
      if (!res.success) {
        setErrorMsg(res.error || 'Failed to sign in.');
      } else {
        setSuccessMsg('Signed in successfully! Session saved.');
        setTimeout(() => closeAuthModal(), 600);
      }
    } else {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      const res = signUp(email, name);
      if (!res.success) {
        setErrorMsg(res.error || 'Failed to create account.');
      } else {
        setSelectedClass(chosenClass);
        setSuccessMsg('Account created successfully! Session saved.');
        setTimeout(() => closeAuthModal(), 600);
      }
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('alex.rivera@eduquest.demo');
    setName('Alex Rivera');
    setPassword('••••••••');
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-[#7e93c8] uppercase tracking-wider mb-1">
            EduQuest Account
          </div>
          <h2
            className="text-xl sm:text-2xl font-bold text-slate-900"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {mode === 'signin' ? 'Welcome Back, Student' : 'Create Student Profile'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Demo persistence enabled via localStorage. All test scores, streaks, and progress remain saved across page refreshes.
          </p>
        </div>

        {/* Segmented Mode Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'signin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'signup'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Chen"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#7e93c8] focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@school.edu"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#7e93c8] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password (demo)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#7e93c8] focus:bg-white"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Your Class
              </label>
              <select
                value={chosenClass}
                onChange={(e) => setChosenClass(e.target.value as ClassLevel)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#7e93c8]"
              >
                {(['6', '7', '8', '9', '10', '11', '12'] as ClassLevel[]).map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Class {lvl}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#7e93c8] hover:bg-[#7286bc] active:bg-[#667bb0] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>{mode === 'signin' ? 'Sign In to EduQuest' : 'Create Account'}</span>
          </button>
        </form>

        {/* Quick Demo Pre-fill for instant testing */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="w-full py-2 px-3 bg-[#edf0f9] hover:bg-[#e1e5f5] text-[#34467d] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fill Demo Credentials (Alex Rivera)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
