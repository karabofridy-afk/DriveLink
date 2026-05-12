import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, History, Wallet, CalendarDays } from 'lucide-react';

const RECENT_TRIPS = [
  { id: 1, date: 'Today, 14:32', type: 'cash', amount: 55, net: 46.75, from: 'Hatfield', to: 'Brooklyn Mall' },
  { id: 2, date: 'Today, 12:15', type: 'card', amount: 120, net: 102.00, from: 'Pretoria West', to: 'Centurion' },
  { id: 3, date: 'Yesterday, 17:05', type: 'card', amount: 85, net: 72.25, from: 'Menlyn', to: 'Lynnwood' },
  { id: 4, date: 'Yesterday, 16:20', type: 'cash', amount: 45, net: 38.25, from: 'Sunnyside', to: 'Hatfield' },
  { id: 5, date: 'Yesterday, 14:10', type: 'card', amount: 160, net: 136.00, from: 'CBD', to: 'Midrand' },
];

export default function EarningsView() {
  const [period, setPeriod] = useState<'daily' | 'weekly'>('daily');

  return (
    <div className="w-full h-full bg-transparent overflow-y-auto pb-6 text-white flex flex-col no-scrollbar">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow h-full">
        
        {/* Left Column (Hero & Stats) */}
        <div className="md:col-span-8 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2 px-2 shrink-0">
            <h1 className="text-2xl font-bold">Earnings</h1>
            <button className="bg-[#1A1A20] hover:bg-[#2D2D35] border border-[#2D2D35] rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors">
              <CalendarDays className="w-4 h-4 text-blue-500" />
              {period === 'daily' ? 'Today' : 'This Week'}
            </button>
          </div>

          <div className="flex bg-[#1A1A20] p-1.5 rounded-full relative border border-[#2D2D35] shrink-0">
            <div 
              className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-[#2D2D35] rounded-full transition-transform duration-300 ${period === 'weekly' ? 'translate-x-full' : 'translate-x-[2px]'}`} 
            />
            <button 
              onClick={() => setPeriod('daily')}
              className="flex-1 py-3 text-sm font-bold tracking-widest uppercase z-10 text-center"
            >
              Daily
            </button>
            <button 
              onClick={() => setPeriod('weekly')}
              className="flex-1 py-3 text-sm font-bold tracking-widest uppercase z-10 text-center"
            >
              Weekly
            </button>
          </div>

          <motion.div 
            key={period}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#1A1A20] to-[#0F0F12] rounded-[2rem] border border-[#2D2D35] shrink-0 min-h-[300px]"
          >
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">
              {period === 'daily' ? "Today's Balance" : "Weekly Balance"}
            </p>
            <h2 className="text-6xl md:text-7xl font-black tabular-nums tracking-tighter mb-6 text-white text-center">
              <span className="text-gray-500 mr-2 text-4xl">R</span>{period === 'daily' ? '850.50' : '4,230.00'}
            </h2>
            
            <div className="bg-green-500/10 text-green-500 border border-green-500/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              +12% vs last {period === 'daily' ? 'day' : 'week'}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="bg-[#1A1A20] p-6 rounded-[2rem] border border-[#2D2D35] flex flex-col items-start hover:border-blue-500/30 transition-colors">
              <div className="bg-blue-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <Wallet className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Net Income</p>
              <p className="text-2xl font-bold">R {period === 'daily' ? '722.92' : '3,595.50'}</p>
            </div>
            <div className="bg-[#1A1A20] p-6 rounded-[2rem] border border-[#2D2D35] flex flex-col items-start hover:border-orange-500/30 transition-colors">
              <div className="bg-orange-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                 <History className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Total Trips</p>
              <p className="text-2xl font-bold">{period === 'daily' ? '12' : '64'}</p>
            </div>
          </div>
        </div>

        {/* Right Column (Recent Trips) */}
        <div className="md:col-span-4 bg-[#1A1A20] rounded-[2rem] border border-[#2D2D35] overflow-hidden flex flex-col md:mt-[4.5rem] h-[400px] md:h-auto">
          <div className="p-6 border-b border-[#2D2D35] flex justify-between items-center bg-[#1A1A20]/80 backdrop-blur top-0 sticky z-10">
            <h3 className="text-lg font-bold">Recent Trips</h3>
            <button className="text-blue-500 text-xs font-bold uppercase tracking-wider hover:text-blue-400">See All</button>
          </div>

          <div className="flex flex-col overflow-y-auto p-4 gap-3 no-scrollbar h-full">
            {RECENT_TRIPS.slice(0, period === 'daily' ? 2 : 5).map(trip => (
              <div key={trip.id} className="bg-[#0F0F12] rounded-2xl p-4 border border-[#2D2D35] flex items-center gap-4 hover:border-[#3D3D45] transition-colors cursor-pointer">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${trip.type === 'cash' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                  {trip.type === 'cash' ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                </div>
                
                <div className="flex-1 min-w-0">
                   <p className="font-bold text-white truncate text-sm md:text-base">{trip.from}</p>
                   <p className="text-xs text-gray-500 truncate flex gap-1 mt-0.5">
                     <span>to</span> <span className="font-medium text-gray-400">{trip.to}</span>
                   </p>
                </div>

                <div className="text-right shrink-0 flex flex-col justify-center">
                  <p className="font-bold text-white whitespace-nowrap text-lg">R {trip.net.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{trip.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
