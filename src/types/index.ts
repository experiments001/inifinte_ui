export type MessageType = 'text' | 'form' | 'response';

export interface Message {
  id: number;
  type: MessageType;
  content: string | FormData;
  isUser: boolean;
}

export interface FormData {
  fields: FormField[];
  id: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number';
  value: string;
  required?: boolean;
}