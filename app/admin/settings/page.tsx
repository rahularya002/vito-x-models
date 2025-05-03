export default function AdminSettings() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Settings</h1>
          <p className="text-white/60">Configure admin panel settings</p>
        </div>
  
        <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-4">General Settings</h2>
  
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  defaultValue="Fashion Agency"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
  
              <div>
                <label className="block text-white font-medium mb-2">Admin Email</label>
                <input
                  type="email"
                  defaultValue="admin@example.com"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
  
            <div>
              <label className="block text-white font-medium mb-2">Notification Settings</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notify-new-users"
                    defaultChecked
                    className="rounded bg-stone-800 border-white/10 text-red-500 focus:ring-red-500"
                  />
                  <label htmlFor="notify-new-users" className="ml-2 text-white">
                    Notify on new user registrations
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notify-model-requests"
                    defaultChecked
                    className="rounded bg-stone-800 border-white/10 text-red-500 focus:ring-red-500"
                  />
                  <label htmlFor="notify-model-requests" className="ml-2 text-white">
                    Notify on new model requests
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notify-comments"
                    className="rounded bg-stone-800 border-white/10 text-red-500 focus:ring-red-500"
                  />
                  <label htmlFor="notify-comments" className="ml-2 text-white">
                    Notify on new comments
                  </label>
                </div>
              </div>
            </div>
  
            <div>
              <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
  
        <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Admin Users</h2>
          <p className="text-white/60 mb-4">Manage users with admin access</p>
  
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-stone-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-500 font-medium">S</span>
                </div>
                <div>
                  <p className="text-white">Sophia Williams</p>
                  <p className="text-white/60 text-sm">sophia@example.com</p>
                </div>
              </div>
              <div>
                <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500">Admin</span>
              </div>
            </div>
  
            <div className="flex items-center justify-between p-3 bg-stone-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-500 font-medium">Y</span>
                </div>
                <div>
                  <p className="text-white">You</p>
                  <p className="text-white/60 text-sm">admin@example.com</p>
                </div>
              </div>
              <div>
                <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500">Super Admin</span>
              </div>
            </div>
  
            <button className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white py-2 px-4 rounded-lg transition-colors">
              <span>+</span> Add Admin User
            </button>
          </div>
        </div>
      </div>
    )
  }
  