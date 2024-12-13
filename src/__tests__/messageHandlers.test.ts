import { describe, it, expect } from 'vitest';
import { createTextMessage, createFormMessage, handleUserMessage } from '../utils/messageHandlers';

describe('Message Handlers', () => {
  it('creates text messages correctly', () => {
    const message = createTextMessage('Hello', true);
    expect(message.type).toBe('text');
    expect(message.content).toBe('Hello');
    expect(message.isUser).toBe(true);
  });

  it('creates form messages correctly', () => {
    const formData = {
      id: 'test-form',
      fields: [
        { id: 'name', label: 'Name', type: 'text', value: '', required: true }
      ]
    };
    const message = createFormMessage(formData);
    expect(message.type).toBe('form');
    expect(message.content).toEqual(formData);
    expect(message.isUser).toBe(false);
  });

  it('generates contact form for quote requests', () => {
    const form = handleUserMessage('I need a quote');
    expect(form).toBeTruthy();
    expect(form?.fields.length).toBeGreaterThan(0);
    expect(form?.fields.some(f => f.type === 'email')).toBe(true);
  });

  it('returns null for regular messages', () => {
    const form = handleUserMessage('Hello there');
    expect(form).toBeNull();
  });
});