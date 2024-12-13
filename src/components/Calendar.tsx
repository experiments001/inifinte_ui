import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CalendarProps {
  onClose: () => void;
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'meeting' | 'task' | 'reminder';
}

const Calendar: React.FC<CalendarProps> = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample events
  const events: Event[] = [
    { id: '1', title: 'Client Meeting', date: '2024-02-15', type: 'meeting' },
    { id: '2', title: 'Project Deadline', date: '2024-02-20', type: 'task' },
    { id: '3', title: 'Follow-up Call', date: '2024-02-18', type: 'reminder' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDate = (year: number, month: number, day: number) => {
    const dateStr = formatDate(year, month, day);
    return events.filter(event => event.date === dateStr);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateEvents = getEventsForDate(year, month, day);
      days.push(
        <div 
          key={day} 
          className="border h-24 p-2 hover:bg-gray-50 transition-colors"
        >
          <div className="font-medium text-sm text-gray-600">{day}</div>
          <div className="mt-1 space-y-1">
            {dateEvents.map(event => (
              <div 
                key={event.id}
                className={`text-xs p-1 rounded truncate
                  ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'task' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'}`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 w-full max-w-[900px]"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">Calendar</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={prevMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-lg font-medium">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button 
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {/* Week days */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
        {/* Calendar days */}
        {renderCalendar()}
      </div>
    </motion.div>
  );
};

export default Calendar; 