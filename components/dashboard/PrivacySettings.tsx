import { useState } from 'react';

interface PrivacySettingsProps {
  settings: {
    profileVisibility: string;
    dataSharing: boolean;
    marketingEmails: boolean;
  };
  onSubmit: (settings: PrivacySettingsProps['settings']) => Promise<void>;
}

export const PrivacySettings = ({ settings: initialSettings, onSubmit }: PrivacySettingsProps) => {
  const [settings, setSettings] = useState(initialSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setSettings((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(settings);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ToggleSwitch = ({ name, checked, onChange }: { name: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-10 h-5 rounded-full transition ${
          checked ? "bg-red-600" : "bg-stone-700"
        }`}
      >
        <div
          className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
            checked ? "translate-x-5" : ""
          }`}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-bold text-white mb-6">Privacy Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Profile Visibility</h3>
            <div className="space-y-2">
              <div>
                <select
                  id="profileVisibility"
                  name="profileVisibility"
                  value={settings.profileVisibility}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="public">Public - Visible to everyone</option>
                  <option value="private">Private - Only visible to you</option>
                  <option value="connections">Connections - Only visible to your connections</option>
                </select>
              </div>
              <p className="text-white/60 text-sm">
                Control who can see your profile information and activity.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Data Sharing</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="dataSharing" className="text-white">
                    Share usage data to improve services
                  </label>
                  <p className="text-white/60 text-sm">
                    We use this data to improve our platform and services.
                  </p>
                </div>
                <ToggleSwitch
                  name="dataSharing"
                  checked={settings.dataSharing}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="marketingEmails" className="text-white">
                    Receive marketing emails
                  </label>
                  <p className="text-white/60 text-sm">
                    Get updates about new features and promotions.
                  </p>
                </div>
                <ToggleSwitch
                  name="marketingEmails"
                  checked={settings.marketingEmails}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Account Actions</h3>
            <div className="space-y-4">
              <button
                type="button"
                className="w-full px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-left"
              >
                Download Your Data
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-left"
              >
                Delete Your Account
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Privacy Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};