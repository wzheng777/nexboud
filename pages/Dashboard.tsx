import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { mockDataService } from '../services/mockBackend';
import { generateEmailDraft } from '../services/geminiService';
import { Campaign } from '../types';
import { Button } from '../components/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Mail, Send, CheckCircle, AlertCircle, Sparkles, Copy, RefreshCw, Pencil } from 'lucide-react';

// Mock chart data
const CHART_DATA = [
  { name: 'Mon', sent: 400, opened: 240, replied: 40 },
  { name: 'Tue', sent: 300, opened: 139, replied: 20 },
  { name: 'Wed', sent: 500, opened: 380, replied: 50 },
  { name: 'Thu', sent: 280, opened: 190, replied: 30 },
  { name: 'Fri', sent: 390, opened: 280, replied: 45 },
  { name: 'Sat', sent: 100, opened: 50, replied: 10 },
  { name: 'Sun', sent: 80, opened: 40, replied: 5 },
];

export const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'ai-writer'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Writer State
  const [recipientName, setRecipientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [valueProp, setValueProp] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'persuasive'>('professional');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, campaignsData] = await Promise.all([
          mockDataService.getStats(),
          mockDataService.getCampaigns()
        ]);
        setStats(statsData);
        setCampaigns(campaignsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGenerateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    const draft = await generateEmailDraft({
      recipientName,
      companyName,
      valueProposition: valueProp,
      tone
    });
    setGeneratedEmail(draft);
    setIsGenerating(false);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    // Pre-fill the AI writer with campaign details if available
    if (campaign.draftConfig) {
      setRecipientName(campaign.draftConfig.recipientName);
      setCompanyName(campaign.draftConfig.companyName);
      setValueProp(campaign.draftConfig.valueProposition);
      setTone(campaign.draftConfig.tone);
    } else {
      // Clear or set defaults if no config exists
      setRecipientName('');
      setCompanyName('');
      setValueProp('');
      setTone('professional');
    }

    if (campaign.currentDraft) {
      setGeneratedEmail(campaign.currentDraft);
    } else {
      setGeneratedEmail('');
    }

    // Switch to AI Writer tab
    setActiveTab('ai-writer');
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-slate-50"><div className="animate-spin text-brand-600"><RefreshCw size={32}/></div></div>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="p-6">
          <div className="flex items-center space-x-3 rounded-lg bg-slate-50 p-3 border border-slate-100">
            <img src={user?.avatar} alt="" className="h-10 w-10 rounded-full" />
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium text-slate-900">{user?.name}</p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'overview' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <BarChart className="mr-3 h-5 w-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'campaigns' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Send className="mr-3 h-5 w-5" />
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab('ai-writer')}
            className={`flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'ai-writer' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Sparkles className="mr-3 h-5 w-5" />
            AI Writer
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-500">Total Sent</h3>
                  <Send className="h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stats?.totalSent.toLocaleString()}</p>
                <p className="mt-1 text-xs text-green-600 flex items-center">
                   <span className="mr-1">↑</span> 12% from last week
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-500">Open Rate</h3>
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stats?.avgOpenRate}%</p>
                <p className="mt-1 text-xs text-green-600 flex items-center">
                   <span className="mr-1">↑</span> 4% from last week
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-500">Reply Rate</h3>
                  <CheckCircle className="h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stats?.avgReplyRate}%</p>
                <p className="mt-1 text-xs text-red-600 flex items-center">
                   <span className="mr-1">↓</span> 1% from last week
                </p>
              </div>
               <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-500">Active Leads</h3>
                  <AlertCircle className="h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stats?.activeLeads}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Currently in sequence
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                 <h3 className="mb-4 text-lg font-semibold text-slate-900">Weekly Activity</h3>
                 <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CHART_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="sent" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="opened" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
               <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                 <h3 className="mb-4 text-lg font-semibold text-slate-900">Engagement Trends</h3>
                 <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={CHART_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                        <Tooltip 
                           contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line type="monotone" dataKey="replied" stroke="#2563eb" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                      </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Writer Tab */}
        {activeTab === 'ai-writer' && (
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">AI Email Drafter</h1>
              <p className="text-slate-500">Generate high-converting sales emails powered by Gemini.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Input Form */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <form onSubmit={handleGenerateEmail} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Recipient Name</label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="e.g. John Doe"
                      value={recipientName}
                      onChange={e => setRecipientName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Company Name</label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="e.g. Acme Corp"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Value Proposition / Main Point</label>
                    <textarea 
                      className="h-32 w-full resize-none rounded-md border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="We help companies scale their outreach..."
                      value={valueProp}
                      onChange={e => setValueProp(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Tone</label>
                    <select 
                      className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      value={tone}
                      onChange={(e: any) => setTone(e.target.value)}
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="persuasive">Persuasive</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full" isLoading={isGenerating}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Draft
                  </Button>
                </form>
              </div>

              {/* Output */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Generated Draft</h3>
                  <button 
                    onClick={() => navigator.clipboard.writeText(generatedEmail)}
                    className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                    title="Copy to clipboard"
                  >
                    <Copy size={18} />
                  </button>
                </div>
                <div className="flex-1 rounded-md border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-inner whitespace-pre-wrap">
                  {generatedEmail ? generatedEmail : <span className="text-slate-400 italic">Your AI-generated email will appear here...</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
           <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Active Campaigns</h1>
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sent</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Replied</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                   {campaigns.map((campaign) => (
                     <tr key={campaign.id}>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{campaign.name}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                         <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                           campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                           campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                           'bg-slate-100 text-slate-800'
                         }`}>
                           {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                         </span>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{campaign.sent.toLocaleString()}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{campaign.replied.toLocaleString()}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         <button 
                           onClick={() => handleEditCampaign(campaign)}
                           className="text-brand-600 hover:text-brand-900 flex items-center justify-end"
                         >
                           <Pencil size={16} className="mr-1" /> Edit
                         </button>
                       </td>
                     </tr>
                   ))}
                </tbody>
              </table>
            </div>
           </div>
        )}
      </main>
    </div>
  );
};