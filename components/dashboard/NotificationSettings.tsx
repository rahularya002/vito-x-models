import { useState } from 'react';

interface NotificationSettingsProps {
  settings: {
    emailCampaigns: boolean;
    emailProducts: boolean;
    emailModels: boolean;
    emailAnalytics: boolean;
    pushCampaigns: boolean;
    pushProducts: boolean;
    pushModels: boolean;
    pushAnalytics: boolean;
  };
  onSubmit: (settings: NotificationSettingsProps['settings']) => Promise<void>;
}

export const NotificationSettings = ({ settings: initialSettings, onSubmit }: NotificationSettingsProps) => {
  const [settings, setSettings] = useState(initialSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
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
      <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="emailCampaigns" className="text-white">
                  Campaign updates
                </label>
                <ToggleSwitch
                  name="emailCampaigns"
                  checked={settings.emailCampaigns}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="emailProducts" className="text-white">
                  Product updates
                </label>
                <ToggleSwitch
                  name="emailProducts"
                  checked={settings.emailProducts}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="emailModels" className="text-white">
                  Model updates
                </label>
                <ToggleSwitch
                  name="emailModels"
                  checked={settings.emailModels}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="emailAnalytics" className="text-white">
                  Analytics reports
                </label>
                <ToggleSwitch
                  name="emailAnalytics"
                  checked={settings.emailAnalytics}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Push Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="pushCampaigns" className="text-white">
                  Campaign updates
                </label>
                <ToggleSwitch
                  name="pushCampaigns"
                  checked={settings.pushCampaigns}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="pushProducts" className="text-white">
                  Product updates
                </label>
                <ToggleSwitch
                  name="pushProducts"
                  checked={settings.pushProducts}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="pushModels" className="text-white">
                  Model updates
                </label>
                <ToggleSwitch
                  name="pushModels"
                  checked={settings.pushModels}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="pushAnalytics" className="text-white">
                  Analytics reports
                </label>
                <ToggleSwitch
                  name="pushAnalytics"
                  checked={settings.pushAnalytics}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </form>
    </div>
  );
}; 