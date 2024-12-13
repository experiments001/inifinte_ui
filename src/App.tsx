import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormMessage from './components/messages/FormMessage';
import { X } from 'lucide-react';

function App() {
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'logo-moving' | 'complete'>('initial');
  const [logoVisible, setLogoVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const actions = [
    { label: 'Create Lead', color: 'border-emerald-500', hoverColor: 'hover:bg-emerald-50' },
    { label: 'My Tasks', color: 'border-blue-500', hoverColor: 'hover:bg-blue-50' },
    { label: 'Jobs', color: 'border-purple-500', hoverColor: 'hover:bg-purple-50' },
    { label: 'Calendar', color: 'border-amber-500', hoverColor: 'hover:bg-amber-50' },
    { label: 'Notes', color: 'border-rose-500', hoverColor: 'hover:bg-rose-50' },
  ];

  const sampleFormData = {
    fields: [
      { id: '1', label: 'Name', type: 'text', required: true, value: '' },
      { id: '2', label: 'Email', type: 'email', required: true, value: '' },
      { id: '3', label: 'Phone', type: 'tel', required: false, value: '' }
    ]
  };

  useEffect(() => {
    setTimeout(() => setLogoVisible(true), 500);
    setTimeout(() => setAnimationPhase('logo-moving'), 2000);
    setTimeout(() => setAnimationPhase('complete'), 3000);
  }, []);

  return (
    <div className="min-h-screen water-bg grid grid-rows-[auto_1fr_auto] gap-8">
      {/* Header area for logo */}
      <div className="h-20 relative">
      <motion.div
          initial={{ opacity: 0, top: '50%', translateY: '-50%' }}
          animate={{
            opacity: logoVisible ? 1 : 0,
            top: animationPhase === 'logo-moving' || animationPhase === 'complete' ? '20px' : '50%',
            translateY: animationPhase === 'logo-moving' || animationPhase === 'complete' ? '0%' : '-50%'
          }}
          transition={{
            opacity: { duration: 1 },
            top: { duration: 1, ease: 'easeOut' },
            translateY: { duration: 1, ease: 'easeOut' }
          }}
          style={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          className="flex items-center gap-3"
        >
          <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
            LogiAI
          </span>
          <span className="text-2xl float-fast" role="img" aria-label="AI Magic">✨</span>
        </motion.div>
      </div>

      {/* Main content area */}
      <div className="relative flex flex-col items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {/* Chat Input and Buttons Group */}
          {animationPhase === 'complete' && !showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[500px] space-y-6"
            >
              {/* Chat Input */}
              <input
                type="text"
                placeholder="What can I help you with?"
                className="w-full px-6 py-3.5 text-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              
              {/* Buttons directly below chat input */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {actions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    onClick={() => action.label === 'Create Lead' && setShowForm(true)}
                    className={`px-4 py-2 rounded-xl border-2 ${action.color} ${action.hoverColor} 
                      bg-white/50 backdrop-blur-sm transition-all duration-300 text-sm font-medium
                      shadow-sm hover:shadow-md float-random-${index + 1}`}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Form with Close Button */}
          {showForm && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-[500px] relative"
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowForm(false)}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </motion.button>
                
                <FormMessage 
                  data={sampleFormData} 
                  onSubmit={(data) => {
                    console.log(data);
                    setShowForm(false);
                  }} 
                />
              </motion.div>

              {/* Buttons moved to bottom when form is shown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 w-full max-w-[600px] px-4"
              >
                {actions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    onClick={() => action.label === 'Create Lead' && setShowForm(true)}
                    className={`px-4 py-2 rounded-xl border-2 ${action.color} ${action.hoverColor} 
                      bg-white/50 backdrop-blur-sm transition-all duration-300 text-sm font-medium
                      shadow-sm hover:shadow-md float-random-${index + 1}`}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;