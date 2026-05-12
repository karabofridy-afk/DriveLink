import { User, Car, Settings, HelpCircle, LogOut, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function ProfileView() {
  return (
    <div className="w-full h-full bg-transparent overflow-y-auto pb-6 text-white flex flex-col no-scrollbar">
      <h1 className="text-2xl font-bold mb-6 px-2">Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Profile Card (Hero) */}
        <div className="md:col-span-5 bg-[#1A1A20] rounded-[2rem] border border-[#2D2D35] p-8 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full bg-[#2D2D35] border-4 border-[#1A1A20] shadow-2xl overflow-hidden shadow-black/50">
              <img src="https://i.pravatar.cc/300?u=a04258114e29026702d" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-[#1A1A20] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">Thabo Mbeki</h2>
          <div className="inline-flex items-center gap-2 bg-[#0F0F12] px-4 py-2 rounded-full border border-[#2D2D35]">
            <span className="text-yellow-500 font-bold">4.9 ★</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 text-sm font-medium">Joined 2022</span>
          </div>
        </div>

        {/* Vehicle & Quick Links */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="bg-[#1A1A20] rounded-[2rem] p-6 border border-[#2D2D35] flex items-center gap-6 hover:border-[#3D3D45] transition-colors cursor-pointer group">
            <div className="w-20 h-20 bg-[#0F0F12] rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-[#2D2D35]">
              <Car className="w-10 h-10 text-blue-500" />
            </div>
            <div className="flex flex-col justify-center flex-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Active Vehicle</span>
              <p className="font-bold text-white text-xl md:text-2xl">Toyota Quantum</p>
              <p className="text-gray-400 text-sm mt-1 bg-[#0F0F12] px-3 py-1 rounded-lg self-start border border-[#2D2D35]">ND 123 456 • White</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
          </div>

          <div className="bg-[#1A1A20] rounded-[2rem] border border-[#2D2D35] overflow-hidden flex flex-col flex-1">
            <button className="flex-1 flex items-center justify-between p-6 bg-transparent hover:bg-[#2D2D35]/50 active:scale-[0.99] transition-all border-b border-[#2D2D35] group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F0F12] border border-[#2D2D35] text-blue-500 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                   <span className="font-bold text-white block">Personal Information</span>
                   <span className="text-xs text-gray-500 font-medium">Update phone, email, address</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
            </button>

            <button className="flex-1 flex items-center justify-between p-6 bg-transparent hover:bg-[#2D2D35]/50 active:scale-[0.99] transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F0F12] border border-[#2D2D35] text-purple-500 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all">
                  <Settings className="w-5 h-5" />
                </div>
                <div className="text-left">
                   <span className="font-bold text-white block">App Settings</span>
                   <span className="text-xs text-gray-500 font-medium">Notifications, navigation, dark mode</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-500" />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="md:col-span-12 flex gap-4 mt-2">
          <button className="flex-1 flex items-center justify-center p-6 bg-[#1A1A20] hover:bg-[#2D2D35] transition-all rounded-3xl border border-[#2D2D35] group">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-gray-400 group-hover:text-white" />
                <span className="font-bold text-gray-300 group-hover:text-white transition-colors">Help & Support</span>
              </div>
          </button>
          <button className="flex-1 flex items-center justify-center p-6 bg-[#2D1B1B] hover:bg-[#4D2D2D] transition-all rounded-3xl border border-[#4D2D2D] group">
              <div className="flex items-center gap-3 text-red-500 group-hover:text-red-400">
                <LogOut className="w-6 h-6" />
                <span className="font-bold">Log Out</span>
              </div>
          </button>
        </div>

      </div>
      <p className="text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-8 mb-4">DriveLink SA App v1.0.4</p>
    </div>
  );
}
