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
  ChevronRight
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
    <div className="flex h-screen bg-[#0f0f1a]">
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className="bg-[#1a1a2e] border-r border-gray-800 flex flex-col"
      >
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-xl font-bold text-white">Two Elephants</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </motion.div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white shadow-lg shadow-[#e94560]/20'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all w-full"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-gray-800 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Admin</span>
              <ChevronRight size={16} />
              <span className="text-white capitalize">{location.pathname.slice(1)}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e94560] to-[#ff6b6b] flex items-center justify-center text-white font-bold">
                {admin.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
