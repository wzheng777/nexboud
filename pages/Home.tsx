import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Check, Rocket, Shield, Zap, BarChart, Users } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

const PricingCard: React.FC<{ title: string; price: string; features: string[]; recommended?: boolean }> = ({ title, price, features, recommended }) => (
  <div className={`relative rounded-2xl border ${recommended ? 'border-brand-600 shadow-xl' : 'border-slate-200 shadow-sm'} bg-white p-8`}>
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-medium text-white uppercase tracking-wide">
        Most Popular
      </div>
    )}
    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
    <div className="mt-4 flex items-baseline">
      <span className="text-4xl font-extrabold text-slate-900">{price}</span>
      <span className="ml-2 text-slate-500">/mo</span>
    </div>
    <ul className="mt-8 space-y-4">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center">
          <Check className="mr-3 h-5 w-5 text-brand-600" />
          <span className="text-slate-600">{feature}</span>
        </li>
      ))}
    </ul>
    <div className="mt-8">
      <Link to="/login">
        <Button variant={recommended ? 'primary' : 'outline'} className="w-full">
          Get Started
        </Button>
      </Link>
    </div>
  </div>
);

export const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Scale your outreach <br />
              <span className="text-brand-600">without the chaos</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Automate your cold email campaigns, personalize at scale with Gemini AI, and book more meetings. 
              The all-in-one platform for modern sales teams.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/login">
                <Button size="lg" className="rounded-full px-8">Start for free</Button>
              </Link>
              <a href="#features" className="text-sm font-semibold leading-6 text-slate-900 hover:text-brand-600">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="relative -m-2 rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="https://picsum.photos/1200/600?grayscale"
                alt="App Screenshot"
                className="rounded-lg shadow-2xl ring-1 ring-slate-900/10"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need to grow</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Powerful tools designed to help you reach more prospects and close more deals.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <FeatureCard 
                icon={<Rocket size={24} />}
                title="AI Email Writer"
                description="Use advanced Gemini AI models to generate personalized, high-converting email copy in seconds."
              />
              <FeatureCard 
                icon={<Zap size={24} />}
                title="Automated Follow-ups"
                description="Set up multi-step sequences that automatically follow up with prospects who haven't replied."
              />
              <FeatureCard 
                icon={<BarChart size={24} />}
                title="Deep Analytics"
                description="Track open rates, reply rates, and bounce rates to optimize your campaigns for maximum ROI."
              />
              <FeatureCard 
                icon={<Users size={24} />}
                title="Lead Management"
                description="Organize your prospects with custom tags, statuses, and smart lists."
              />
              <FeatureCard 
                icon={<Shield size={24} />}
                title="Email Deliverability"
                description="Built-in warmup tools and DNS checks ensure your emails land in the primary inbox."
              />
              <FeatureCard 
                icon={<Check size={24} />}
                title="A/B Testing"
                description="Test different subject lines and email bodies to see what resonates best with your audience."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Simple, transparent pricing</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <PricingCard 
              title="Starter"
              price="$29"
              features={['1,000 emails/mo', 'Basic Analytics', '1 Seat', 'Email Support']}
            />
            <PricingCard 
              title="Growth"
              price="$79"
              recommended={true}
              features={['Unlimited emails', 'Advanced Analytics', '5 Seats', 'AI Writer (Gemini)', 'Priority Support']}
            />
            <PricingCard 
              title="Enterprise"
              price="$199"
              features={['Custom limits', 'Dedicated Success Manager', 'SSO', 'API Access', 'Custom Integrations']}
            />
          </div>
        </div>
      </section>
    </div>
  );
};