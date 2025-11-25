import React, { useState, useRef } from 'react';
import { 
  Layers, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Github, 
  LayoutDashboard, 
  Users,
  CheckCircle2,
  Camera,
  Plus
} from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('creator'); // 'creator' | 'member'
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  // Mock submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* --- Background Ambience --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px]"></div>
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- Main Auth Card --- */}
      <div className="relative z-10 w-full max-w-[480px]">
        {/* Logo Header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 transform group-hover:rotate-12 transition-transform duration-300">
              <Layers size={22} className="text-white" />
            </div>
            <span className="titles text-2xl font-bold tracking-tight">Super<span className="text-indigo-400">Vise</span></span>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50 overflow-hidden relative">
           
           {/* Top Glow Line */}
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-slate-400 text-sm">
              {isLogin ? 'Enter your details to access your workspace.' : 'Choose your role and start collaborating.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* --- Signup Specifics: Role & Avatar --- */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${!isLogin ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
              
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-slate-950/50 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setRole('creator')}
                  className={`relative flex flex-col items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden ${role === 'creator' ? 'text-white bg-indigo-600 shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                >
                  <LayoutDashboard size={18} />
                  <span>Creator</span>
                  {role === 'creator' && <div className="absolute top-1 right-1"><CheckCircle2 size={10} className="text-indigo-200" /></div>}
                </button>
                <button
                  type="button"
                  onClick={() => setRole('member')}
                  className={`relative flex flex-col items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden ${role === 'member' ? 'text-white bg-teal-600 shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                >
                  <Users size={18} />
                  <span>Member</span>
                  {role === 'member' && <div className="absolute top-1 right-1"><CheckCircle2 size={10} className="text-teal-200" /></div>}
                </button>
              </div>

              {/* Profile Pic Uploader */}
              <div className="flex justify-center mb-6">
                <div 
                  onClick={handleFileClick}
                  className={`relative w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-all group overflow-hidden ${
                    profilePic 
                      ? 'border-transparent shadow-xl ring-2 ring-offset-2 ring-offset-slate-900' 
                      : 'border-slate-600 hover:border-indigo-400 bg-slate-950/50'
                  } ${profilePic && role === 'creator' ? 'ring-indigo-500' : ''} ${profilePic && role === 'member' ? 'ring-teal-500' : ''}`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                  
                  {profilePic ? (
                    <img src={profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-slate-500 group-hover:text-indigo-400 transition-colors">
                      <Camera size={20} className="mb-1" />
                      <span className="text-[10px] font-medium uppercase">Add Photo</span>
                    </div>
                  )}

                  {/* Add Button Badge */}
                  {!profilePic && (
                    <div className={`absolute bottom-0 right-0 p-1 rounded-full text-white shadow-sm transform translate-y-1/2 translate-x-1/2 border-2 border-slate-900 ${role === 'member' ? 'bg-teal-500' : 'bg-indigo-500'}`}>
                      <Plus size={12} />
                    </div>
                  )}
                  
                  {/* Overlay on Hover (if image exists) */}
                  {profilePic && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-medium text-white">Change</span>
                    </div>
                  )}
                </div>
              </div>
              
               {/* Name Input */}
              <div className="relative group mb-5">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                />
              </div>

            </div>

            {/* --- Common Inputs (Email/Pass) --- */}
            
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {/* --- Action Button --- */}
            <button 
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group ${
                !isLogin && role === 'member' 
                  ? 'bg-teal-600 hover:bg-teal-500 shadow-teal-900/20' 
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/20'
              } ${loading ? 'opacity-80 cursor-wait' : ''}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors">
                <Github size={18} />
                <span>GitHub</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-blue-500"></div>
                <span>Google</span>
              </button>
            </div>

          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-8 text-center text-sm text-slate-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-white font-medium hover:underline decoration-indigo-500 decoration-2 underline-offset-4 transition-all"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
        
        {/* Simple Footer Links */}
        <div className="flex justify-center gap-6 mt-8 text-xs text-slate-500">
           <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
           <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}