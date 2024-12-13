import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User2, Tag, X } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  assigned: string;
  dueDate: string;
  type: 'Bug' | 'Feature' | 'Support' | 'Meeting';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Done';
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Review client proposal',
    assigned: 'John Doe',
    dueDate: '2024-02-15',
    type: 'Meeting',
    priority: 'High',
    status: 'Todo'
  },
  {
    id: '2',
    title: 'Update customer database',
    assigned: 'Jane Smith',
    dueDate: '2024-02-16',
    type: 'Feature',
    priority: 'Medium',
    status: 'In Progress'
  },
  {
    id: '3',
    title: 'Fix login issue',
    assigned: 'Mike Johnson',
    dueDate: '2024-02-14',
    type: 'Bug',
    priority: 'High',
    status: 'In Progress'
  },
  // Add more tasks as needed
];

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
};

const typeColors = {
  Bug: 'bg-red-50 text-red-600',
  Feature: 'bg-blue-50 text-blue-600',
  Support: 'bg-purple-50 text-purple-600',
  Meeting: 'bg-green-50 text-green-600'
};

const statusColors = {
  'Todo': 'bg-gray-100 text-gray-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'Done': 'bg-green-100 text-green-800'
};

interface TaskListProps {
  onClose: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 w-full max-w-[800px] relative"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Tasks</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="px-3 py-2 border rounded-lg text-sm">
          <option>All Types</option>
          <option>Bug</option>
          <option>Feature</option>
          <option>Support</option>
          <option>Meeting</option>
        </select>
        <select className="px-3 py-2 border rounded-lg text-sm">
          <option>All Priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="px-3 py-2 border rounded-lg text-sm">
          <option>All Statuses</option>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <div className="flex gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User2 className="w-4 h-4" />
                    {task.assigned}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {task.dueDate}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[task.type]}`}>
                  {task.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                  {task.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TaskList; 