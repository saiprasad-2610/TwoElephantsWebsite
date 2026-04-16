import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Briefcase, FileText, Newspaper, TrendingUp, Clock, CheckCircle, Eye } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'https://twoelephantswebsitebackend.onrender.com/api';

const statCards = [
  { label: 'Contact Inquiries', icon: Mail, gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/30', key: 'contacts', delay: 0 },
  { label: 'Job Roles', icon: Briefcase, gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/30', key: 'jobs', delay: 0.1 },
  { label: 'Applications', icon: FileText, gradient: 'from-orange-500 to-red-500', shadow: 'shadow-orange-500/30', key: 'applications', delay: 0.2 },
  { label: 'Articles', icon: Newspaper, gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/30', key: 'articles', delay: 0.3 },
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
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="font-['Inter']">
      <motion.div variants={item} className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          System Overview
        </h1>
        <p className="text-gray-500 font-medium">Welcome back! Here's a snapshot of your platform's activity.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.key}
              variants={item}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="relative bg-white border border-gray-100 rounded-2xl p-6 overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Animated Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500`} />
              
              {/* Corner Glow */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.gradient} rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-700`} />
              
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ rotate: 6, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-5 shadow-lg ${stat.shadow}`}
                >
                  <Icon size={22} className="text-white" />
                </motion.div>
                <h3 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">{stats[stat.key]}</h3>
                <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">{stat.label}</p>
              </div>

              {/* Bottom Gradient Line */}
              <motion.div 
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <motion.div variants={item} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:blur-[80px] transition-all duration-700" />
          
          <div className="flex items-center justify-between mb-6 relative">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ rotate: 6, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30"
              >
                <Mail size={18} className="text-white" />
              </motion.div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Recent Inquiries</h2>
            </div>
            <div className="px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">New</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[72px] bg-gray-50 rounded-xl" />
                ))}
              </div>
            ) : recentContacts.length > 0 ? (
              recentContacts.map((contact, idx) => (
                <motion.div 
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group/item p-4 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50 border border-gray-50 hover:border-blue-100 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <motion.div 
                        whileHover={{ rotate: 6, scale: 1.1 }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md ${
                          !contact.is_read 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-500' 
                            : 'bg-gradient-to-br from-gray-400 to-gray-500'
                        }`}
                      >
                        {contact.fname.charAt(0)}
                      </motion.div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 mb-0.5 flex items-center gap-2">
                          {contact.fname} {contact.lname}
                          {!contact.is_read && (
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-blue-500 rounded-full"
                            />
                          )}
                        </p>
                        <p className="text-[11px] font-medium text-gray-400">{contact.email}</p>
                      </div>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
                        contact.is_read 
                          ? 'bg-gray-50 border-gray-100' 
                          : 'bg-blue-50 border-blue-100'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${contact.is_read ? 'bg-gray-300' : 'bg-blue-500 animate-pulse'}`} />
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${contact.is_read ? 'text-gray-400' : 'text-blue-500'}`}>
                        {contact.is_read ? 'Read' : 'New'}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 font-medium text-sm">No recent inquiries found.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Latest Applications */}
        <motion.div variants={item} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:blur-[80px] transition-all duration-700" />
          
          <div className="flex items-center justify-between mb-6 relative">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ rotate: 6, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30"
              >
                <FileText size={18} className="text-white" />
              </motion.div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Latest Applications</h2>
            </div>
            <div className="px-3 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Pipeline</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[72px] bg-gray-50 rounded-xl" />
                ))}
              </div>
            ) : recentApplications.length > 0 ? (
              recentApplications.map((app, idx) => (
                <motion.div 
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group/item p-4 bg-gradient-to-r from-gray-50 to-white hover:from-indigo-50 hover:to-purple-50 border border-gray-50 hover:border-indigo-100 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <motion.div 
                        whileHover={{ rotate: 6, scale: 1.1 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md"
                      >
                        {app.first_name ? app.first_name.charAt(0) : 'A'}
                      </motion.div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 mb-0.5">{app.first_name} {app.last_name}</p>
                        <p className="text-[11px] font-medium text-gray-400">{app.role_title || 'General'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider">{app.status || 'New'}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 font-medium text-sm">No recent applications found.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
