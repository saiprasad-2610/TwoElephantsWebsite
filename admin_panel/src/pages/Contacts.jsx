import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, Search, Eye, Check, X, MessageSquare, MapPin, Globe } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);

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
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-['Ubuntu_Sans']">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Client Inquiries</h1>
          <p className="text-gray-500 font-medium">Manage all contact form submissions from your website</p>
        </div>
        <div className="bg-[#0B1526] border border-white/5 rounded-[24px] px-6 py-4 shadow-xl">
          <span className="text-3xl font-black text-blue-400">{contacts.filter((c) => !c.is_read).length}</span>
          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-3">Unread</span>
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
        <div className="flex gap-3">
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                filter === f 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-[#0B1526] text-gray-500 hover:text-white border border-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-5">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-white/5 rounded-[24px] animate-pulse" />
              ))}
            </div>
          ) : filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedContact(contact)}
                className={`bg-[#0B1526] border rounded-[28px] p-6 cursor-pointer transition-all duration-300 group ${
                  selectedContact?.id === contact.id 
                    ? 'border-blue-500/50 bg-blue-500/[0.03] shadow-lg shadow-blue-500/5' 
                    : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                } ${!contact.is_read ? 'border-l-4 border-l-blue-500' : ''}`}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ${
                    !contact.is_read ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-blue-500/20' : 'bg-gradient-to-tr from-gray-700 to-gray-800'
                  }`}>
                    {contact.fname.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-white font-black text-lg group-hover:text-blue-400 transition-colors tracking-tight">{contact.fname} {contact.lname}</h3>
                      {!contact.is_read && <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">New</span>}
                    </div>
                    <p className="text-gray-500 text-sm font-bold mb-3">{contact.email}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                      {contact.location && <span className="flex items-center gap-2"><MapPin size={14} className="text-blue-500/50" /> {contact.location}</span>}
                      {contact.interest && <span className="flex items-center gap-2"><Globe size={14} className="text-blue-500/50" /> {contact.interest}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">{formatDate(contact.submitted_at)}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-[#0B1526] border border-white/5 rounded-[32px] p-20 text-center shadow-xl">
              <Mail size={48} className="mx-auto text-gray-700 mb-6" />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No inquiries found in database</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          {selectedContact ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0B1526] border border-white/5 rounded-[40px] p-10 sticky top-32 shadow-2xl overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -z-10" />
              
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-white font-black text-xl tracking-tight">Inquiry Details</h3>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Dossier #{selectedContact.id}</p>
                </div>
                <button onClick={() => setSelectedContact(null)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 group/item">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover/item:text-blue-400 transition-colors">
                    <User size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Full Name</p>
                    <p className="text-white font-bold text-sm">{selectedContact.fname} {selectedContact.lname}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group/item">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover/item:text-blue-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Email Address</p>
                    <a href={`mailto:${selectedContact.email}`} className="text-white font-bold text-sm hover:text-blue-400 transition-colors">{selectedContact.email}</a>
                  </div>
                </div>
                {selectedContact.location && (
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover/item:text-blue-400 transition-colors">
                      <MapPin size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Location</p>
                      <p className="text-white font-bold text-sm">{selectedContact.location}</p>
                    </div>
                  </div>
                )}
                {selectedContact.interest && (
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover/item:text-blue-400 transition-colors">
                      <Globe size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Area of Interest</p>
                      <p className="text-white font-bold text-sm">{selectedContact.interest}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-10">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-4 block">Message Content</label>
                <div className="bg-black/20 rounded-[32px] p-8 border border-white/5">
                  <p className="text-gray-300 text-sm font-medium leading-relaxed whitespace-pre-wrap italic">"{selectedContact.message}"</p>
                </div>
              </div>

              <div className="flex gap-4">
                {!selectedContact.is_read && (
                  <button
                    onClick={() => markAsRead(selectedContact.id)}
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
                  >
                    <Check size={18} />
                    Acknowledge
                  </button>
                )}
                <button
                  onClick={() => deleteContact(selectedContact.id)}
                  className="w-16 h-16 flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-[#0B1526] border border-white/5 rounded-[40px] p-20 text-center sticky top-32 shadow-xl border-dashed">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <MessageSquare size={40} className="text-gray-700" />
              </div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Select an inquiry dossier to begin review</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
