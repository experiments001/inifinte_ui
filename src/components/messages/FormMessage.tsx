import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData, FormField } from '../../types';
import { CheckCircle } from 'lucide-react';

interface FormMessageProps {
  data: FormData;
  onSubmit: (formData: FormData) => void;
}

const FormMessage: React.FC<FormMessageProps> = ({ data, onSubmit }) => {
  const [fields, setFields] = useState<FormField[]>(data.fields);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...data, fields });
    setSubmitted(true);
  };

  const handleFieldChange = (id: string, value: string) => {
    setFields(prev => 
      prev.map(field => 
        field.id === id ? { ...field, value } : field
      )
    );
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 p-4 bg-green-50 rounded-xl text-green-700"
      >
        <CheckCircle className="w-5 h-5" />
        <span>Form submitted successfully!</span>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm space-y-4"
    >
      {fields.map(field => (
        <div key={field.id} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Submit
      </button>
    </motion.form>
  );
};

export default FormMessage;