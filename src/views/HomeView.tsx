import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Zap, AlertTriangle, ShieldAlert, Check, X, Phone, MessageSquare, Car } from 'lucide-react';

interface HomeViewProps {
  isOnline: boolean;
  setIsOnline: (status: boolean) => void;
}

type TripStatus = 'idle' | 'incoming' | 'accepted' | 'arriving' | 'in_progress';

export default function HomeView({ isOnline, setIsOnline }: HomeViewProps) {
  const [tripStatus, setTripStatus] = useState<TripStatus>('idle');
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOnline && tripStatus === 'idle') {
      timeout = setTimeout(() => {
        setTripStatus('incoming');
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [isOnline, tripStatus]);

  const acceptTrip = () => setTripStatus('accepted');
  const declineTrip = () => setTripStatus('idle');

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-4 h-full overflow-y-auto overflow-x-hidden no-scrollbar">
      
      {/* Earnings / Hero Card */}
      <div className="md:col-span-8 md:row-span-3 bg-[#1A1A20] rounded-[2rem] border border-[#2D2D35] p-6 md:p-8 flex flex-col justify-between shrink-0 hover:border-blue-500/30 transition-colors">
        <div>
          <div className="flex justify-between items-start">
            <p className="text-gray-400 font-medium uppercase text-xs md:text-sm tracking-widest">Today's Net Earnings</p>
            <span className="hidden md:inline-block bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-lg font-bold border border-green-500/20">+12% vs Yesterday</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mt-2">R 1,452.80</h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">14 trips completed today</p>
        </div>
        <div className="flex items-end gap-1 md:gap-2 h-16 md:h-24 mt-6">
          <div className="flex-grow bg-blue-500/20 h-[30%] rounded-t-lg"></div>
          <div className="flex-grow bg-blue-500/30 h-[40%] rounded-t-lg"></div>
          <div className="flex-grow bg-blue-500/40 h-[50%] rounded-t-lg"></div>
          <div className="flex-grow bg-blue-500/60 h-[70%] rounded-t-lg"></div>
          <div className="flex-grow bg-blue-500/80 h-[45%] rounded-t-lg"></div>
          <div className="flex-grow bg-blue-600 h-[80%] rounded-t-lg"></div>
          <div className="flex-grow bg-blue-400 h-[60%] rounded-t-lg shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>
        </div>
      </div>

      {/* Load Shedding Alert */}
      <div className="md:col-span-4 md:row-span-2 bg-[#2D1B1B] rounded-[2rem] border border-[#4D2D2D] p-6 flex flex-col justify-center items-start relative overflow-hidden shrink-0 group hover:border-[#6b3131] transition-all">
        <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
          <Zap className="w-40 h-40 text-white" />
        </div>
        <div className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase mb-2 shadow-lg shadow-red-500/20">Priority Alert</div>
        <h3 className="text-lg md:text-xl font-bold text-red-200">Load Shedding: Stage 4</h3>
        <p className="text-xs md:text-sm text-red-300/80 mt-2 leading-relaxed">Pretoria East Area 6 starting at 18:00. Plan your charging accordingly.</p>
      </div>

      {/* Dynamic Status / Request Area */}
      <div className="md:col-span-4 md:row-span-1 bg-transparent p-0 flex flex-col shrink-0 min-h-[100px]">
          <AnimatePresence mode="wait">
             {tripStatus === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full bg-[#1A1A20] rounded-[2rem] border border-[#2D2D35] p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#2D2D35] rounded-full flex items-center justify-center">
                       {isOnline ? <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div> : <Zap className="w-4 h-4 text-gray-500" />}
                    </div>
                    <span className="font-bold text-lg md:text-xl text-gray-300">{isOnline ? 'Searching...' : 'Offline'}</span>
                  </div>
                </motion.div>
             )}

             {tripStatus === 'incoming' && (
                <motion.div key="incoming" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="h-full bg-blue-600 rounded-[2rem] p-6 flex flex-col justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                      </div>
                      <span className="font-bold text-lg text-white">New Request</span>
                    </div>
                    <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-black">3 MIN</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={declineTrip} className="w-[80px] h-12 bg-black/20 rounded-xl flex items-center justify-center hover:bg-black/30 transition-colors">
                      <X className="w-6 h-6 text-white" />
                    </button>
                    <button onClick={acceptTrip} className="flex-1 bg-white text-blue-700 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                      ACCEPT (R65)
                    </button>
                  </div>
                </motion.div>
             )}

             {tripStatus === 'accepted' && (
                <motion.div key="accepted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full bg-[#1A1A20] border-2 border-green-500/50 rounded-[2rem] p-6 flex items-center justify-between shadow-lg">
                  <div className="flex flex-col">
                     <span className="text-green-500 text-xs font-bold uppercase mb-1">Accepted</span>
                     <span className="text-white font-bold text-lg">Heading to Pick-up</span>
                  </div>
                  <button onClick={() => setTripStatus('arriving')} className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-700 transition-colors">
                    Arrived
                  </button>
                </motion.div>
             )}

             {tripStatus === 'arriving' && (
                <motion.div key="arriving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full bg-[#1A1A20] border-2 border-green-500 rounded-[2rem] p-6 flex items-center justify-between">
                  <span className="text-white font-bold text-lg">At Pick-up</span>
                  <button onClick={() => setTripStatus('in_progress')} className="bg-green-500 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors">
                    Start Trip
                  </button>
                </motion.div>
             )}

             {tripStatus === 'in_progress' && (
                <motion.div key="inprogress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full bg-[#1A1A20] border-2 border-blue-500 rounded-[2rem] p-6 flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-blue-400 text-xs font-bold uppercase mb-1">In Progress</span>
                     <span className="text-white font-bold text-lg truncate max-w-[150px]">To Menlyn Park</span>
                  </div>
                  <button onClick={() => setTripStatus('idle')} className="bg-red-500 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors">
                    End Trip
                  </button>
                </motion.div>
             )}
          </AnimatePresence>
      </div>

      {/* Hotspot Map */}
      <div className="md:col-span-5 md:row-span-3 bg-[#1A1A20] rounded-[2rem] border border-[#2D2D35] p-1 overflow-hidden flex flex-col relative shrink-0 min-h-[250px] md:min-h-0">
        <div className="absolute top-4 left-4 z-10 bg-[#0F0F12]/80 backdrop-blur px-3 py-1.5 rounded-full border border-[#2D2D35]">
          <span className="text-[10px] font-bold text-blue-400 tracking-wider">DEMAND HEATMAP: HIGH</span>
        </div>
        <div className="w-full h-full bg-[#24242B] rounded-[1.8rem] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
          
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 bg-map-pattern opacity-10 cursor-move pointer-events-none" />
          
          <div className="flex flex-col items-center relative z-10">
             <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white mb-2 shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
             <span className="text-[10px] font-bold uppercase tracking-tighter bg-black/60 px-2 py-1 rounded backdrop-blur">Your Location</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="md:col-span-4 md:row-span-2 bg-[#1A1A20] rounded-[2rem] border border-[#2D2D35] p-6 grid grid-cols-2 gap-y-6 gap-x-4 shrink-0">
        <div className="flex flex-col justify-center">
          <p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Distance</p>
          <p className="text-2xl md:text-3xl font-bold">184.2<span className="text-xs text-gray-500 ml-0.5 font-normal">km</span></p>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Fuel Est.</p>
          <p className="text-2xl md:text-3xl font-bold">R 312</p>
        </div>
        <div className="flex flex-col justify-center border-t border-[#2D2D35] pt-4">
          <p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Rating</p>
          <p className="text-2xl md:text-3xl font-bold text-yellow-500">4.92<span className="text-lg ml-0.5">★</span></p>
        </div>
        <div className="flex flex-col justify-center border-t border-[#2D2D35] pt-4">
          <p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Referrals</p>
          <p className="text-2xl md:text-3xl font-bold">08<span className="text-xs text-gray-500 ml-0.5 font-normal">active</span></p>
        </div>
      </div>

      {/* Driver Wallet */}
      <div className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-[#2D2D35] to-[#1A1A20] rounded-[2rem] border border-[#3D3D45] p-6 flex flex-col justify-between shrink-0 h-[200px] md:h-auto">
        <div>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Wallet Balance</p>
          <h4 className="text-3xl md:text-4xl font-bold">R 4,290.00</h4>
        </div>
        <button className="w-full bg-white text-black py-4 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors shadow-lg active:scale-[0.98]">
          PAYOUT NOW
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="md:col-span-7 md:row-span-1 flex flex-row gap-4 shrink-0 pb-4 md:pb-0 h-[80px] md:h-auto">
        <div className="flex-1 bg-[#1A1A20] rounded-2xl md:rounded-[2rem] border border-[#2D2D35] flex items-center justify-center gap-3 px-4 hover:bg-[#2D2D35] transition-colors cursor-pointer group">
           <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
             <Car className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
           </div>
           <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300">Vehicle Log</span>
        </div>
        <div className="flex-1 bg-[#1A1A20] rounded-2xl md:rounded-[2rem] border border-[#2D2D35] flex items-center justify-center gap-3 px-4 hover:bg-[#2D2D35] transition-colors cursor-pointer group">
           <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
             <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
           </div>
           <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300">Pass. Support</span>
        </div>
      </div>

    </div>
  );
}
