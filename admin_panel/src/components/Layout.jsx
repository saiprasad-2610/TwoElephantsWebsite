import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Mail,
  Briefcase,
  FileText,
  Newspaper,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Bell,
  Settings
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/contacts', label: 'Contact Inquiries', icon: Mail },
  { path: '/jobs', label: 'Job Roles', icon: Briefcase },
  { path: '/applications', label: 'Applications', icon: FileText },
  { path: '/articles', label: 'Articles', icon: Newspaper },
];

export default function Layout() {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!admin) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-['Inter'] overflow-hidden relative">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-purple-400/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-indigo-400/20 to-pink-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col z-20 shadow-2xl shadow-blue-500/5"
      >
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        
        {/* Logo Area */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between relative">
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                <span className="text-white font-black text-sm relative z-10">TE</span>
              </div>
              <div>
                <h1 className="text-base font-black text-gray-900 tracking-tight leading-none">
                  TWO ELEPHANTS
                </h1>
                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-[2px] mt-0.5">Admin Panel</p>
              </div>
            </motion.div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 active:scale-95 border border-gray-200/50"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/30'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                  }`}
                >
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-300 ${isActive ? '' : 'rounded-2xl'}`} />
                  
                  <Icon size={20} className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'} transition-colors relative z-10`} />
                  {sidebarOpen && (
                    <span className={`font-semibold text-sm tracking-tight relative z-10 ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute -right-1 w-1.5 h-8 bg-white rounded-l-full shadow-lg"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3.5 px-4 py-3.5 text-gray-400 hover:text-rose-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 rounded-2xl transition-all duration-300 w-full group"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            {sidebarOpen && <span className="font-semibold text-sm">Sign Out</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Animated Header */}
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-gray-200/50 px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <span>Workspace</span>
              <ChevronRight size={14} className="text-gray-300" />
              <span className="text-blue-600 font-bold capitalize bg-blue-50 px-3 py-1.5 rounded-full">{location.pathname.slice(1) || 'Dashboard'}</span>
            </div>
          </motion.div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all duration-300 border border-gray-200/50 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full border-2 border-white text-[9px] font-bold text-white flex items-center justify-center shadow-lg">3</span>
            </motion.button>
            
            {/* Settings */}
            <motion.button 
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50 flex items-center justify-center text-gray-400 hover:text-purple-600 transition-all duration-300 border border-gray-200/50 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <Settings size={18} />
            </motion.button>
            
            <div className="w-px h-8 bg-gray-200 mx-2" />
            
            {/* Admin Profile */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 pl-2"
            >
              <div className="hidden md:flex flex-col items-end">
                 <p className="text-sm font-bold text-gray-800 leading-none mb-0.5">{admin.name}</p>
                 <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Administrator</p>
              </div>
              <div className="relative">
                <motion.div 
                  whileHover={{ rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-blue-600/30"
                >
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center text-blue-600 font-black text-sm">
                    {admin.name.charAt(0)}
                  </div>
                </motion.div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-lg animate-pulse" />
              </div>
            </motion.div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto custom-scrollbar p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
