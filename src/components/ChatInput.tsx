import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Suggestion {
  id: string;
  text: string;
  description?: string;
  icon?: string;
}

const suggestions: Suggestion[] = [
  { id: '1', text: 'Add new customer', description: 'Create a new customer profile', icon: '👤' },
  { id: '2', text: 'Add lead from LinkedIn', description: 'Import lead from LinkedIn profile', icon: '💼' },
  { id: '3', text: 'Send a quote to customer', description: 'Create and send price quote', icon: '📝' },
  { id: '4', text: 'Follow up on airline inquiry', description: 'Check status of airline booking', icon: '✈️' },
  { id: '5', text: 'Schedule follow-up call', description: 'Set reminder for follow-up', icon: '📞' },
  { id: '6', text: 'Create new task', description: 'Add task to your list', icon: '✅' },
  { id: '7', text: 'Send meeting invite', description: 'Schedule a new meeting', icon: '📅' },
  { id: '8', text: 'Add note to customer', description: 'Update customer records', icon: '📌' },
];

interface ChatInputProps {
  onCommand?: (suggestion: Suggestion) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onCommand }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions.filter(suggestion => 
        suggestion.text.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setSelectedIndex(0);
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue]);

  const highlightMatch = (text: string) => {
    if (!inputValue) return text;
    const regex = new RegExp(`(${inputValue})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? 
            <span key={i} className="bg-yellow-200 text-gray-900">{part}</span> : 
            <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredSuggestions[selectedIndex]) {
          onCommand?.(filteredSuggestions[selectedIndex]);
          setInputValue('');
          setFilteredSuggestions([]);
        }
        break;
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What can I help you with?"
        className="w-full px-6 py-3.5 text-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      />

      <AnimatePresence>
        {filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center px-4 py-3 cursor-pointer transition-colors
                  ${index === selectedIndex ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                onClick={() => {
                  onCommand?.(suggestion);
                  setInputValue('');
                  setFilteredSuggestions([]);
                }}
              >
                <span className="text-xl mr-3">{suggestion.icon}</span>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {highlightMatch(suggestion.text)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {suggestion.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInput; 