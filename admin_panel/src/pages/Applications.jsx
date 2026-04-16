import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FileText, Download, Search, User, Mail, Phone, MapPin, 
  Briefcase, Calendar, DollarSign, Globe, Filter, ChevronDown, 
  ChevronRight, Users, ShieldCheck, X, Linkedin, Github, ExternalLink,
  Clock, CreditCard, Building, MessageSquare
} from 'lucide-react';
import { buildApiUrl, API_CONFIG } from '../config/api';

const STATUS_COLORS = {
  new: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', gradient: 'from-amber-500 to-orange-500', label: 'New Arrival' },
  reviewing: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-indigo-500', label: 'In Review' },
  shortlisted: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', gradient: 'from-emerald-500 to-teal-500', label: 'Shortlisted' },
  rejected: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', gradient: 'from-rose-500 to-red-500', label: 'Rejected' },
  accepted: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', gradient: 'from-violet-500 to-purple-500', label: 'Accepted' },
};

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openFullDossier(app) {
    console.log('Opening dossier for:', app.first_name);
    setSelectedApp(app);
    setIsModalOpen(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appsRes, jobsRes] = await Promise.all([
        axios.get(buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.APPLICATIONS)),
        axios.get(buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.JOB)),
      ]);
      setApplications(appsRes.data);
      setJobs(jobsRes.data);
    } catch (error) {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.APPLICATIONS)}${id}/`, { status: newStatus });
      const updatedApps = applications.map((app) => (app.id === id ? { ...app, status: newStatus } : app));
      setApplications(updatedApps);
      if (selectedApp?.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
      toast.success(`Status updated to ${STATUS_COLORS[newStatus].label}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredApps = applications.filter((app) => {
    const fullName = `${app.first_name} ${app.last_name}`.toLowerCase();
    const email = app.email.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    const matchesSearch = fullName.includes(search) || email.includes(search);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesJob = jobFilter === 'all' || (app.role && app.role.toString() === jobFilter.toString());
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getResumeUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${API_CONFIG.BASE_URL}${path}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="font-['Inter'] max-w-[1600px] mx-auto pb-20"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
            Talent Pipeline
          </h1>
          <p className="text-gray-500 font-medium">Curating the next generation of industry leaders</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-lg shadow-blue-500/10"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
            <Users size={18} />
          </div>
          <div>
            <span className="text-xl font-black text-gray-900 block leading-none">{applications.length}</span>
            <span className="text-gray-400 text-[9px] font-semibold uppercase tracking-wider">Total Candidates</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-8"
      >
        <div className="xl:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm shadow-sm hover:shadow-md"
          />
        </div>
        <div className="flex gap-3 xl:col-span-2">
          <div className="relative flex-1">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={15} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-blue-400 transition-all font-semibold text-xs uppercase tracking-wider appearance-none cursor-pointer shadow-sm hover:shadow-md"
            >
              <option value="all">All Phases</option>
              {Object.keys(STATUS_COLORS).map(status => (
                <option key={status} value={status}>{STATUS_COLORS[status].label}</option>
              ))}
            </select>
          </div>
          <div className="relative flex-1">
            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={15} />
            <select
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-blue-400 transition-all font-semibold text-xs uppercase tracking-wider appearance-none cursor-pointer shadow-sm hover:shadow-md"
            >
              <option value="all">All Roles</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Candidate List */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[90px] bg-gray-100 rounded-2xl animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {filteredApps.map((app, idx) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => openFullDossier(app)}
                  className={`relative group cursor-pointer transition-all duration-300 rounded-2xl p-4 border-2 ${
                    selectedApp?.id === app.id 
                      ? `bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg shadow-blue-500/10` 
                      : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-lg'
                  }`}
                >
                  {/* Gradient Glow on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${STATUS_COLORS[app.status]?.gradient} opacity-0 group-hover:opacity-[0.03] rounded-2xl transition-opacity duration-500`} />
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 6, scale: 1.1 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg transition-all duration-300 ${
                        selectedApp?.id === app.id 
                          ? `bg-gradient-to-br ${STATUS_COLORS[app.status]?.gradient} shadow-lg` 
                          : 'bg-gradient-to-br from-gray-600 to-gray-700'
                      }`}
                    >
                      {app.first_name.charAt(0)}
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {app.first_name} {app.last_name}
                        </h3>
                        <span className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-wide border ${STATUS_COLORS[app.status]?.bg} ${STATUS_COLORS[app.status]?.text} ${STATUS_COLORS[app.status]?.border}`}>
                          {STATUS_COLORS[app.status]?.label}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-gray-400 font-medium text-[11px]">
                        <span className="flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">
                          <Mail size={11} className="text-blue-400" /> {app.email}
                        </span>
                        <span className="flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">
                          <Briefcase size={11} className="text-blue-400" /> {app.role_title || 'General'}
                        </span>
                        {app.location && (
                          <span className="flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">
                            <MapPin size={11} className="text-blue-400" /> {app.location}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="hidden sm:flex flex-col items-end gap-1.5">
                       <p className="text-gray-300 text-[9px] font-semibold uppercase tracking-wider">{formatDate(app.applied_at)}</p>
                       <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          selectedApp?.id === app.id ? `bg-gradient-to-br ${STATUS_COLORS[app.status]?.gradient} border-transparent text-white` : 'border-gray-200 text-gray-300 group-hover:border-blue-300 group-hover:text-blue-400'
                        }`}
                       >
                         <ChevronRight size={14} />
                       </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-gray-300" />
              </div>
              <h3 className="text-base font-bold text-gray-700 mb-1">No Candidates Found</h3>
              <p className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">Adjust filters to see more dossiers</p>
            </div>
          )}
        </div>

        {/* Selected Summary Panel */}
        <div className="lg:col-span-5 xl:col-span-4">
          {selectedApp ? (
            <motion.div
              key={selectedApp.id}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-32 shadow-lg overflow-hidden relative group"
            >
              {/* Animated Gradient */}
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${STATUS_COLORS[selectedApp.status]?.gradient} opacity-[0.05] rounded-full blur-[60px] group-hover:opacity-[0.1] transition-opacity duration-700`} />
              
              <div className="text-center mb-6 relative z-10">
                <motion.div 
                  whileHover={{ rotate: 6, scale: 1.05 }}
                  className="relative inline-block mb-4"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${STATUS_COLORS[selectedApp.status]?.gradient} flex items-center justify-center text-white text-3xl font-black shadow-xl`}>
                    {selectedApp.first_name.charAt(0)}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-lg border-2 border-white bg-gradient-to-br ${STATUS_COLORS[selectedApp.status]?.gradient} flex items-center justify-center`}>
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                </motion.div>
                
                <h2 className="text-lg font-bold text-gray-900 mb-1.5">{selectedApp.first_name} {selectedApp.last_name}</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                   <Briefcase size={12} className="text-blue-500" />
                   <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">{selectedApp.role_title || 'General Application'}</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-6">
                {selectedApp.email && (
                  <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-50 hover:border-gray-100 hover:bg-blue-50/30 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                      <Mail size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                      <a href={`mailto:${selectedApp.email}`} className="text-gray-900 font-semibold text-xs truncate block hover:text-blue-600 transition-colors">{selectedApp.email}</a>
                    </div>
                  </motion.div>
                )}
                {selectedApp.phone && (
                  <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-50 hover:border-gray-100 hover:bg-blue-50/30 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                      <Phone size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-gray-900 font-semibold text-xs">{selectedApp.phone}</p>
                    </div>
                  </motion.div>
                )}
                {selectedApp.location && (
                  <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-50 hover:border-gray-100 hover:bg-blue-50/30 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                      <MapPin size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Location</p>
                      <p className="text-gray-900 font-semibold text-xs">{selectedApp.location}</p>
                    </div>
                  </motion.div>
                )}
                {selectedApp.years_experience && (
                  <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-50 hover:border-gray-100 hover:bg-blue-50/30 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                      <Calendar size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Experience</p>
                      <p className="text-gray-900 font-semibold text-xs">{selectedApp.years_experience} Years</p>
                    </div>
                  </motion.div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all mb-2.5 text-[10px] uppercase tracking-wider"
              >
                View Full Dossier
              </motion.button>

              {selectedApp.resume && (
                <a
                  href={getResumeUrl(selectedApp.resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider text-[10px]"
                >
                  <Download size={14} />
                  Download Resume
                </a>
              )}
            </motion.div>
          ) : (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center sticky top-32 shadow-sm">
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                 <User size={28} className="text-gray-300" />
              </div>
              <h3 className="text-sm font-bold text-gray-600 mb-1">Review Pending</h3>
              <p className="text-gray-300 font-medium uppercase tracking-wider text-[9px]">Select a candidate dossier to begin</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedApp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-[1200px] h-full max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Gradient Header Bar */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${STATUS_COLORS[selectedApp.status]?.gradient}`} />
              
              {/* Modal Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 transition-all z-[110]"
              >
                <X size={18} />
              </button>

              {/* Left Column: Full Details */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 border-r border-gray-100">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-5 mb-8"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${STATUS_COLORS[selectedApp.status]?.gradient} flex items-center justify-center text-white text-3xl font-black shadow-xl`}>
                    {selectedApp.first_name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{selectedApp.first_name} {selectedApp.last_name}</h2>
                      <span className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-wide border ${STATUS_COLORS[selectedApp.status]?.bg} ${STATUS_COLORS[selectedApp.status]?.text} ${STATUS_COLORS[selectedApp.status]?.border}`}>
                        {STATUS_COLORS[selectedApp.status]?.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                       <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                         <Briefcase size={12} className="text-blue-500" />
                         <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">{selectedApp.role_title || 'General Application'}</span>
                       </div>
                       <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                         <Clock size={12} className="text-indigo-400" />
                         <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Applied: {formatDate(selectedApp.applied_at)}</span>
                       </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  <section>
                    <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 flex items-center gap-2">
                      <User size={11} /> Contact Information
                    </h3>
                    <div className="space-y-2.5">
                      <DetailRow icon={Mail} label="Professional Email" value={selectedApp.email} isLink link={`mailto:${selectedApp.email}`} />
                      <DetailRow icon={Phone} label="Direct Contact" value={selectedApp.phone} />
                      <DetailRow icon={MapPin} label="Current Location" value={selectedApp.location} />
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 flex items-center gap-2">
                      <Building size={11} /> Career Overview
                    </h3>
                    <div className="space-y-2.5">
                      <DetailRow icon={Calendar} label="Years of Experience" value={`${selectedApp.years_experience} Years`} />
                      <DetailRow icon={Clock} label="Notice Period" value={selectedApp.notice_period} />
                      <div className="grid grid-cols-2 gap-2.5">
                        <DetailRow icon={CreditCard} label="Current CTC" value={selectedApp.current_ctc} />
                        <DetailRow icon={DollarSign} label="Expected CTC" value={selectedApp.expected_ctc} />
                      </div>
                    </div>
                  </section>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                   <section>
                    <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 flex items-center gap-2">
                      <Globe size={11} /> Social & Web Presence
                    </h3>
                    <div className="space-y-2.5">
                      {selectedApp.linkedin && (
                        <a href={selectedApp.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-[#0A66C2]/5 border border-[#0A66C2]/20 rounded-xl group/link hover:bg-[#0A66C2]/10 transition-all">
                          <div className="flex items-center gap-2.5">
                            <Linkedin className="text-[#0A66C2]" size={16} />
                            <span className="text-xs font-bold text-gray-700">LinkedIn Profile</span>
                          </div>
                          <ExternalLink size={13} className="text-gray-400 group-hover/link:text-gray-600 transition-colors" />
                        </a>
                      )}
                      {selectedApp.github && (
                        <a href={selectedApp.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl group/link hover:bg-gray-100 transition-all">
                          <div className="flex items-center gap-2.5">
                            <Github className="text-gray-700" size={16} />
                            <span className="text-xs font-bold text-gray-700">GitHub Repository</span>
                          </div>
                          <ExternalLink size={13} className="text-gray-400 group-hover/link:text-gray-600 transition-colors" />
                        </a>
                      )}
                      {selectedApp.portfolio && (
                        <a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl group/link hover:bg-blue-100 transition-all">
                          <div className="flex items-center gap-2.5">
                            <Globe className="text-blue-500" size={16} />
                            <span className="text-xs font-bold text-gray-700">Personal Portfolio</span>
                          </div>
                          <ExternalLink size={13} className="text-gray-400 group-hover/link:text-gray-600 transition-colors" />
                        </a>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 flex items-center gap-2">
                      <ShieldCheck size={11} /> Status Management
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <label className="text-[9px] font-semibold text-gray-400 uppercase tracking-[2px] mb-3 block">Workflow Phase</label>
                       <div className="relative">
                        <select
                          value={selectedApp.status}
                          onChange={(e) => updateStatus(selectedApp.id, e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold text-[10px] uppercase tracking-wider focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer"
                        >
                          {Object.keys(STATUS_COLORS).map((status) => (
                            <option key={status} value={status}>{STATUS_COLORS[status].label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={15} />
                      </div>
                    </div>
                  </section>
                </div>

                {selectedApp.cover_letter && (
                  <section className="mb-6">
                    <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 flex items-center gap-2">
                      <MessageSquare size={11} /> Candidate Statement
                    </h3>
                    <div className="p-5 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-100">
                      <p className="text-gray-600 text-[13px] font-medium leading-relaxed whitespace-pre-wrap italic">
                        "{selectedApp.cover_letter}"
                      </p>
                    </div>
                  </section>
                )}
              </div>

              {/* Right Column: Resume View */}
              <div className="w-full lg:w-[450px] xl:w-[550px] bg-gradient-to-br from-gray-50 to-blue-50/20 flex flex-col">
                <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-white/50">
                   <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                     <FileText size={15} className="text-blue-500" /> Resume Dossier
                   </h3>
                   <div className="flex items-center gap-3">
                     <a
                      href={getResumeUrl(selectedApp.resume)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:text-blue-700 transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink size={13} /> Open
                    </a>
                     <a
                      href={getResumeUrl(selectedApp.resume)}
                      download
                      className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wider hover:text-emerald-700 transition-colors"
                    >
                      <Download size={13} /> Download
                    </a>
                   </div>
                </div>
                
                <div className="flex-1 bg-white relative overflow-hidden">
                  {selectedApp.resume ? (
                    <object
                      data={getResumeUrl(selectedApp.resume)}
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                         <FileText size={40} className="text-gray-300 mb-3" />
                         <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-4">PDF Preview not supported</p>
                         <a
                          href={getResumeUrl(selectedApp.resume)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl uppercase tracking-wider text-[10px] hover:bg-blue-700 transition-all"
                        >
                          Open Document Externally
                        </a>
                      </div>
                    </object>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                       <FileText size={48} className="text-gray-200 mb-3" />
                       <p className="text-gray-400 font-semibold uppercase tracking-wider text-xs">Resume not found in system</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailRow({ icon: Icon, label, value, isLink, link }) {
  return (
    <motion.div 
      whileHover={{ x: 4 }}
      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-50 hover:border-gray-100 hover:bg-blue-50/30 transition-all group/row"
    >
      <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover/row:text-blue-500 group-hover/row:bg-blue-50 transition-all">
        <Icon size={15} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        {isLink ? (
          <a href={link} className="text-gray-900 font-semibold text-xs truncate block hover:text-blue-600 transition-colors">{value}</a>
        ) : (
          <p className="text-gray-900 font-semibold text-xs truncate">{value || 'N/A'}</p>
        )}
      </div>
    </motion.div>
  );
}
