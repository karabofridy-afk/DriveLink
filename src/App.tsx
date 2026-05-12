import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, DollarSign, User, Map as MapIcon } from 'lucide-react';
import HomeView from './views/HomeView';
import EarningsView from './views/EarningsView';
import ProfileView from './views/ProfileView';

type Tab = 'home' | 'earnings' | 'hotspots' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="flex h-[100dvh] w-full bg-[#0F0F12] items-center justify-center font-sans md:p-6 overflow-hidden">
      {/* Bento Dashboard Container */}
      <div className="relative w-full h-full md:max-w-5xl md:max-h-[850px] lg:max-h-[768px] md:rounded-[2rem] border-0 md:border md:border-[#2D2D35] overflow-hidden flex flex-col bg-[#0F0F12] text-white shadow-2xl">
        
        {/* Header - shown globally like in the Bento design */}
        <header className="flex justify-between items-center p-4 md:p-6 shrink-0 border-b border-[#2D2D35] bg-[#0F0F12] z-50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2D2D35] rounded-full flex items-center justify-center border border-[#3D3D45] shrink-0">
              <span className="text-lg md:text-xl font-bold text-blue-400">JD</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">DriveLink <span className="text-blue-500">SA</span></h1>
              <p className="hidden xs:block text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-semibold">Gauteng • Pretoria CBD</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            {isOnline && (
              <div className="hidden md:flex bg-[#1A1A20] px-4 py-2 rounded-2xl border border-[#2D2D35] items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium">System Online</span>
              </div>
            )}
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`${isOnline ? 'bg-blue-600 hover:bg-blue-700 border-blue-800' : 'bg-[#1A1A20] hover:bg-[#2D2D35] text-white border-[#3D3D45]'} px-4 py-2 md:px-6 md:py-2 rounded-xl font-bold transition-all border-b-4 text-xs md:text-sm whitespace-nowrap`}
            >
              {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 relative z-10 overflow-hidden flex flex-col p-4 md:p-6 pb-24 md:pb-6">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-x-4 inset-y-4 md:inset-x-6 md:inset-y-6">
                <HomeView isOnline={isOnline} setIsOnline={setIsOnline} />
              </motion.div>
            )}
            {activeTab === 'earnings' && (
              <motion.div key="earnings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-x-4 inset-y-4 md:inset-x-6 md:inset-y-6">
                <EarningsView />
              </motion.div>
            )}
            {activeTab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-x-4 inset-y-4 md:inset-x-6 md:inset-y-6">
                <ProfileView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-4 left-4 right-4 md:static md:mx-6 md:mb-6 bg-[#1A1A20] rounded-2xl border border-[#2D2D35] p-2 flex justify-around shadow-2xl z-50">
          <NavItem 
             icon={<Home className="w-6 h-6" />} 
             label="Home" 
             isActive={activeTab === 'home'} 
             onClick={() => setActiveTab('home')} 
          />
          <NavItem 
             icon={<DollarSign className="w-6 h-6" />} 
             label="Earnings" 
             isActive={activeTab === 'earnings'} 
             onClick={() => setActiveTab('earnings')} 
          />
          <NavItem 
             icon={<MapIcon className="w-6 h-6" />} 
             label="Hotspots" 
             isActive={activeTab === 'hotspots'} 
             onClick={() => {}} 
          />
          <NavItem 
             icon={<User className="w-6 h-6" />} 
             label="Account" 
             isActive={activeTab === 'profile'} 
             onClick={() => setActiveTab('profile')} 
          />
        </nav>
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 w-16 md:w-20 transition-all ${isActive ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'}`}
    >
      <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      {isActive && (
         <motion.div layoutId="nav-pill" className="w-6 md:w-8 h-1 mt-1 bg-blue-500 rounded-full" />
      )}
    </button>
  );
}
