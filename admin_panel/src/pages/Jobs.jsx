import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Briefcase, Plus, Edit2, Trash2, X, MapPin, Users, Search } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

const DEPARTMENTS = ['Engineering', 'AI & Research', 'Design', 'Marketing', 'Sales', 'HR', 'Other'];

const initialFormState = {
  title: '',
  department: 'Engineering',
  location: '',
  description: '',
  points: [''],
  is_active: true,
};

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/jobs/`);
      setJobs(res.data);
    } catch (error) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...formData.points];
    newPoints[index] = value;
    setFormData({ ...formData, points: newPoints });
  };

  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ''] });
  };

  const removePoint = (index) => {
    if (formData.points.length > 1) {
      setFormData({ ...formData, points: formData.points.filter((_, i) => i !== index) });
    }
  };

  const openModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        description: job.description,
        points: job.points && job.points.length > 0 ? job.points : [''],
        is_active: job.is_active,
      });
    } else {
      setEditingJob(null);
      setFormData(initialFormState);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingJob(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      points: formData.points.filter((p) => p.trim() !== ''),
    };

    try {
      if (editingJob) {
        await axios.put(`${API_BASE}/jobs/${editingJob.id}/`, payload);
        toast.success('Job role updated successfully');
      } else {
        await axios.post(`${API_BASE}/jobs/`, payload);
        toast.success('Job role created successfully');
      }
      fetchJobs();
      closeModal();
    } catch (error) {
      toast.error(editingJob ? 'Failed to update job' : 'Failed to create job');
    }
  };

  const toggleJobStatus = async (job) => {
    try {
      await axios.patch(`${API_BASE}/jobs/${job.id}/`, { is_active: !job.is_active });
      setJobs(jobs.map((j) => (j.id === job.id ? { ...j, is_active: !j.is_active } : j)));
      toast.success(`Job ${job.is_active ? 'deactivated' : 'activated'}`);
    } catch (error) {
      toast.error('Failed to update job status');
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job role?')) return;
    try {
      await axios.delete(`${API_BASE}/jobs/${id}/`);
      setJobs(jobs.filter((j) => j.id !== id));
      toast.success('Job role deleted');
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-['Ubuntu_Sans']">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Open Roles</h1>
          <p className="text-gray-500 font-medium">Manage career openings displayed on your website</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
        >
          <Plus size={20} />
          Create Position
        </button>
      </div>

      <div className="relative mb-10 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
        <input
          type="text"
          placeholder="Search positions by title or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-[#0B1526] border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse h-56 bg-white/5 rounded-[32px]" />
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-[#0B1526] border rounded-[32px] p-8 transition-all duration-500 group hover:border-blue-500/30 shadow-xl ${
                job.is_active ? 'border-white/5' : 'border-white/5 opacity-60 grayscale'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">{job.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      job.is_active ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                    <span className="flex items-center gap-2">
                      <Users size={14} className="text-blue-500/50" /> {job.department}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className="text-blue-500/50" /> {job.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">{job.description}</p>

              {job.points && job.points.length > 0 && (
                <ul className="space-y-2 mb-8">
                  {job.points.slice(0, 3).map((point, i) => (
                    <li key={i} className="text-gray-400 text-xs flex items-start gap-3 font-semibold">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                      {point}
                    </li>
                  ))}
                  {job.points.length > 3 && (
                    <li className="text-gray-600 text-[10px] font-black uppercase tracking-widest pl-4.5">+{job.points.length - 3} more requirements</li>
                  )}
                </ul>
              )}

              <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                <button
                  onClick={() => toggleJobStatus(job)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                    job.is_active
                      ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
                      : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                  }`}
                >
                  {job.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => openModal(job)}
                  className="p-2.5 bg-white/5 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 rounded-xl border border-white/5 transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => deleteJob(job.id)}
                  className="p-2.5 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-xl border border-white/5 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0B1526] border border-white/5 rounded-[32px] p-20 text-center shadow-xl">
          <Briefcase size={48} className="mx-auto text-gray-700 mb-6" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-6">No job roles found in database</p>
          <button onClick="{() => openModal()}" className="px-8 py-3.5 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600/20 transition-all">
            Create your first job opening
          </button>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#080E1C]/90 backdrop-blur-xl flex items-center justify-center z-50 p-6"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-[#0B1526] border border-white/10 rounded-[40px] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="bg-[#0B1526] border-b border-white/5 px-10 py-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    {editingJob ? 'Update Role' : 'New Position'}
                  </h2>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Role Configuration</p>
                </div>
                <button onClick={closeModal} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-lg"
                    placeholder="e.g. Senior Machine Learning Engineer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Office Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                      placeholder="e.g. Remote / Head Office"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Role Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-6 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 transition-all font-medium leading-relaxed resize-none"
                    placeholder="Provide a detailed overview of the role..."
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Key Requirements</label>
                  <div className="space-y-4">
                    {formData.points.map((point, index) => (
                      <div key={index} className="flex gap-4 group">
                        <input
                          type="text"
                          value={point}
                          onChange="{(e) => handlePointChange(index, e.target.value)}"
                          className="flex-1 px-6 py-4 bg-black/20 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                          placeholder={`Requirement ${index + 1}`}
                        />
                        {formData.points.length > 1 && (
                          <button
                            type="button"
                            onClick="{() => removePoint(index)}"
                            className="w-12 h-12 flex items-center justify-center text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-2xl self-start transition-all"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addPoint}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[2px] text-blue-400 hover:text-blue-300 transition-colors pl-1"
                  >
                    <Plus size={14} /> Add Requirement
                  </button>
                </div>

                <div className="flex items-center gap-4 p-6 bg-black/20 border border-white/5 rounded-[32px]">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_active"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <label htmlFor="is_active" className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Status</label>
                </div>

                <div className="flex gap-6 pt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-4 bg-white/5 text-gray-400 border border-white/5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
                  >
                    {editingJob ? 'Commit Updates' : 'Launch Role'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
