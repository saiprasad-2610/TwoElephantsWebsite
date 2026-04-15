import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Briefcase, FileText, Newspaper, TrendingUp, Clock, CheckCircle, Eye } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const statCards = [
  { label: 'Contact Inquiries', icon: Mail, color: 'from-blue-500 to-cyan-500', key: 'contacts' },
  { label: 'Job Roles', icon: Briefcase, color: 'from-purple-500 to-pink-500', key: 'jobs' },
  { label: 'Applications', icon: FileText, color: 'from-orange-500 to-red-500', key: 'applications' },
  { label: 'Articles', icon: Newspaper, color: 'from-green-500 to-emerald-500', key: 'articles' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ contacts: 0, jobs: 0, applications: 0, articles: 0 });
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactsRes, jobsRes, applicationsRes, articlesRes] = await Promise.all([
        axios.get(`${API_BASE}/contacts/`),
        axios.get(`${API_BASE}/jobs/`),
        axios.get(`${API_BASE}/applications/`),
        axios.get(`${API_BASE}/articles/`),
      ]);

      setStats({
        contacts: contactsRes.data.length,
        jobs: jobsRes.data.length,
        applications: applicationsRes.data.length,
        articles: articlesRes.data.length,
      });
      setRecentContacts(contactsRes.data.slice(0, 5));
      setRecentApplications(applicationsRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="font-['Ubuntu_Sans']">
      <motion.div variants={item} className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">System Overview</h1>
        <p className="text-gray-500 font-medium">Welcome back! Here's a snapshot of your platform's activity.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.key}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-[#0B1526] border border-white/5 rounded-2xl p-7 relative overflow-hidden group animated-gradient-border"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">{stats[stat.key]}</h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={item} className="bg-[#0B1526] border border-white/5 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight">Recent Inquiries</h2>
            <div className="p-2.5 bg-blue-500/10 rounded-xl">
               <Mail size={20} className="text-blue-400" />
            </div>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-white/5 rounded-2xl" />
                ))}
              </div>
            ) : recentContacts.length > 0 ? (
              recentContacts.map((contact) => (
                <div key={contact.id} className="group p-5 bg-white/5 hover:bg-white/[0.08] border border-white/5 rounded-2xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-sm">
                        {contact.fname.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white mb-1">{contact.fname} {contact.lname}</p>
                        <p className="text-[11px] font-semibold text-gray-500">{contact.email}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${contact.is_read ? 'bg-black/20 border-white/5' : 'bg-blue-500/10 border-blue-500/20'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${contact.is_read ? 'bg-gray-600' : 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]'}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${contact.is_read ? 'text-gray-500' : 'text-blue-400'}`}>
                        {contact.is_read ? 'Read' : 'New'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-gray-600 font-medium">No recent inquiries found.</p>
            )}
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-[#0B1526] border border-white/5 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight">Latest Applications</h2>
            <div className="p-2.5 bg-indigo-500/10 rounded-xl">
               <FileText size={20} className="text-indigo-400" />
            </div>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-white/5 rounded-2xl" />
                ))}
              </div>
            ) : recentApplications.length > 0 ? (
              recentApplications.map((app) => (
                <div key={app.id} className="group p-5 bg-white/5 hover:bg-white/[0.08] border border-white/5 rounded-2xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-sm">
                        {app.first_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white mb-1">{app.first_name} {app.last_name}</p>
                        <p className="text-[11px] font-semibold text-gray-500">{app.role_name || 'General'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded-full border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{app.status}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-gray-600 font-medium">No recent applications found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
