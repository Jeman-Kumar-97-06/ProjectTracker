import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { 
  Layers, 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  MoreVertical,
  ArrowUpRight,
  TrendingUp,
  Terminal,
  Cpu,
  Zap,
  MessageSquare,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// --- Sub-components ---

// 1. Stat Card
const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="relative group overflow-hidden bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300">
    <div className={`absolute top-0 right-0 p-24 rounded-full bg-${color}-500/10 blur-[60px] -mr-10 -mt-10 transition-all group-hover:bg-${color}-500/20`}></div>
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
        <div className="flex items-center gap-1 text-xs font-medium">
          <span className="text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
            <TrendingUp size={12} className="mr-1" /> {change}
          </span>
          <span className="text-slate-500 ml-1">vs last week</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl bg-slate-800 text-${color}-400 border border-white/5 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

// 2. Team Member Row
const TeamRow = ({ name, role, tasksDone, efficiency, status, avatar }) => {
  const getStatusColor = (s) => {
    if (s === 'Online') return 'bg-emerald-500';
    if (s === 'Busy') return 'bg-amber-500';
    return 'bg-slate-500';
  };

  return (
    <div className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
      <div className="flex items-center gap-4 min-w-[200px]">
        <div className="relative">
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${getStatusColor(status)}`}></div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-200">{name}</h4>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>

      <div className="hidden md:block text-right min-w-[100px]">
        <div className="text-xs text-slate-400 mb-1">Tasks Done</div>
        <div className="text-sm font-mono text-white">{tasksDone}</div>
      </div>

      <div className="flex-1 px-8 hidden sm:block">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-400">Efficiency Score</span>
          <span className={`font-bold ${efficiency >= 90 ? 'text-emerald-400' : efficiency >= 75 ? 'text-indigo-400' : 'text-amber-400'}`}>
            {efficiency}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${efficiency >= 90 ? 'bg-emerald-500' : efficiency >= 75 ? 'bg-indigo-500' : 'bg-amber-500'}`} 
            style={{ width: `${efficiency}%` }}
          ></div>
        </div>
      </div>

      <button className="p-2 text-slate-500 hover:text-white transition-colors">
        <MoreVertical size={16} />
      </button>
    </div>
  );
};

// 3. Main Dashboard Component
export default function CreatorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock Data
  const teamMembers = [
    { name: "Sarah Connor", role: "Frontend Dev", tasksDone: 142, efficiency: 94, status: "Online", avatar: "https://i.pravatar.cc/150?u=1" },
    { name: "John Smith", role: "Backend Lead", tasksDone: 89, efficiency: 78, status: "Busy", avatar: "https://i.pravatar.cc/150?u=2" },
    { name: "Emily Chen", role: "UI Designer", tasksDone: 64, efficiency: 91, status: "Online", avatar: "https://i.pravatar.cc/150?u=3" },
    { name: "Mike Ross", role: "Intern", tasksDone: 23, efficiency: 45, status: "Offline", avatar: "https://i.pravatar.cc/150?u=4" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-900/10 rounded-full blur-[100px]"></div>
      </div>

      {/* --- Sidebar --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/90 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          {/* Brand */}
          <Link to='/db' className="flex items-center gap-3 mb-10 px-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-lg flex items-center justify-center">
              <Layers size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Project<span className="text-indigo-400">Tracker</span></span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
              { id: 'team', icon: Users, label: 'Team Members' },
              { id: 'tasks', icon: CheckSquare, label: 'All Tasks' },
              { id: 'mcp', icon: Terminal, label: 'MCP Logs' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={activeTab === item.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white transition-colors'} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
              </button>
            ))}
            <Link to='/chat'
                key='chat'
                onClick={() => setActiveTab('chat')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                  activeTab === 'chat' 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} className={activeTab === 'chat' ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white transition-colors'} />
                  <span className="text-sm font-medium">Team Chat</span>
                </div>
                {'3' && (
                  <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
                )}
              </Link>
          </nav>

          {/* User Profile Snippet */}
          <div className="mt-auto pt-6 border-t border-white/5">
             <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-white/5">
                <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-9 h-9 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">Alex Admin</p>
                  <p className="text-xs text-indigo-400">Creator</p>
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
            <h1 className="text-xl font-bold hidden sm:block">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-900 border border-white/10 rounded-full px-4 py-2 w-64 focus-within:border-indigo-500/50 transition-colors">
              <Search size={16} className="text-slate-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search tasks, members..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
              />
            </div>
            <button className="p-2.5 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            </button>
            <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all shadow-lg shadow-indigo-500/20">
              <Plus size={18} />
              <span>New Task</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 max-w-7xl mx-auto space-y-6">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Tasks" value="1,248" change="+12%" icon={CheckSquare} color="indigo" />
            <StatCard title="Active Members" value="24" change="+2" icon={Users} color="teal" />
            <StatCard title="Completion Rate" value="94.2%" change="+5%" icon={Zap} color="emerald" />
            <StatCard title="MCP Actions" value="850" change="+28%" icon={Cpu} color="violet" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 h-full">
            
            {/* Team Performance - Takes up 2/3 space */}
            <div className="lg:col-span-2 bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold">Team Performance</h2>
                  <p className="text-sm text-slate-400">Real-time efficiency tracking</p>
                </div>
                <button className="text-sm text-indigo-400 font-medium hover:text-indigo-300 flex items-center gap-1">
                  Manage Members <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="space-y-2">
                {teamMembers.map((member, i) => (
                  <TeamRow key={i} {...member} />
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/5 text-center">
                 <button className="text-sm text-slate-500 hover:text-white transition-colors">View All Members</button>
              </div>
            </div>

            {/* MCP Terminal - Takes up 1/3 space */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              
              {/* Terminal Widget */}
              <div className="flex-1 bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
                <div className="bg-slate-900/80 px-4 py-3 flex items-center justify-between border-b border-white/5">
                   <div className="flex items-center gap-2">
                     <Terminal size={14} className="text-indigo-400" />
                     <span className="text-xs font-mono font-bold text-slate-300">MCP-Agent-v2</span>
                   </div>
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                   </div>
                </div>
                <div className="p-4 font-mono text-xs space-y-3 overflow-y-auto max-h-[300px] text-slate-300">
                  <div className="opacity-50">
                    <span className="text-slate-500">[10:42:01]</span> System initialized.
                  </div>
                  <div>
                    <span className="text-slate-500">[10:45:12]</span> <span className="text-indigo-400">Analyzed</span> workload distribution.
                  </div>
                  <div>
                     <span className="text-slate-500">[10:45:15]</span> <span className="text-emerald-400">Assigned</span> task <span className="text-white underline decoration-slate-700">#4420</span> to <span className="text-amber-300">@Sarah</span>.
                     <div className="pl-4 border-l border-white/10 mt-1 text-slate-500 italic">"Reason: High matching skill score for React."</div>
                  </div>
                   <div>
                    <span className="text-slate-500">[11:02:44]</span> <span className="text-pink-400">Alert:</span> @Mike performance dip detected. 
                  </div>
                   <div className="animate-pulse">
                    <span className="text-slate-500">[11:05:00]</span> <span className="text-indigo-400">Processing</span> next batch...<span className="inline-block w-2 h-4 bg-indigo-500 ml-1 align-middle"></span>
                  </div>
                </div>
              </div>

              {/* Quick Action Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-indigo-900/40 group cursor-pointer hover:shadow-indigo-900/60 transition-all">
                <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4 text-white">
                     <Users size={20} />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Add New Member</h3>
                  <p className="text-indigo-100 text-sm mb-4">Invite collaborators to the project via email or link.</p>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    Invite Now <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}