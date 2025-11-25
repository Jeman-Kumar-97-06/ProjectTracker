import React, { useState } from 'react';
import { 
  Search, Plus, Filter, LayoutList, Kanban, Calendar, 
  CheckCircle, Circle, AlertCircle, Clock, MoreHorizontal,
  ChevronDown, ArrowUp, ArrowDown
} from 'lucide-react';

/* --- Mock Data --- */
const TASKS = [
  { id: 1, title: 'Update Authentication Flow', project: 'Orbital V2', status: 'In Progress', priority: 'High', due: 'Today', assignee: 1 },
  { id: 2, title: 'Q4 Marketing Assets', project: 'Marketing', status: 'Todo', priority: 'Medium', due: 'Tomorrow', assignee: 2 },
  { id: 3, title: 'Fix Navigation Bug on Mobile', project: 'Mobile App', status: 'Review', priority: 'Critical', due: 'Overdue', assignee: 1 },
  { id: 4, title: 'Write API Documentation', project: 'Orbital V2', status: 'Done', priority: 'Low', due: 'Last Week', assignee: 3 },
  { id: 5, title: 'Conduct User Interviews', project: 'Research', status: 'Todo', priority: 'Medium', due: 'Nov 24', assignee: 4 },
  { id: 6, title: 'Optimize Database Queries', project: 'Orbital V2', status: 'In Progress', priority: 'High', due: 'Nov 26', assignee: 2 },
  { id: 7, title: 'Design System Audit', project: 'Design System', status: 'Todo', priority: 'Low', due: 'Dec 01', assignee: 1 },
];

export default function TasksPage() {
  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('All');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-12">
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .row-hover:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(168, 85, 247, 0.3);
          transform: translateX(4px);
        }
      `}</style>

      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Tasks</h1>
          <p className="text-gray-400 text-sm">You have <span className="text-purple-400 font-bold">4 tasks</span> due within the next 48 hours.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium transition-colors">
              <LayoutList size={16} /> View
           </button>
           <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all">
              <Plus size={16} /> Create Task
           </button>
        </div>
      </div>

      {/* --- Toolbar --- */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
         <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
            {['All', 'In Progress', 'Assigned to Me'].map(f => (
               <button 
                 key={f} 
                 onClick={() => setFilter(f)}
                 className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${filter === f ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 {f}
               </button>
            ))}
         </div>
         
         <div className="flex items-center gap-3">
            <div className="relative group">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Filter by name..." 
                 className="pl-9 pr-4 py-2 bg-transparent border border-white/10 rounded-lg text-sm text-white focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all w-64"
               />
            </div>
            <button className="p-2 text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
               <Filter size={16} />
            </button>
         </div>
      </div>

      {/* --- List View Header --- */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/10 mb-2">
         <div className="col-span-5">Task Name</div>
         <div className="col-span-2">Status</div>
         <div className="col-span-2">Priority</div>
         <div className="col-span-2">Due Date</div>
         <div className="col-span-1 text-right">Assignee</div>
      </div>

      {/* --- Task Rows --- */}
      <div className="space-y-2">
         {TASKS.map((task) => (
            <div key={task.id} className="group glass-panel rounded-xl p-4 md:px-6 md:py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-all duration-300 row-hover cursor-pointer">
               {/* Title Section */}
               <div className="col-span-5 flex items-center gap-3">
                  <button className="text-gray-600 hover:text-purple-400 transition-colors">
                     {task.status === 'Done' ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} />}
                  </button>
                  <div>
                     <div className={`font-medium ${task.status === 'Done' ? 'text-gray-500 line-through' : 'text-white'}`}>{task.title}</div>
                     <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        {task.project}
                     </div>
                  </div>
               </div>

               {/* Status */}
               <div className="col-span-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                     task.status === 'Done' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                     task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                     task.status === 'Review' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                     'bg-gray-800 text-gray-400 border-gray-700'
                  }`}>
                     {task.status}
                  </span>
               </div>

               {/* Priority */}
               <div className="col-span-2 flex items-center gap-2">
                  {task.priority === 'Critical' && <ArrowUp size={14} className="text-red-500" />}
                  {task.priority === 'High' && <ArrowUp size={14} className="text-orange-500" />}
                  {task.priority === 'Medium' && <ArrowUp size={14} className="text-yellow-500 rotate-45" />}
                  {task.priority === 'Low' && <ArrowDown size={14} className="text-blue-500" />}
                  <span className={`text-sm ${
                     task.priority === 'Critical' ? 'text-red-400 font-bold' : 
                     task.priority === 'High' ? 'text-orange-400' : 'text-gray-400'
                  }`}>{task.priority}</span>
               </div>

               {/* Due Date */}
               <div className="col-span-2 flex items-center gap-2 text-sm text-gray-400">
                  <Clock size={14} className={task.due === 'Overdue' ? 'text-red-500' : ''} />
                  <span className={task.due === 'Overdue' ? 'text-red-400 font-bold' : ''}>{task.due}</span>
               </div>

               {/* Assignee / Actions */}
               <div className="col-span-1 flex justify-end items-center gap-4">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee}`} alt="User" className="w-6 h-6 rounded-full border border-gray-700" />
                  <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                     <MoreHorizontal size={16} />
                  </button>
               </div>
            </div>
         ))}
      </div>

      {/* --- Empty State / Load More --- */}
      <div className="mt-6 text-center">
         <button className="text-xs text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest font-bold">
            Load Archived Tasks
         </button>
      </div>
    </div>
  );
}