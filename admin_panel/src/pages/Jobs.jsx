import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Briefcase, Plus, Edit2, Trash2, X, MapPin, Users, Search } from 'lucide-react';
import { buildApiUrl, API_CONFIG } from '../config/api';

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
      const res = await axios.get(buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.JOB));
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
        await axios.put(`${buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.JOB)}${editingJob.id}/`, payload);
        toast.success('Job role updated successfully');
      } else {
        await axios.post(buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.JOB), payload);
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
      await axios.patch(`${buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.JOB)}${job.id}/`, { is_active: !job.is_active });
      setJobs(jobs.map((j) => (j.id === job.id ? { ...j, is_active: !j.is_active } : j)));
      toast.success(`Job ${job.is_active ? 'deactivated' : 'activated'}`);
    } catch (error) {
      toast.error('Failed to update job status');
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job role?')) return;
    try {
      await axios.delete(`${buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.JOB)}${id}/`);
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-['Inter']">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
            Open Roles
          </h1>
          <p className="text-gray-500 font-medium">Manage career openings displayed on your website</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal()}
          className="flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all uppercase tracking-wider text-[11px]"
        >
          <Plus size={18} />
          Create Position
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-8 group"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
        <input
          type="text"
          placeholder="Search positions by title or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm shadow-sm"
        />
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse h-48 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`relative bg-white border rounded-2xl p-6 transition-all duration-300 group hover:shadow-xl ${
                job.is_active ? 'border-gray-100' : 'border-gray-100 opacity-60 grayscale'
              }`}
            >
              {/* Gradient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${job.is_active ? 'from-blue-500/5 to-indigo-500/5' : 'from-gray-500/5 to-gray-500/5'} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                      job.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Users size={12} className="text-blue-400" /> {job.department}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-blue-400" /> {job.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-xs mb-5 line-clamp-2 font-medium leading-relaxed">{job.description}</p>

              {job.points && job.points.length > 0 && (
                <ul className="space-y-1.5 mb-5">
                  {job.points.slice(0, 3).map((point, i) => (
                    <li key={i} className="text-gray-400 text-xs flex items-start gap-2.5 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                      {point}
                    </li>
                  ))}
                  {job.points.length > 3 && (
                    <li className="text-gray-300 text-[10px] font-bold uppercase tracking-wider pl-4">+{job.points.length - 3} more requirements</li>
                  )}
                </ul>
              )}

              <div className="flex items-center gap-2.5 pt-5 border-t border-gray-100">
                <button
                  onClick={() => toggleJobStatus(job)}
                  className={`flex-1 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all ${
                    job.is_active
                      ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                >
                  {job.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => openModal(job)}
                  className="p-2 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-500 rounded-lg border border-gray-100 transition-all"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => deleteJob(job.id)}
                  className="p-2 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg border border-gray-100 transition-all"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center shadow-sm">
          <Briefcase size={40} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4">No job roles found in database</p>
          <button onClick={() => openModal()} className="px-6 py-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl font-bold uppercase tracking-wider text-[10px] hover:bg-blue-100 transition-all">
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              className="bg-white border border-gray-100 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    {editingJob ? 'Update Role' : 'New Position'}
                  </h2>
                  <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mt-0.5">Role Configuration</p>
                </div>
                <button onClick={closeModal} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all border border-gray-100">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm"
                    placeholder="e.g. Senior Machine Learning Engineer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Office Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm"
                      placeholder="e.g. Remote / Head Office"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Role Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm leading-relaxed resize-none"
                    placeholder="Provide a detailed overview of the role..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Key Requirements</label>
                  <div className="space-y-3">
                    {formData.points.map((point, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => handlePointChange(index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm"
                          placeholder={`Requirement ${index + 1}`}
                        />
                        {formData.points.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePoint(index)}
                            className="w-10 h-10 flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl self-start transition-all"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addPoint}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-500 hover:text-blue-600 transition-colors pl-1"
                  >
                    <Plus size={13} /> Add Requirement
                  </button>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_active"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <label htmlFor="is_active" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Status</label>
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 bg-gray-50 text-gray-500 border border-gray-200 rounded-xl font-bold uppercase tracking-wider text-[11px] hover:bg-gray-100 transition-all"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider text-[11px]"
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
