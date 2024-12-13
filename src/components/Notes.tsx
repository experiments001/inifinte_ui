import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Plus, Star, Clock } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  starred: boolean;
}

interface NotesProps {
  onClose: () => void;
}

const Notes: React.FC<NotesProps> = ({ onClose }) => {
  const [notes] = useState<Note[]>([
    {
      id: '1',
      title: 'Client Meeting Notes',
      content: 'Discussed project timeline and requirements...',
      date: '2024-02-14',
      starred: true
    },
    {
      id: '2',
      title: 'Product Ideas',
      content: 'New feature suggestions for next sprint...',
      date: '2024-02-13',
      starred: false
    },
    {
      id: '3',
      title: 'Team Updates',
      content: 'Weekly progress and blockers...',
      date: '2024-02-12',
      starred: true
    },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl shadow-lg w-full max-w-[800px]"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Notes</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Search and Actions */}
      <div className="p-4 border-b flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Note
        </button>
      </div>

      {/* Notes List */}
      <div className="divide-y max-h-[600px] overflow-y-auto">
        {notes.map(note => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-3">
                <Star 
                  className={`w-5 h-5 ${note.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                />
                <div>
                  <h3 className="font-medium text-gray-900">{note.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {note.content}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {note.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Notes; 