import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, Search, Check, X, MessageSquare, MapPin, Globe, Trash2, Clock, ChevronDown, ExternalLink, Send } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [replySubject, setReplySubject] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/contacts/`);
      setContacts(res.data);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const contact = contacts.find((c) => c.id === id);
      await axios.patch(`${API_BASE}/contacts/${id}/`, { ...contact, is_read: true });
      setContacts(contacts.map((c) => (c.id === id ? { ...c, is_read: true } : c)));
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, is_read: true });
      }
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      await axios.delete(`${API_BASE}/contacts/${id}/`);
      setContacts(contacts.filter((c) => c.id !== id));
      setSelectedContact(null);
      setIsModalOpen(false);
      toast.success('Contact deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      `${contact.fname} ${contact.lname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'read' && contact.is_read) || (filter === 'unread' && !contact.is_read);
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const openFullDossier = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const openReplyModal = () => {
    setReplySubject(`Re: Your inquiry from ${formatDate(selectedContact.submitted_at)}`);
    setReplyMessage(`Dear ${selectedContact.fname} ${selectedContact.lname},\n\nThank you for your interest in ${selectedContact.interest || 'our services'}. We have received your message and will get back to you shortly.\n\nBest regards,\nTwo Elephants Team`);
    setIsReplyModalOpen(true);
  };

  const sendEmail = () => {
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedContact.email)}&su=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyMessage)}`;
    window.open(gmailComposeUrl, '_blank');
    setIsReplyModalOpen(false);
    toast.success('Gmail compose opened with your message');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="font-['Inter'] max-w-[1600px] mx-auto pb-20"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
            Client Inquiries
          </h1>
          <p className="text-gray-500 font-medium">Manage all contact form submissions from your website</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-lg shadow-blue-500/10"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
            <Mail size={18} />
          </div>
          <div>
            <span className="text-xl font-black text-gray-900 block leading-none">{contacts.filter((c) => !c.is_read).length}</span>
            <span className="text-gray-400 text-[9px] font-semibold uppercase tracking-wider">Unread Inquiries</span>
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
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm shadow-sm hover:shadow-md"
          />
        </div>
        <div className="flex gap-3 xl:col-span-2">
          {['all', 'unread', 'read'].map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`flex-1 px-5 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all ${
                filter === f 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-blue-200 hover:shadow-sm'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Contact List */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[90px] bg-gray-100 rounded-2xl animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : filteredContacts.length > 0 ? (
            filteredContacts.map((contact, idx) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => openFullDossier(contact)}
                className={`relative group cursor-pointer transition-all duration-300 rounded-2xl p-4 border-2 ${
                  selectedContact?.id === contact.id 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg shadow-blue-500/10' 
                    : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-lg'
                } ${!contact.is_read ? 'border-l-4 border-l-blue-500' : ''}`}
              >
                {/* Gradient Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/[0.02] group-hover:to-indigo-500/[0.02] rounded-2xl transition-opacity duration-500" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 6, scale: 1.1 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg transition-all duration-300 ${
                      !contact.is_read 
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-blue-500/30 -rotate-3' 
                        : 'bg-gradient-to-br from-gray-500 to-gray-600'
                    }`}
                  >
                    {contact.fname.charAt(0)}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{contact.fname} {contact.lname}</h3>
                      {!contact.is_read && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[8px] font-bold uppercase tracking-wider rounded-full border border-blue-100"
                        >
                          New
                        </motion.span>
                      )}
                    </div>
                    <p className="text-gray-400 text-[13px] font-medium mb-1.5">{contact.email}</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-medium text-gray-400">
                      {contact.location && <span className="flex items-center gap-1.5"><MapPin size={11} className="text-blue-400" /> {contact.location}</span>}
                      {contact.interest && <span className="flex items-center gap-1.5"><Globe size={11} className="text-blue-400" /> {contact.interest}</span>}
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-1.5">
                    <p className="text-gray-300 text-[9px] font-semibold uppercase tracking-wider">{formatDate(contact.submitted_at)}</p>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        selectedContact?.id === contact.id ? 'bg-gradient-to-br from-blue-500 to-indigo-500 border-transparent text-white' : 'border-gray-200 text-gray-300 group-hover:border-blue-300 group-hover:text-blue-400'
                      }`}
                    >
                      <ChevronDown size={14} className="rotate-[-90deg]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center shadow-sm">
              <Mail size={32} className="mx-auto text-gray-200 mb-3" />
              <p className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">No inquiries found in database</p>
            </div>
          )}
        </div>

        {/* Selected Summary Panel */}
        <div className="lg:col-span-5 xl:col-span-4">
          {selectedContact ? (
            <motion.div
              key={selectedContact.id}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-32 shadow-lg overflow-hidden relative group"
            >
              {/* Animated Gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-[60px] group-hover:blur-[80px] transition-all duration-700" />
              
              <div className="text-center mb-6 relative z-10">
                <motion.div 
                  whileHover={{ rotate: 6, scale: 1.05 }}
                  className="relative inline-block mb-4"
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl transition-all duration-300 ${
                    !selectedContact.is_read 
                      ? 'bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-blue-500/30' 
                      : 'bg-gradient-to-tr from-gray-500 to-gray-600'
                  }`}>
                    {selectedContact.fname.charAt(0)}
                  </div>
                  {!selectedContact.is_read && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-blue-500 border-2 border-white flex items-center justify-center shadow-lg">
                      <span className="text-white text-[10px] font-bold">New</span>
                    </div>
                  )}
                </motion.div>
                
                <h2 className="text-lg font-bold text-gray-900 mb-1.5">{selectedContact.fname} {selectedContact.lname}</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                   <Mail size={12} className="text-blue-500" />
                   <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">{selectedContact.email}</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-6">
                {selectedContact.location && (
                  <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-50 hover:border-gray-100 hover:bg-blue-50/30 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                      <MapPin size={15} />
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Location</p>
                      <p className="text-gray-900 font-semibold text-xs">{selectedContact.location}</p>
                    </div>
                  </motion.div>
                )}
                {selectedContact.interest && (
                  <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-50 hover:border-gray-100 hover:bg-blue-50/30 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                      <Globe size={15} />
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Area of Interest</p>
                      <p className="text-gray-900 font-semibold text-xs">{selectedContact.interest}</p>
                    </div>
                  </motion.div>
                )}
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-50 hover:border-gray-100 hover:bg-blue-50/30 transition-all">
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                    <Clock size={15} />
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Submitted</p>
                    <p className="text-gray-900 font-semibold text-xs">{formatDate(selectedContact.submitted_at)}</p>
                  </div>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all mb-2.5 text-[10px] uppercase tracking-wider"
              >
                View Full Dossier
              </motion.button>

              <div className="flex gap-2.5">
                {!selectedContact.is_read ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => markAsRead(selectedContact.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-sm transition-all uppercase tracking-wider text-[10px]"
                  >
                    <Check size={14} />
                    Acknowledge
                  </motion.button>
                ) : (
                  <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-600 font-bold rounded-xl border border-emerald-100 uppercase tracking-wider text-[10px]">
                    <Check size={14} />
                    Reviewed
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgb(239, 68, 68)', color: 'white' }}
                  onClick={() => deleteContact(selectedContact.id)}
                  className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 border border-red-100 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center sticky top-32 shadow-sm">
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                 <MessageSquare size={28} className="text-gray-300" />
              </div>
              <h3 className="text-sm font-bold text-gray-600 mb-1">Review Pending</h3>
              <p className="text-gray-300 font-medium uppercase tracking-wider text-[9px]">Select an inquiry dossier to begin</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedContact && (
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
              className="relative w-full max-w-[900px] h-full max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Gradient Header Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 transition-all z-[110]"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-5">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl transition-all duration-300 ${
                    !selectedContact.is_read 
                      ? 'bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-blue-500/30' 
                      : 'bg-gradient-to-tr from-gray-500 to-gray-600'
                  }`}>
                    {selectedContact.fname.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{selectedContact.fname} {selectedContact.lname}</h2>
                      {!selectedContact.is_read && (
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[8px] font-bold uppercase tracking-wider rounded-full border border-blue-100">New Inquiry</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                        <Mail size={12} className="text-blue-500" />
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">{selectedContact.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                        <Clock size={12} className="text-indigo-400" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Received: {formatDate(selectedContact.submitted_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar h-[calc(100%-220px)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  {selectedContact.location && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100"
                    >
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] mb-2 flex items-center gap-1.5">
                        <MapPin size={11} /> Location
                      </label>
                      <p className="text-gray-900 font-bold text-sm">{selectedContact.location}</p>
                    </motion.div>
                  )}
                  {selectedContact.interest && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-4 bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-xl border border-gray-100"
                    >
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] mb-2 flex items-center gap-1.5">
                        <Globe size={11} /> Area of Interest
                      </label>
                      <p className="text-gray-900 font-bold text-sm">{selectedContact.interest}</p>
                    </motion.div>
                  )}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 flex items-center gap-2">
                    <MessageSquare size={11} /> Message Content
                  </label>
                  <div className="p-5 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100">
                    <p className="text-gray-600 text-[13px] font-medium leading-relaxed whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </motion.div>

                <div className="flex gap-3">
                  {!selectedContact.is_read ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => markAsRead(selectedContact.id)}
                      className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg transition-all uppercase tracking-wider text-[11px]"
                    >
                      <Check size={18} />
                      Acknowledge Inquiry
                    </motion.button>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-emerald-50 text-emerald-600 font-bold rounded-xl border border-emerald-100 uppercase tracking-wider text-[11px]">
                      <Check size={18} />
                      This Inquiry Has Been Reviewed
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openReplyModal}
                    className="flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 border border-gray-200 rounded-xl text-gray-700 font-bold transition-all uppercase tracking-wider text-[11px]"
                  >
                    <ExternalLink size={18} />
                    Reply
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgb(239, 68, 68)', color: 'white' }}
                    onClick={() => deleteContact(selectedContact.id)}
                    className="w-14 h-14 flex items-center justify-center bg-red-50 text-red-500 border border-red-100 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reply Modal */}
      <AnimatePresence>
        {isReplyModalOpen && selectedContact && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReplyModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Gradient Header Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                      <Send size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Reply to Inquiry</h2>
                      <p className="text-sm text-gray-500">Compose your message to {selectedContact.fname} {selectedContact.lname}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsReplyModalOpen(false)}
                    className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">To</label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-sm font-semibold text-gray-700">{selectedContact.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Subject</label>
                    <input
                      type="text"
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm"
                      placeholder="Enter subject..."
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Message</label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={8}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={sendEmail}
                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all uppercase tracking-wider text-[11px]"
                  >
                    <Send size={16} />
                    Open Gmail
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsReplyModalOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-700 font-bold transition-all uppercase tracking-wider text-[11px]"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
