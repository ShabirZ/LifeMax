import { useState } from 'react';
import { User, Dumbbell, Apple, Activity } from 'lucide-react';
import UserProfile from './HealthComponents/UserProfile';

const SECTIONS = [
  { id: 'profile',      label: 'Profile',      icon: User },
  { id: 'workouts',     label: 'Workouts',     icon: Dumbbell },
  { id: 'nutrition',    label: 'Nutrition',    icon: Apple },
  { id: 'vitals',       label: 'Vitals',       icon: Activity },
];

const ComingSoon = ({ label }) => (
  <div className="flex flex-col items-center justify-center py-24 text-slate-400">
    <p className="text-lg font-medium">{label}</p>
    <p className="text-sm mt-1">Coming soon</p>
  </div>
);

const HealthDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':   return <UserProfile />;
      case 'workouts':  return <ComingSoon label="Workouts" />;
      case 'nutrition': return <ComingSoon label="Nutrition" />;
      case 'vitals':    return <ComingSoon label="Vitals" />;
      default:          return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Section Tab Bar */}
      <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm w-fit">
        {SECTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Active Section Content */}
      {renderSection()}

    </div>
  );
};

export default HealthDashboard;
