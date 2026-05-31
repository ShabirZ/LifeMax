import { useState, useEffect } from 'react';
import { fetchHealthProfile, saveHealthProfile } from '~/services/profileService';
import { User, Ruler, Scale, Target, Zap, Edit2, Check, X } from 'lucide-react';

const calcBMI = (height, weight, units) => {
  if (!height || !weight) return null;
  const bmi = units === 'metric'
    ? weight / ((height / 100) * (height / 100))
    : (703 * weight) / (height * height);
  return bmi.toFixed(1);
};

const bmiCategory = (bmi) => {
  if (!bmi) return null;
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
  if (bmi < 25)   return { label: 'Normal',      color: 'text-emerald-500' };
  if (bmi < 30)   return { label: 'Overweight',  color: 'text-amber-500' };
  return             { label: 'Obese',         color: 'text-rose-500' };
};

const heightDisplay = (height, units) => {
  if (!height) return null;
  if (units === 'metric') return `${height} cm`;
  const ft = Math.floor(height / 12);
  const inch = height % 12;
  return `${ft}′ ${inch}″`;
};

const ACTIVITY_LEVELS = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active'];

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-2 shadow-sm">
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
      <Icon size={18} className="text-white" />
    </div>
    <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">{label}</p>
    <p className="text-2xl font-bold text-slate-800">
      {value ?? <span className="text-slate-300 text-lg">—</span>}
    </p>
    {sub && <p className={`text-xs font-medium ${sub.color}`}>{sub.label}</p>}
  </div>
);

const Field = ({ label, value, name, unit, type = 'number', editing, onChange, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</label>
    {editing ? (
      children ?? (
        <div className="flex items-center gap-1">
          <input
            type={type}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="—"
          />
          {unit && <span className="text-slate-400 text-sm shrink-0">{unit}</span>}
        </div>
      )
    ) : (
      <p className="text-slate-800 font-medium">
        {value ? `${value}${unit ? ` ${unit}` : ''}` : <span className="text-slate-300">Not set</span>}
      </p>
    )}
  </div>
);

const INITIAL = {
  dateOfBirth: '',
  biologicalSex: '',
  height: '',
  currentWeight: '',
  targetWeight: '',
  activityLevel: '',
  unitsPreference: 'imperial',
};

const UserProfile = () => {
  const [profile, setProfile]   = useState(INITIAL);
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(INITIAL);
  const [loading, setLoading]   = useState(true);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    fetchHealthProfile()
      .then(data => { if (data) setProfile(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const units = profile.unitsPreference;
  const weightUnit = units === 'metric' ? 'kg' : 'lbs';
  const heightUnit = units === 'metric' ? 'cm' : 'in';

  const bmi     = calcBMI(Number(profile.height), Number(profile.currentWeight), units);
  const bmiInfo = bmiCategory(Number(bmi));

  const age = (() => {
    if (!profile.dateOfBirth) return null;
    const dob   = new Date(profile.dateOfBirth);
    const today = new Date();
    let a = today.getFullYear() - dob.getFullYear();
    if (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate())) a--;
    return a;
  })();

  const startEdit = () => { setDraft({ ...profile }); setEditing(true); setSaveError(null); };
  const cancel    = () => setEditing(false);
  const onChange  = (e) => setDraft(d => ({ ...d, [e.target.name]: e.target.value }));

  const save = async () => {
    try {
      await saveHealthProfile(draft);
      setProfile({ ...draft });
      setEditing(false);
      setSaveError(null);
    } catch {
      setSaveError('Failed to save. Please try again.');
    }
  };

  const val   = (key) => editing ? draft[key] : profile[key];

  if (loading) return (
    <div className="flex items-center justify-center py-24 text-slate-400 text-sm">Loading profile...</div>
  );

  return (
    <div className="space-y-6">

      {saveError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-lg px-4 py-3">{saveError}</div>
      )}

      {/* Profile Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
              <User size={24} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-base">My Profile</p>
              <div className="flex gap-3 mt-0.5">
                {profile.biologicalSex && <span className="text-sm text-slate-500 capitalize">{profile.biologicalSex}</span>}
                {age !== null && <span className="text-sm text-slate-500">{age} yrs old</span>}
                {profile.activityLevel && <span className="text-sm text-slate-500">{profile.activityLevel}</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button onClick={save} className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                  <Check size={14} /> Save
                </button>
                <button onClick={cancel} className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  <X size={14} /> Cancel
                </button>
              </>
            ) : (
              <button onClick={startEdit} className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                <Edit2 size={14} /> Edit
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          <Field label="Date of Birth" name="dateOfBirth" value={val('dateOfBirth')} editing={editing} onChange={onChange} type="date" />

          <Field label="Biological Sex" name="biologicalSex" value={val('biologicalSex')} editing={editing} onChange={onChange}>
            {editing && (
              <select name="biologicalSex" value={draft.biologicalSex} onChange={onChange} className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            )}
          </Field>

          <Field label={`Height (${heightUnit})`} name="height" value={val('height')} editing={editing} onChange={onChange} unit={heightUnit} />

          <Field label={`Current Weight (${weightUnit})`} name="currentWeight" value={val('currentWeight')} editing={editing} onChange={onChange} unit={weightUnit} />

          <Field label={`Target Weight (${weightUnit})`} name="targetWeight" value={val('targetWeight')} editing={editing} onChange={onChange} unit={weightUnit} />

          <Field label="Activity Level" name="activityLevel" value={val('activityLevel')} editing={editing} onChange={onChange}>
            {editing && (
              <select name="activityLevel" value={draft.activityLevel} onChange={onChange} className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400">
                <option value="">Select</option>
                {ACTIVITY_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            )}
          </Field>

          <Field label="Units" name="unitsPreference" value={val('unitsPreference')} editing={editing} onChange={onChange}>
            {editing && (
              <select name="unitsPreference" value={draft.unitsPreference} onChange={onChange} className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400">
                <option value="imperial">Imperial (lbs / in)</option>
                <option value="metric">Metric (kg / cm)</option>
              </select>
            )}
          </Field>

        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Ruler}  label="Height"         value={heightDisplay(Number(profile.height), units)} color="bg-blue-500" />
        <StatCard icon={Scale}  label="Current Weight" value={profile.currentWeight ? `${profile.currentWeight} ${weightUnit}` : null} color="bg-violet-500" />
        <StatCard icon={User}   label="BMI"            value={bmi} sub={bmiInfo} color="bg-emerald-500" />
        <StatCard icon={Target} label="Target Weight"  value={profile.targetWeight ? `${profile.targetWeight} ${weightUnit}` : null} color="bg-amber-500" />
      </div>

    </div>
  );
};

export default UserProfile;
