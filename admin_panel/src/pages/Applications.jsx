import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FileText, Download, Eye, Search, User, Mail, Phone, MapPin, Briefcase, Calendar, DollarSign, Globe, Filter } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

const STATUS_COLORS = {
  new: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'New' },
  reviewing: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Under Review' },
  shortlisted: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Shortlisted' },
  rejected: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Rejected' },
  accepted: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Accepted' },
};

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appsRes, jobsRes] = await Promise.all([
        axios.get(`${API_BASE}/applications/`),
        axios.get(`${API_BASE}/jobs/`),
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
      await axios.patch(`${API_BASE}/applications/${id}/`, { status: newStatus });
      setApplications(applications.map((app) => (app.id === id ? { ...app, status: newStatus } : app)));
      if (selectedApp) setSelectedApp({ ...selectedApp, status: newStatus });
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      `${app.first_name} ${app.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesJob = jobFilter === 'all' || (app.role && app.role === parseInt(jobFilter));
    return matchesSearch && matchesStatus && matchesJob;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-['Ubuntu_Sans']">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Talent Pipeline</h1>
          <p className="text-gray-500 font-medium">Review and manage job applications from candidates</p>
        </div>
        <div className="bg-[#0B1526] border border-white/5 rounded-[24px] px-6 py-4 shadow-xl">
          <span className="text-3xl font-black text-blue-400">{applications.length}</span>
          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-3">Candidates</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-[#0B1526] border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-6 py-4 bg-[#0B1526] border border-white/5 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold appearance-none min-w-[180px]"
          >
            <option value="all">Status: All</option>
            {Object.keys(STATUS_COLORS).map(status => (
              <option key={status} value={status}>{STATUS_COLORS[status].label}</option>
            ))}
          </select>
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="px-6 py-4 bg-[#0B1526] border border-white/5 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold appearance-none min-w-[220px]"
          >
            <option value="all">Position: All</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-white/5 rounded-[24px] animate-pulse" />
              ))}
            </div>
          ) : filteredApps.length > 0 ? (
            <div className="space-y-5">
              {filteredApps.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedApp(app)}
                  className={`bg-[#0B1526] border rounded-[28px] p-6 cursor-pointer transition-all duration-300 group ${
                    selectedApp?.id === app.id 
                      ? 'border-blue-500/50 bg-blue-500/[0.03] shadow-lg shadow-blue-500/5' 
                      : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                      {app.first_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-white font-black text-lg group-hover:text-blue-400 transition-colors tracking-tight">{app.first_name} {app.last_name}</h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${STATUS_COLORS[app.status]?.bg} ${STATUS_COLORS[app.status]?.text}`}>
                          {STATUS_COLORS[app.status]?.label}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm font-bold mb-3">{app.email}</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                        {app.role_name && <span className="flex items-center gap-2"><Briefcase size={14} className="text-blue-500/50" /> {app.role_name}</span>}
                        {app.years_experience && <span className="flex items-center gap-2"><Calendar size={14} className="text-blue-500/50" /> {app.years_experience} Exp</span>}
                        {app.location && <span className="flex items-center gap-2"><MapPin size={14} className="text-blue-500/50" /> {app.location}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">{formatDate(app.created_at)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0B1526] border border-white/5 rounded-[32px] p-20 text-center shadow-xl">
              <FileText size={48} className="mx-auto text-gray-700 mb-6" />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No applications matching your criteria</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          {selectedApp ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0B1526] border border-white/5 rounded-[40px] p-10 sticky top-32 shadow-2xl overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -z-10" />
              
              <div className="mb-10 text-center">
                <div className="w-24 h-24 rounded-[32px] bg-gradient-to-tr from-blue-600 to-indigo-500 mx-auto flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/20 mb-6">
                  {selectedApp.first_name.charAt(0)}
                </div>
                <h4 className="text-white font-black text-2xl tracking-tight mb-2">{selectedApp.first_name} {selectedApp.last_name}</h4>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                   <Briefcase size={12} className="text-blue-400" />
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedApp.role_name || 'General Application'}</p>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 group/item">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover/item:text-blue-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Contact Email</p>
                    <a href={`mailto:${selectedApp.email}`} className="text-white font-bold text-sm truncate block hover:text-blue-400 transition-colors">{selectedApp.email}</a>
                  </div>
                </div>
                {selectedApp.phone && (
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover/item:text-blue-400 transition-colors">
                      <Phone size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Phone Number</p>
                      <p className="text-white font-bold text-sm">{selectedApp.phone}</p>
                    </div>
                  </div>
                )}
                {selectedApp.location && (
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover/item:text-blue-400 transition-colors">
                      <MapPin size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Location</p>
                      <p className="text-white font-bold text-sm">{selectedApp.location}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-10 p-6 bg-black/20 rounded-3xl border border-white/5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-4 block">Application Status</label>
                <select
                  value={selectedApp.status}
                  onChange={(e) => updateStatus(selectedApp.id, e.target.value)}
                  className="w-full px-5 py-4 bg-[#0B1526] border border-white/5 rounded-2xl text-white font-black text-xs uppercase tracking-widest focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none"
                >
                  {Object.keys(STATUS_COLORS).map((status) => (
                    <option key={status} value={status}>{STATUS_COLORS[status].label}</option>
                  ))}
                </select>
              </div>

              {selectedApp.resume && (
                <a
                  href={`${BACKEND_BASE}${selectedApp.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
                >
                  <Download size={18} />
                  Download Dossier
                </a>
              )}
            </motion.div>
          ) : (
            <div className="bg-[#0B1526] border border-white/5 rounded-[40px] p-20 text-center sticky top-32 shadow-xl border-dashed">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <User size={40} className="text-gray-700" />
              </div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Select a candidate dossier to begin review</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
