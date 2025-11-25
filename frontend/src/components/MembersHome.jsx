import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { 
  Layers, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Bell, 
  Search, 
  UploadCloud, 
  Image as ImageIcon,
  Trophy,
  Target,
  ChevronRight,
  MoreHorizontal,
  FileText,
  Menu, 
  X,
  LogOut,
  Zap
} from 'lucide-react';

// --- Sub-components ---

// 1. Task Card
const TaskCard = ({ title, due, priority, status }) => {
  const getPriorityColor = (p) => {
    if (p === 'High') return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (p === 'Medium') return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
  };

  return (
    <div className="group bg-slate-900/50 hover:bg-slate-800/50 border border-white/5 hover:border-indigo-500/30 rounded-xl p-4 transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(priority)}`}>
          {priority}
        </span>
        <button className="text-slate-500 hover:text-white transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <h4 className="font-semibold text-slate-200 mb-2 group-hover:text-indigo-400 transition-colors">{title}</h4>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Clock size={12} /> {due}</span>
        {status === 'In Review' && <span className="text-indigo-400">In Review</span>}
      </div>
    </div>
  );
};

// 2. Chat Message Row
const ChatRow = ({ user, message, time, online }) => (
  <div className="flex gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
    <div className="relative">
      <img src={`https://i.pravatar.cc/150?u=${user}`} alt={user} className="w-10 h-10 rounded-full bg-slate-800 border border-white/10" />
      {online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline mb-0.5">
        <span className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{user}</span>
        <span className="text-[10px] text-slate-500">{time}</span>
      </div>
      <p className="text-xs text-slate-400 truncate">{message}</p>
    </div>
  </div>
);

// --- Main Dashboard ---
export default function MemberDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('mytasks');
  const [isUploading, setIsUploading] = useState(false);

  // Mock Drop Handler
  const handleDrop = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex overflow-hidden selection:bg-teal-500 selection:text-white">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
      </div>

      {/* --- Sidebar --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/90 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-lg flex items-center justify-center">
              <Layers size={18} className="text-white" />
            </div>
            <span className="titles text-xl font-bold tracking-tight">Super<span className="text-teal-400">Vise</span></span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {[
              { id: 'mytasks', icon: CheckCircle2, label: 'My Tasks' },
              { id: 'performance', icon: Trophy, label: 'My Performance' },
              { id: 'files', icon: FileText, label: 'Resources' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={activeTab === item.id ? 'text-teal-400' : 'text-slate-500 group-hover:text-white transition-colors'} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-teal-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
              </button>
            ))}
            <button
                key='team'
                onClick={() => setActiveTab('team')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                  activeTab === 'team'
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Link to='/chat' className="flex items-center gap-3">
                  <MessageSquare size={20} className={activeTab === 'team' ? 'text-teal-400' : 'text-slate-500 group-hover:text-white transition-colors'} />
                  <span className="text-sm font-medium">Team Chat</span>
                </Link>
                {'5' && (
                  <span className="bg-teal-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">5</span>
                )}
              </button>
          </nav>

          {/* User Profile Snippet */}
          <div className="mt-auto pt-6 border-t border-white/5">
             <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-white/5">
                <img src="https://i.pravatar.cc/150?u=dev" alt="User" className="w-9 h-9 rounded-full border border-teal-500/30" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">Sarah Dev</p>
                  <p className="text-xs text-teal-400">Level 12 Member</p>
                </div>
                <button className="text-slate-500 hover:text-red-400 transition-colors">
                  <LogOut size={18} />
                </button>
             </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 relative z-10 overflow-y-auto h-screen">
        
        {/* Header */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-slate-400 hover:text-white">
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            <div>
              <h1 className="text-xl font-bold hidden sm:block">Welcome back, Sarah! 👋</h1>
              <p className="text-xs text-slate-400 hidden sm:block">You have 3 tasks pending today.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Gamification Badge */}
            <div className="hidden md:flex items-center gap-3 bg-slate-900 border border-white/10 rounded-full px-4 py-1.5">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-amber-100">1,240 XP</span>
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <span className="text-xs text-slate-400">Rank #3</span>
            </div>

            <button className="p-2.5 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 max-w-7xl mx-auto space-y-6">
          
          {/* Top Section: Active Focus & Proof Upload */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Current Focus Card - Takes 2/3 */}
            <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-teal-500/20 rounded-2xl p-8 shadow-2xl shadow-teal-900/10">
              <div className="absolute top-0 right-0 p-32 bg-teal-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-bold rounded-full border border-teal-500/20 animate-pulse">
                    IN PROGRESS
                  </span>
                  <span className="text-slate-400 text-xs font-mono">ID: #8492</span>
                </div>

                <h2 className="text-3xl font-bold mb-4">Integrate Stripe Payment Gateway</h2>
                <p className="text-slate-400 mb-8 max-w-xl">
                  Implement the new checkout flow using Stripe Elements. Ensure 3D Secure validation is handled correctly for EU customers.
                </p>

                {/* Proof Upload Area */}
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group ${
                    isUploading 
                      ? 'border-teal-500 bg-teal-500/10' 
                      : 'border-slate-700 bg-slate-950/30 hover:border-teal-500/50 hover:bg-slate-950/50'
                  }`}
                >
                  <div className={`p-4 rounded-full bg-slate-800 mb-4 transition-transform duration-300 ${isUploading ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {isUploading ? <CheckCircle2 className="text-teal-400" size={32} /> : <UploadCloud className="text-teal-400" size={32} />}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {isUploading ? 'Uploading Proof...' : 'Upload Proof of Work'}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Drag & drop screenshots or screen recordings here to complete task.
                  </p>
                </div>
              </div>
            </div>

            {/* Gamification / Stats - Takes 1/3 */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Progress Card */}
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Target size={20} className="text-teal-400" />
                  Daily Goals
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Tasks Completed</span>
                      <span className="text-white font-bold">4/5</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 w-[80%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Efficiency Rate</span>
                      <span className="text-white font-bold">92%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[92%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Up List (Mini) */}
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Up Next</h3>
                  <button className="text-xs text-teal-400 hover:text-teal-300">View All</button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">Fix Login Bug</p>
                      <p className="text-[10px] text-slate-500">Due Today</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">Update API Keys</p>
                      <p className="text-[10px] text-slate-500">Due Tomorrow</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Task List & Chat */}
          <div className="grid lg:grid-cols-3 gap-6 h-full">
            
            {/* Task List - 2/3 */}
            <div className="lg:col-span-2 bg-slate-900/50 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex gap-4 border-b border-white/10">
                   {['All Tasks', 'Pending', 'Completed'].map(tab => (
                     <button key={tab} className="pb-2 text-sm font-medium text-slate-400 hover:text-white hover:border-b-2 hover:border-teal-500 transition-all">
                       {tab}
                     </button>
                   ))}
                 </div>
                 <div className="flex gap-2">
                   <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white"><Search size={16} /></button>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <TaskCard title="Refactor Auth Components" due="2 days left" priority="Medium" status="Pending" />
                <TaskCard title="Optimize Database Queries" due="5 hours left" priority="High" status="Pending" />
                <TaskCard title="Update Documentation" due="1 week left" priority="Low" status="Pending" />
                <TaskCard title="Landing Page Animation" due="Yesterday" priority="Medium" status="In Review" />
              </div>
            </div>

            {/* Team Chat - 1/3 */}
            <div className="lg:col-span-1 bg-slate-900/50 border border-white/5 rounded-2xl p-0 flex flex-col overflow-hidden h-[400px] lg:h-auto">
              <div className="p-4 border-b border-white/5 bg-slate-900/80 backdrop-blur flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                  <MessageSquare size={18} className="text-teal-400" /> Team Chat
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">3 Online</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                <ChatRow user="Alex Admin" message="Great job on the API fix @Sarah!" time="10:42 AM" online={true} />
                <ChatRow user="John Backend" message="Can someone review my PR?" time="11:05 AM" online={false} />
                <ChatRow user="Emily Design" message="New assets are in Figma." time="11:30 AM" online={true} />
                <ChatRow user="Sarah Dev" message="On it! Checking now." time="11:32 AM" online={true} />
                <ChatRow user="Mike Intern" message="How do I restart the server?" time="12:15 PM" online={false} />
              </div>

              <div className="p-3 border-t border-white/5 bg-slate-900">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-colors"
                />
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}