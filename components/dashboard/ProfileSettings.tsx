import { useState } from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';

interface ProfileSettingsProps {
  profile: any;
  onSubmit: (formData: {
    fullName: string;
    bio: string;
    phone: string;
    avatarFile?: File;
  }) => Promise<void>;
}

export const ProfileSettings = ({ profile, onSubmit }: ProfileSettingsProps) => {
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || "",
    bio: profile?.bio || "",
    phone: profile?.phone || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        avatarFile: avatarFile || undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-start space-x-6">
          <div className="relative h-24 w-24 rounded-full overflow-hidden bg-stone-800">
            <Image
              src={avatarPreview || profile?.avatar_url || "/placeholder.svg?height=96&width=96"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <label htmlFor="avatar-upload" className="cursor-pointer px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg inline-flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Change Photo
            </label>
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAvatarChange}
            />
            <p className="text-white/60 text-sm mt-2">JPG, GIF or PNG. Max size 2MB.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-white mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-white mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}; 