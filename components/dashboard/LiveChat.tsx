import { Send } from 'lucide-react';

export const LiveChat = () => {
  return (
    <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-bold text-white mb-6">Live Chat Support</h2>

      <div className="bg-stone-800 rounded-lg p-4 border border-white/10 mb-6">
        <p className="text-white mb-4">
          Our live chat support is available Monday through Friday, 9:00 AM to 6:00 PM EST.
        </p>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <p className="text-white">Support agents are currently online</p>
        </div>
      </div>

      <div className="bg-stone-800 rounded-lg border border-white/10 h-96 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-medium text-white">Chat with Support</h3>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-red-700 flex items-center justify-center text-white font-medium mr-2">
                S
              </div>
              <div className="bg-stone-700 rounded-lg p-3 max-w-[80%]">
                <p className="text-white">Hello! How can I help you today?</p>
                <p className="text-white/50 text-xs mt-1">10:30 AM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-stone-700 border border-stone-600 rounded-l-lg text-white focus:outline-none"
            />
            <button className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-r-lg">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 