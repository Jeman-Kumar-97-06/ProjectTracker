import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'; 
import { 
  Layers, 
  MessageSquare, 
  Hash, 
  Search, 
  Bell, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Send, 
  Image as ImageIcon,
  Menu,
  X,
  ChevronLeft,
  Users,
  Circle,
  LogOut,
  CheckCircle2,
  Trophy,
  FileText
} from 'lucide-react';

// --- Mock Data ---

const CHANNELS = [
  { id: 'general', name: 'general', unread: 0 },
  { id: 'dev-team', name: 'dev-team', unread: 3 },
  { id: 'design-critiques', name: 'design-critiques', unread: 0 },
  { id: 'random', name: 'random', unread: 0 },
  { id: 'announcements', name: 'announcements', unread: 1, locked: true },
];

const DIRECT_MESSAGES = [
  { id: 'u1', name: 'Alex Admin', status: 'online', avatar: 'https://i.pravatar.cc/150?u=admin' },
  { id: 'u2', name: 'Emily Design', status: 'busy', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 'u3', name: 'John Backend', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=2' },
];

const INITIAL_MESSAGES = [
  { id: 1, userId: 'u2', text: "Hey team! Just pushed the new landing page updates.", time: "10:30 AM", type: 'text' },
  { id: 2, userId: 'u1', text: "Awesome, I'll review it in a bit. @Sarah, can you check the responsiveness?", time: "10:32 AM", type: 'text' },
  { id: 3, userId: 'me', text: "On it! Checking mobile view now.", time: "10:33 AM", type: 'text' },
  { id: 4, userId: 'u2', text: "Here's a preview of the hero section:", time: "10:35 AM", type: 'image', content: 'Hero Section Preview' },
  { id: 5, userId: 'me', text: "Looks clean! The gradient is perfect.", time: "10:36 AM", type: 'text' },
];

// --- Sub-Components ---

// 1. Message Bubble
const MessageBubble = ({ message, isMe }) => {
  const user = message.userId === 'me' 
    ? { name: 'Sarah Dev', avatar: 'https://i.pravatar.cc/150?u=dev' }
    : DIRECT_MESSAGES.find(u => u.id === message.userId) || { name: 'Unknown', avatar: 'https://i.pravatar.cc/150?u=unknown' };

  return (
    <div className={`flex gap-4 mb-6 ${isMe ? 'flex-row-reverse' : ''} group`}>
      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-white/10 flex-shrink-0" />
      
      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[70%]`}>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-bold text-slate-200">{user.name}</span>
          <span className="text-[10px] text-slate-500">{message.time}</span>
        </div>
        
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
          isMe 
            ? 'bg-teal-600 text-white rounded-tr-none' 
            : 'bg-slate-800 text-slate-300 border border-white/5 rounded-tl-none'
        }`}>
          {message.type === 'text' && <p>{message.text}</p>}
          {message.type === 'image' && (
            <div className="space-y-2">
              <p className="mb-2">{message.text}</p>
              <div className="w-64 h-40 bg-slate-900 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group-hover/img:border-teal-500/50 transition-colors cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-teal-500/20"></div>
                <div className="flex flex-col items-center text-slate-500">
                   <ImageIcon size={24} className="mb-2"/>
                   <span className="text-xs font-mono">IMG_2024.png</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Chat Component ---
export default function TeamChat() {
  const [activeTab, setActiveTab] = useState('team'); // Sidebar Nav
  const [activeChannel, setActiveChannel] = useState('general');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      userId: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <div className="h-screen bg-slate-950 text-white font-sans flex overflow-hidden selection:bg-teal-500 selection:text-white">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- 1. App Navigation Sidebar (Thin) --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-20 bg-slate-900/90 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-6 gap-8 hidden md:flex`}>
         <Link to='/db' className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Layers size={22} className="text-white" />
         </Link>
         
         <div className="flex flex-col gap-4 w-full px-2">
            {[
              { id: 'mytasks', icon: CheckCircle2, label: 'Tasks' },
              { id: 'team', icon: MessageSquare, label: 'Chat' },
              { id: 'performance', icon: Trophy, label: 'Stats' },
              { id: 'files', icon: FileText, label: 'Files' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 group relative ${
                  activeTab === item.id 
                    ? 'bg-teal-500/10 text-teal-400' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                <item.icon size={24} />
                {activeTab === item.id && <div className="absolute left-0 w-1 h-8 bg-teal-500 rounded-r-full"></div>}
              </button>
            ))}
         </div>

         <div className="mt-auto">
            <img src="https://i.pravatar.cc/150?u=dev" alt="User" className="w-10 h-10 rounded-full border-2 border-slate-800" />
         </div>
      </aside>

      {/* --- 2. Mobile Header --- */}
      <div className="md:hidden fixed top-0 w-full z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center">
         <div className="flex items-center gap-2">
            <Layers size={20} className="text-teal-400" />
            <span className="font-bold">ProjectTracker</span>
         </div>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            {mobileMenuOpen ? <X /> : <Menu />}
         </button>
      </div>

      {/* --- Main Layout Grid --- */}
      <div className="flex-1 flex w-full md:pl-20 pt-16 md:pt-0">
        
        {/* --- 3. Channel Sidebar (Left Pane) --- */}
        <div className={`w-full md:w-64 bg-slate-900/50 border-r border-white/5 flex flex-col ${mobileMenuOpen ? 'block fixed inset-0 z-30 pt-20 bg-slate-950' : 'hidden md:flex'}`}>
          
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-bold text-lg tracking-tight">Project Alpha</h2>
            <Bell size={18} className="text-slate-500 hover:text-white cursor-pointer" />
          </div>

          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            
            {/* Channels Group */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
                <span>Channels</span>
                <span className="hover:text-white cursor-pointer">+</span>
              </div>
              <div className="space-y-1">
                {CHANNELS.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => { setActiveChannel(channel.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                      activeChannel === channel.id 
                        ? 'bg-teal-500/10 text-teal-400 font-medium' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Hash size={16} className="opacity-50" />
                      <span>{channel.name}</span>
                    </div>
                    {channel.unread > 0 && (
                      <span className="bg-teal-500 text-slate-950 text-[10px] font-bold px-1.5 rounded-md">{channel.unread}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* DMs Group */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
                <span>Direct Messages</span>
                <span className="hover:text-white cursor-pointer">+</span>
              </div>
              <div className="space-y-1">
                {DIRECT_MESSAGES.map(dm => (
                  <button
                    key={dm.id}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all group"
                  >
                    <div className="relative">
                       <img src={dm.avatar} alt={dm.name} className="w-6 h-6 rounded-full opacity-80 group-hover:opacity-100" />
                       <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
                         dm.status === 'online' ? 'bg-emerald-500' : dm.status === 'busy' ? 'bg-amber-500' : 'bg-slate-500'
                       }`}></div>
                    </div>
                    <span>{dm.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* User Status Footer */}
          <div className="p-4 bg-black/20 border-t border-white/5">
             <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                Status: Online
             </div>
          </div>
        </div>

        {/* --- 4. Chat Area (Center Pane) --- */}
        <div className="flex-1 flex flex-col relative bg-slate-950/30">
          
          {/* Chat Header */}
          <div className="h-16 border-b border-white/5 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <Hash size={24} className="text-slate-400" />
              <div>
                <h3 className="font-bold text-white leading-none mb-1">{activeChannel}</h3>
                <p className="text-xs text-slate-400">Topic: Coordinating the Q4 release launch.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
               <div className="hidden sm:flex items-center bg-slate-950/50 border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-teal-500/50 transition-colors">
                  <Search size={14} className="mr-2" />
                  <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-xs w-24 focus:w-40 transition-all text-white" />
               </div>
               <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>
               <button className="hover:text-white hover:bg-white/5 p-2 rounded-lg transition-colors"><Phone size={20} /></button>
               <button className="hover:text-white hover:bg-white/5 p-2 rounded-lg transition-colors"><Video size={20} /></button>
               <button onClick={() => setRightSidebarOpen(!rightSidebarOpen)} className={`hover:text-white hover:bg-white/5 p-2 rounded-lg transition-colors ${rightSidebarOpen ? 'text-teal-400' : ''}`}>
                 <Users size={20} />
               </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {/* Date Separator */}
            <div className="flex items-center justify-center mb-8 opacity-50">
               <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/20"></div>
               <span className="text-xs font-mono px-3 text-slate-400">Today</span>
               <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/20"></div>
            </div>

            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isMe={msg.userId === 'me'} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-slate-900/50 backdrop-blur-md border-t border-white/5">
            <form onSubmit={handleSendMessage} className="relative flex flex-col gap-2">
               <div className="relative">
                 <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Message #${activeChannel}`}
                    className="w-full bg-slate-800/80 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-sm text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 shadow-inner transition-all placeholder:text-slate-500"
                 />
                 <button 
                    type="submit"
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                      inputText.trim() ? 'bg-teal-500 text-white shadow-lg' : 'bg-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Send size={18} className={inputText.trim() ? 'translate-x-0.5' : ''} />
                 </button>
               </div>
               
               {/* Toolbar */}
               <div className="flex justify-between items-center px-2">
                 <div className="flex gap-1">
                   <button type="button" className="p-2 text-slate-400 hover:text-teal-400 hover:bg-white/5 rounded-lg transition-colors">
                     <Paperclip size={18} />
                   </button>
                   <button type="button" className="p-2 text-slate-400 hover:text-teal-400 hover:bg-white/5 rounded-lg transition-colors">
                     <ImageIcon size={18} />
                   </button>
                   <button type="button" className="p-2 text-slate-400 hover:text-teal-400 hover:bg-white/5 rounded-lg transition-colors">
                     <Smile size={18} />
                   </button>
                 </div>
                 <div className="text-[10px] text-slate-600 font-mono hidden sm:block">
                    Press <span className="bg-white/10 px-1 py-0.5 rounded border border-white/5">Enter</span> to send
                 </div>
               </div>
            </form>
          </div>
        </div>

        {/* --- 5. Info Sidebar (Right Pane) --- */}
        <div className={`hidden lg:flex flex-col w-72 bg-slate-900/30 border-l border-white/5 transition-all duration-300 ${rightSidebarOpen ? 'mr-0' : '-mr-72 w-0 overflow-hidden border-none'}`}>
           <div className="p-6 border-b border-white/5 text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-2xl mx-auto mb-4 flex items-center justify-center text-slate-500 border border-white/5">
                 <Hash size={40} />
              </div>
              <h3 className="font-bold text-lg text-white mb-1">#{activeChannel}</h3>
              <p className="text-xs text-slate-400">Created on Nov 12, 2024</p>
           </div>

           <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="mb-6">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Description</h4>
                 <p className="text-sm text-slate-300 leading-relaxed">
                   General discussion for all things related to Project Alpha. Announcements, updates, and random banter.
                 </p>
              </div>

              <div>
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex justify-between">
                   <span>Members</span>
                   <span>24</span>
                 </h4>
                 <div className="space-y-3">
                   {/* Mock Member List */}
                   {[{n: 'Alex Admin', r: 'Creator', s: 'online'}, {n: 'Sarah Dev', r: 'Member', s: 'online'}, {n: 'John Backend', r: 'Member', s: 'offline'}, {n: 'Emily Design', r: 'Member', s: 'busy'}].map((m, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <div className="relative">
                           <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-8 h-8 rounded-full bg-slate-800" alt={m.n} />
                           <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
                             m.s === 'online' ? 'bg-emerald-500' : m.s === 'busy' ? 'bg-amber-500' : 'bg-slate-500'
                           }`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-medium text-slate-200 truncate">{m.n}</p>
                           <p className="text-[10px] text-slate-500">{m.r}</p>
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}