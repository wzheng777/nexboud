import { User, Campaign } from '../types';

// Simulated database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Data
const MOCK_USER: User = {
  id: 'u_123',
  name: 'Alex Growth',
  email: 'alex@nexbound.clone',
  avatar: 'https://picsum.photos/200',
};

const MOCK_CAMPAIGNS: Campaign[] = [
  { 
    id: 'c_1', 
    name: 'Q4 Outreach - CEOs', 
    status: 'active', 
    sent: 1240, 
    opened: 850, 
    replied: 120,
    draftConfig: {
      recipientName: "{FirstName}",
      companyName: "{CompanyName}",
      valueProposition: "We help enterprise CEOs reduce operational overhead by 20% within 90 days using our proprietary AI automation framework.",
      tone: "professional"
    },
    currentDraft: "Subject: Reducing {CompanyName}'s operational overhead\n\nHi {FirstName},\n\nI've been following {CompanyName}'s recent growth trajectory with interest. As you scale, operational efficiency often becomes the primary bottleneck.\n\nAt Nexbound, we specialize in helping enterprise CEOs reduce operational overhead by 20% within just 90 days. Our AI automation framework is designed to integrate seamlessly with your existing stack.\n\nAre you open to a brief 15-minute conversation next week to explore if this could work for you?\n\nBest regards,\nAlex Growth"
  },
  { 
    id: 'c_2', 
    name: 'Webinar Invites', 
    status: 'paused', 
    sent: 500, 
    opened: 200, 
    replied: 15,
    draftConfig: {
      recipientName: "Marketing Leader",
      companyName: "Tech Startups",
      valueProposition: "Join our exclusive masterclass on B2B lead generation strategies for 2025.",
      tone: "casual"
    },
    currentDraft: "Subject: You're invited: 2025 Lead Gen Masterclass 🚀\n\nHey there,\n\nHope you're having a great week! We're hosting an exclusive masterclass on the future of B2B lead gen next Tuesday, and I thought it would be right up your alley.\n\nWe'll be covering strategies to dominate 2025. It's free, fun, and packed with value.\n\nWant me to save you a seat?\n\nCheers,\nAlex"
  },
  { 
    id: 'c_3', 
    name: 'Partnership Inquiry', 
    status: 'completed', 
    sent: 100, 
    opened: 95, 
    replied: 45,
    draftConfig: {
      recipientName: "Partner Manager",
      companyName: "SaaS Platforms",
      valueProposition: "Strategic partnership to cross-sell our AI tools to your CRM user base.",
      tone: "persuasive"
    },
    currentDraft: "Subject: Strategic partnership opportunity with Nexbound\n\nHello,\n\nI believe there is a significant synergy between our user bases. Your CRM users are constantly looking for better outreach tools, and our AI platform delivers exactly that.\n\nA partnership could drive significant recurring revenue for both of us while adding massive value to your ecosystem.\n\nLet's chat about how we can make this a win-win.\n\nBest,\nAlex Growth"
  },
];

export const mockAuthService = {
  login: async (email: string): Promise<User> => {
    await delay(800); // Simulate network latency
    if (email.includes('error')) throw new Error('Invalid credentials');
    return MOCK_USER;
  },
  
  logout: async () => {
    await delay(300);
  }
};

export const mockDataService = {
  getCampaigns: async (): Promise<Campaign[]> => {
    await delay(600);
    return MOCK_CAMPAIGNS;
  },
  
  getStats: async () => {
    await delay(600);
    return {
      totalSent: 1840,
      avgOpenRate: 62,
      avgReplyRate: 12,
      activeLeads: 450
    };
  }
};