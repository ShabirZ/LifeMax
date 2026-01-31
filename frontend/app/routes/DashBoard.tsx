import React, { useState } from 'react';
import { 
  Activity, 
  DollarSign, 
  CheckCircle, 
  LayoutDashboard, 
  Settings, 
  LogOut 
} from 'lucide-react';
import DashboardCard from '../components/global/ContributionGraph';
import ContributionGraph from '../components/global/ContributionGraph';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Navigation configuration
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'health', label: 'Health', icon: Activity },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'productivity', label: 'Productivity', icon: CheckCircle },
  ];

  // Render content based on selection
  const renderContent = () => {
    switch (activeTab) {
      case 'health':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 h-96 flex flex-col items-center justify-center text-slate-400">
            <Activity size={48} className="mb-4 text-emerald-500" />
            <h2 className="text-xl font-semibold text-slate-700">Health Dashboard</h2>
            <p>Health metrics and visualizations will load here.</p>
          </div>
        );
      case 'finance':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 h-96 flex flex-col items-center justify-center text-slate-400">
            <DollarSign size={48} className="mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold text-slate-700">Finance Dashboard</h2>
            <p>Budgeting and net worth tracking will load here.</p>
          </div>
        );
      case 'productivity':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 h-96 flex flex-col items-center justify-center text-slate-400">
            <CheckCircle size={48} className="mb-4 text-violet-500" />
            <h2 className="text-xl font-semibold text-slate-700">Productivity Dashboard</h2>
            <p>Task tracking and commit history will load here.</p>
          </div>
        );
      default:
        return (
        <div className = "max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick summary cards for the Overview page */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <h3 className="font-semibold text-red-800 mb-2">Health Status</h3>
                <p className="text-sm text-red-600">Total Contributions: </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-emerald-800 mb-2">Total Spending: </h3>
                <p className="text-sm text-emerald-600">On track</p>
            </div>
            <div className="bg-violet-50 p-6 rounded-xl border border-violet-100">
                <h3 className="font-semibold text-violet-800 mb-2">Tasks Done</h3>
                <p className="text-sm text-violet-600">12 pending</p>
            </div>
            
            </div>
            <ContributionGraph theme = "stone"/>
        </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            LifeMax
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold capitalize text-slate-800">
            {activeTab}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
            <span className="text-sm font-medium text-slate-600">User Profile</span>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-2 capitalize">
                Welcome back
              </h1>
              <p className="text-slate-500">
                Here is your {activeTab} summary.
              </p>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;