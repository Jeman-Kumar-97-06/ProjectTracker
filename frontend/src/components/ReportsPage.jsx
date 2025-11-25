import { 
  BarChart2, TrendingUp, Users, Calendar, 
  Download, ChevronDown, Activity
} from 'lucide-react';

/* --- Styles for Simple Charts --- */
const chartStyles = `
  .chart-bar { transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
  .chart-bar:hover { opacity: 0.8; }
`;

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <style>{chartStyles}</style>
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-gray-400 text-sm">Team performance for <span className="text-white font-bold">November 2024</span>.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium transition-colors text-gray-300">
              <Calendar size={16} /> Last 30 Days <ChevronDown size={14} />
           </button>
           <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 transition-colors">
              <Download size={18} />
           </button>
           <button className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold shadow-lg transition-all">
              Export Report
           </button>
        </div>
      </div>

      {/* --- Key Metrics Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         <MetricCard 
           title="Velocity" 
           value="42" 
           unit="pts" 
           trend="+12%" 
           trendUp={true} 
           icon={<Activity size={20} className="text-purple-400" />} 
           color="border-purple-500/30"
         />
         <MetricCard 
           title="Tasks Completed" 
           value="128" 
           unit="" 
           trend="+8%" 
           trendUp={true} 
           icon={<CheckCircle size={20} className="text-green-400" />} 
           color="border-green-500/30"
         />
         <MetricCard 
           title="Team Load" 
           value="84" 
           unit="%" 
           trend="-2%" 
           trendUp={false} 
           icon={<Users size={20} className="text-blue-400" />} 
           color="border-blue-500/30"
         />
         <MetricCard 
           title="Avg. Cycle Time" 
           value="1.2" 
           unit="days" 
           trend="-15%" 
           trendUp={true} 
           icon={<Clock size={20} className="text-orange-400" />} 
           color="border-orange-500/30"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* --- Main Chart (Burndown) --- */}
         <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp size={18} className="text-purple-400" /> 
                  Sprint Burndown
               </h3>
               <div className="flex gap-2">
                  <span className="flex items-center gap-2 text-xs text-gray-400"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Ideal</span>
                  <span className="flex items-center gap-2 text-xs text-gray-400"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Actual</span>
               </div>
            </div>
            
            {/* CSS-only Area Chart Mockup */}
            <div className="h-64 w-full relative border-l border-b border-white/10">
               {/* Grid lines */}
               {[0, 25, 50, 75, 100].map((p) => (
                  <div key={p} className="absolute w-full border-t border-white/5" style={{ bottom: `${p}%` }}></div>
               ))}
               
               {/* Lines (using SVG) */}
               <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                  {/* Purple Line (Ideal) */}
                  <path d="M0,300 L800,0" vectorEffect="non-scaling-stroke" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                  
                  {/* Blue Line (Actual) */}
                  <path 
                    d="M0,250 C100,250 150,200 200,180 C300,140 400,160 500,100 C600,60 700,40 800,20" 
                    vectorEffect="non-scaling-stroke" 
                    stroke="#3b82f6" 
                    strokeWidth="3" 
                    fill="none" 
                    className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                  {/* Fill Gradient */}
                  <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                     <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                  </linearGradient>
                  <path 
                     d="M0,250 C100,250 150,200 200,180 C300,140 400,160 500,100 C600,60 700,40 800,20 V300 H0 Z" 
                     fill="url(#fillGradient)" 
                     vectorEffect="non-scaling-stroke" 
                  />
               </svg>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-4 font-mono">
               <span>Day 1</span>
               <span>Day 3</span>
               <span>Day 5</span>
               <span>Day 7</span>
               <span>Day 10</span>
               <span>Day 14</span>
            </div>
         </div>

         {/* --- Productivity Bar Chart --- */}
         <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
               <BarChart2 size={18} className="text-green-400" />
               Tasks by Member
            </h3>
            
            <div className="flex-1 flex items-end justify-between gap-4 px-2">
               {[
                  { name: 'Alex', val: 80, color: 'bg-purple-500' },
                  { name: 'Sarah', val: 65, color: 'bg-blue-500' },
                  { name: 'Mike', val: 90, color: 'bg-green-500' },
                  { name: 'Elena', val: 45, color: 'bg-yellow-500' },
               ].map((bar) => (
                  <div key={bar.name} className="flex flex-col items-center gap-2 flex-1 group">
                     <div className="relative w-full rounded-t-lg bg-gray-800/50 h-48 flex items-end overflow-hidden">
                        <div 
                           className={`w-full ${bar.color} chart-bar relative`} 
                           style={{ height: `${bar.val}%` }}
                        >
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                              {bar.val} Tasks
                           </div>
                        </div>
                     </div>
                     <span className="text-xs font-medium text-gray-400">{bar.name}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* --- Recent Activity Table --- */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
         <h3 className="text-lg font-bold mb-6">Recent Activity Log</h3>
         <div className="space-y-4">
            {[1,2,3].map(i => (
               <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs text-gray-400 font-mono">#{i}0{i}</div>
                     <div>
                        <div className="text-sm font-medium text-white">Project Specs Updated</div>
                        <div className="text-xs text-gray-500">Modified by <span className="text-gray-300">Sarah Jenkins</span></div>
                     </div>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">2h ago</div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
}

/* Sub-components for Reports */
import { CheckCircle, Clock } from 'lucide-react'; // Re-importing for MetricCard usage if needed in scope

const MetricCard = ({ title, value, unit, trend, trendUp, icon, color }) => (
   <div className={`bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors group relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500 transform`}>
         {icon}
      </div>
      <div className="flex items-center gap-2 mb-2">
         {icon}
         <span className="text-sm text-gray-400 font-medium">{title}</span>
      </div>
      <div className="flex items-end gap-2">
         <span className="text-3xl font-bold text-white">{value}</span>
         <span className="text-sm text-gray-500 mb-1">{unit}</span>
      </div>
      <div className={`text-xs mt-2 flex items-center gap-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
         {trendUp ? '↑' : '↓'} {trend}
         <span className="text-gray-600 ml-1">vs last month</span>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${color.replace('border-', 'text-')}`}></div>
   </div>
);