import { Message, FormData } from '../types';

export const createTextMessage = (text: string, isUser: boolean): Message => ({
  id: Date.now(),
  type: 'text',
  content: text,
  isUser
});

export const createFormMessage = (formData: FormData): Message => ({
  id: Date.now(),
  type: 'form',
  content: formData,
  isUser: false
});

export const handleUserMessage = (text: string): FormData | null => {
  // Example trigger words that would generate a form
  if (text.toLowerCase().includes('quote') || text.toLowerCase().includes('contact')) {
    return {
      id: 'contact-form',
      fields: [
        { id: 'name', label: 'Full Name', type: 'text', value: '', required: true },
        { id: 'email', label: 'Email Address', type: 'email', value: '', required: true },
        { id: 'phone', label: 'Phone Number', type: 'text', value: '', required: false },
        { id: 'message', label: 'Message', type: 'text', value: '', required: true }
      ]
    };
  }
  return null;
};