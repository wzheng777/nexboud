import React from 'react';
import { BarChart3, Twitter, Linkedin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <BarChart3 size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900">Nexbound</span>
            </div>
            <p className="text-slate-500 text-sm">
              The #1 platform for scaling your outbound sales with AI-driven insights and automation.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-500 hover:text-brand-600 text-sm">Features</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-600 text-sm">Integrations</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-600 text-sm">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-500 hover:text-brand-600 text-sm">About</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-600 text-sm">Blog</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-600 text-sm">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-500 hover:text-brand-600 text-sm">Privacy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-600 text-sm">Terms</a></li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-slate-600"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-slate-600"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-slate-600"><Github size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center">
          <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Nexbound Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};