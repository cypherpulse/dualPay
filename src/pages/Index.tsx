import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Marketplace } from '@/components/Marketplace';
import { ListItem } from '@/components/ListItem';
import { Dashboard } from '@/components/Dashboard';
import { BitcoinSymbol } from '@/components/BitcoinIcon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('marketplace');

  const handleListSuccess = () => {
    // Switch to marketplace after successful listing
    setActiveTab('marketplace');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background glow effect */}
      <div className="fixed inset-0 bg-gradient-glow pointer-events-none" />
      
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 py-8 relative">
        {/* Hero Section - only on marketplace */}
        {activeTab === 'marketplace' && (
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="glow-text">DualPay Market</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The Bitcoin L2 marketplace where you pay with{' '}
              <span className="text-foreground font-semibold">STX</span> or{' '}
              <span className="text-primary font-semibold">
                sBTC <BitcoinSymbol />
              </span>
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm border border-green-500/30">
                ● Testnet Live
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm border border-primary/30">
                WalletConnect Ready
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {activeTab === 'marketplace' && <Marketplace />}
          {activeTab === 'list-item' && <ListItem onSuccess={handleListSuccess} />}
          {activeTab === 'dashboard' && <Dashboard />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            Running on Stacks Testnet • Contract: STGDS0Y17973EN5TCHNHGJJ9B31XWQ5YXBQ0KQ2Y.dual-pay-market
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
