import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Layers, 
  Zap, 
  MessageSquare, 
  Image as ImageIcon, 
  Terminal, 
  ArrowRight, 
  Menu, 
  X,
  ShieldCheck,
  Cpu,
  Trophy
} from 'lucide-react';

// --- Utility: Scroll Reveal Animation Component ---
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Main Application Component ---
export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('creator'); // 'creator' or 'member'
  const [scrolled, setScrolled] = useState(false);

  // Handle Navbar Background on Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[800px] h-[400px] bg-violet-900/10 rounded-full blur-[120px]"></div>
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- Navbar --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Layers size={18} className="text-white" />
            </div>
            <span className="titles text-xl font-bold tracking-tight">Super<span className="text-indigo-400">Vise</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToSection('roles')} className="hover:text-white transition-colors">Roles</button>
            <button onClick={() => scrollToSection('analytics')} className="hover:text-white transition-colors">Analytics</button>
            <button className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all">Log In</button>
            <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all shadow-lg shadow-indigo-500/20">Get Started</button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-4 md:hidden">
            <button onClick={() => scrollToSection('features')} className="text-left text-slate-300 hover:text-white">Features</button>
            <button onClick={() => scrollToSection('roles')} className="text-left text-slate-300 hover:text-white">Roles</button>
            <button className="text-left text-indigo-400">Sign Up</button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              MCP Integration Live
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              Manage Tasks. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400">
                Prove Success.
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              The only project management tool where AI assigns the work, members prove it with visuals, and analytics happen automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 group">
                Start Tracking Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all backdrop-blur-sm">
                View Demo
              </button>
            </div>
          </Reveal>

          <Reveal delay={200} className="relative hidden lg:block">
            {/* Abstract Hero Visual */}
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-teal-600 rounded-3xl opacity-20 rotate-6 transform scale-95 blur-xl"></div>
              <div className="relative w-full h-full bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                {/* Mock UI Header */}
                <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <div className="ml-auto w-24 h-2 bg-white/10 rounded-full"></div>
                </div>
                {/* Mock UI Body */}
                <div className="p-6 flex-1 relative">
                  <div className="absolute top-6 right-6 px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/20">On Track</div>
                  <div className="space-y-4">
                    <div className="w-1/2 h-8 bg-white/10 rounded-lg animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-white/5 rounded-lg"></div>
                    <div className="w-2/3 h-4 bg-white/5 rounded-lg"></div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute bottom-8 left-8 right-8 p-4 bg-slate-800/80 backdrop-blur-md rounded-xl border border-white/10 transform translate-y-4 transition-transform hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <Terminal size={20} />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="text-xs text-indigo-300 font-mono">MCP Protocol Active</div>
                        <div className="text-sm text-slate-200">New task assigned to <span className="text-white font-bold">@Sarah</span>: Backend API optimization.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Features Bento Grid --- */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Everything you need to <br/>ship faster.</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Feature 1: Large - Analytics */}
            <Reveal className="md:col-span-2 row-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-sm group hover:border-indigo-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 text-indigo-400">
                    <BarChart3 />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Auto-Pilot Analytics</h3>
                  <p className="text-slate-400 max-w-sm">Performance metrics update automatically as tasks move. No manual spreadsheets required.</p>
                </div>
                {/* Abstract Chart Graphic */}
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 opacity-50">
                   <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                     <path d="M0 80 Q 50 80 70 50 T 150 30 T 200 10" fill="none" stroke="url(#chartGradient)" strokeWidth="4" />
                     <path d="M0 80 L 200 80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                     <defs>
                       <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                         <stop offset="0%" stopColor="#6366f1" />
                         <stop offset="100%" stopColor="#2dd4bf" />
                       </linearGradient>
                     </defs>
                   </svg>
                </div>
              </div>
            </Reveal>

            {/* Feature 2: MCP */}
            <Reveal delay={100} className="md:col-span-1 row-span-1 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-8 flex flex-col justify-between group hover:border-teal-500/50 transition-colors relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-500/20 blur-3xl rounded-full"></div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 text-teal-400">
                  <Cpu />
                </div>
                <h3 className="text-2xl font-bold mb-2">MCP Tools</h3>
                <p className="text-slate-400 text-sm">Assign tasks via command line or AI. Efficiently route work to members.</p>
              </div>
              <div className="mt-4 p-3 bg-black/40 rounded-lg font-mono text-xs text-green-400 border border-white/5">
                $ mcp assign --user=dev1 --priority=high
              </div>
            </Reveal>

            {/* Feature 3: Proof */}
            <Reveal delay={200} className="md:col-span-1 row-span-1 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-8 flex flex-col justify-between group hover:border-pink-500/50 transition-colors">
              <div>
                 <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 text-pink-400">
                  <ImageIcon />
                </div>
                <h3 className="text-2xl font-bold mb-2">Visual Proof</h3>
                <p className="text-slate-400 text-sm">Don't just mark it done. Upload a snapshot as proof to complete the cycle.</p>
              </div>
              <div className="flex -space-x-3 mt-4">
                 <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700"></div>
                 <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-600 flex items-center justify-center text-xs">+3</div>
              </div>
            </Reveal>

            {/* Feature 4: Messaging */}
            <Reveal delay={300} className="md:col-span-2 row-span-1 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-8 flex flex-col relative overflow-hidden group hover:border-violet-500/50 transition-colors">
              <div className="z-10">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 text-violet-400">
                  <MessageSquare />
                </div>
                <h3 className="text-2xl font-bold mb-2">Instant Collaboration</h3>
                <p className="text-slate-400">Seamless messaging between Project Creators and Members.</p>
              </div>
              
              {/* Chat UI Mock */}
              <div className="absolute right-8 top-8 bottom-8 w-64 flex flex-col gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="self-end bg-indigo-600 p-3 rounded-l-xl rounded-tr-xl text-xs shadow-lg">
                  Is the landing page deployment ready?
                </div>
                <div className="self-start bg-slate-700 p-3 rounded-r-xl rounded-tl-xl text-xs shadow-lg">
                  Yes, uploading proof now! 📸
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- Role Switcher Interactive Section --- */}
      <section id="roles" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored Experience</h2>
              <p className="text-slate-400">Two distinct views optimized for your role.</p>
            </div>
            
            <div className="flex justify-center mb-12">
              <div className="p-1 bg-slate-800/80 rounded-full flex gap-1 border border-white/5">
                <button 
                  onClick={() => setActiveRole('creator')}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeRole === 'creator' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  Project Creator
                </button>
                <button 
                  onClick={() => setActiveRole('member')}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeRole === 'member' ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  Member
                </button>
              </div>
            </div>

            <div className="relative min-h-[400px]">
              {/* Creator Card */}
              <div className={`absolute inset-0 transition-all duration-500 transform ${activeRole === 'creator' ? 'opacity-100 translate-x-0 scale-100 z-10' : 'opacity-0 -translate-x-20 scale-95 z-0'}`}>
                <div className="bg-slate-950 border border-indigo-500/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-indigo-900/20">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400"><ShieldCheck size={32} /></div>
                    <div>
                      <h3 className="text-2xl font-bold">Admin Command Center</h3>
                      <p className="text-slate-400">Total control over the project lifecycle.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <ul className="space-y-4">
                      {['CRUD Members & Permissions', 'Assign Tasks via MCP or UI', 'Broadcast Messages to Team', 'View Real-time Performance Analytics'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle2 size={18} className="text-indigo-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-slate-900 rounded-xl p-6 border border-white/5 font-mono text-xs text-slate-400">
                      <div className="flex justify-between mb-4 border-b border-white/5 pb-2">
                        <span>Team Performance</span>
                        <span className="text-green-400">+12%</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1"><span>@Alex</span> <span>92/100</span></div>
                          <div className="w-full h-1 bg-slate-800 rounded-full"><div className="w-[92%] h-full bg-indigo-500 rounded-full"></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1"><span>@Sam</span> <span>85/100</span></div>
                          <div className="w-full h-1 bg-slate-800 rounded-full"><div className="w-[85%] h-full bg-purple-500 rounded-full"></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Member Card */}
              <div className={`absolute inset-0 transition-all duration-500 transform ${activeRole === 'member' ? 'opacity-100 translate-x-0 scale-100 z-10' : 'opacity-0 translate-x-20 scale-95 z-0'}`}>
                <div className="bg-slate-950 border border-teal-500/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-teal-900/20">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-teal-500/20 rounded-xl text-teal-400"><Users size={32} /></div>
                    <div>
                      <h3 className="text-2xl font-bold">Execution Dashboard</h3>
                      <p className="text-slate-400">Focus on what matters: Getting things done.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                     <ul className="space-y-4">
                      {['Receive & Organize Tasks', 'Peer-to-Peer Messaging', 'Upload "Task Complete" Proof', 'Track Personal Progress'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle2 size={18} className="text-teal-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-slate-900 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center text-center">
                       <div className="w-full aspect-video bg-slate-800 rounded-lg mb-3 flex items-center justify-center border-2 border-dashed border-slate-600 cursor-pointer hover:border-teal-500 transition-colors group">
                          <div className="text-slate-500 group-hover:text-teal-400 transition-colors flex flex-col items-center">
                            <ImageIcon size={24} className="mb-2"/>
                            <span className="text-xs">Upload Proof of Work</span>
                          </div>
                       </div>
                       <button className="w-full py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-xs font-bold text-white transition-colors">
                         Submit Task
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Analytics Strip --- */}
      <section id="analytics" className="py-20 bg-gradient-to-r from-indigo-900/20 to-teal-900/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24">
              {[
                { label: 'Tasks Automated', value: '14k+' },
                { label: 'Teams Onboarded', value: '850+' },
                { label: 'Completion Rate', value: '99.9%' }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</span>
                  <span className="text-slate-400 uppercase tracking-widest text-xs font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- CTA / Footer --- */}
      <footer className="relative pt-24 pb-12 px-6 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to organize the chaos?</h2>
            <p className="text-slate-400 text-lg mb-10">Join the new standard of project tracking. Built for speed, powered by AI.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
                Get Started Now
              </button>
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors">
                Contact Sales
              </button>
            </div>
          </Reveal>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
               <Layers size={16} />
               <span>© 2024 ProjectTracker Inc.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}