export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface EmailDraftRequest {
  recipientName: string;
  companyName: string;
  valueProposition: string;
  tone: 'professional' | 'casual' | 'persuasive';
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  sent: number;
  opened: number;
  replied: number;
  draftConfig?: EmailDraftRequest;
  currentDraft?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}