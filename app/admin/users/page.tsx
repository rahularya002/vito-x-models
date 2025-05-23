'use client'

import { useState, useEffect } from "react"
import { Search, Filter, MoreVertical } from "lucide-react"

// TypeScript interface for user data from MongoDB
interface User {
  _id: string;
  email: string;
  fullName: string;
  companyName: string;
  industry: string;
  timestamp: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch users from MongoDB
  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        // API route to fetch users from MongoDB
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Users</h1>
          <p className="text-white/60">Manage user accounts</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-stone-900 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-stone-900 border border-white/10 rounded-lg py-2 px-4 text-white hover:bg-stone-800 transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 text-red-500 p-4 rounded-lg">{error}</div>
      ) : (
        <div className="bg-stone-900 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Company</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Industry</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Joined</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-white/5 hover:bg-stone-800/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-stone-800">
                            <div className="h-full w-full flex items-center justify-center text-white/60 text-sm">
                              {user.fullName.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.fullName}</p>
                            <p className="text-white/60 text-sm">{user.companyName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-white/80">{user.email}</td>
                      <td className="py-3 px-4 text-white/80">{user.companyName}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-500">
                          {user.industry}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white/80">
                        {new Date(user.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-white/60 hover:text-white">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-white/60">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}