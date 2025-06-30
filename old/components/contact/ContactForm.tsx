import { useState } from "react";

interface ContactFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    company: string;
    project: string;
    message: string;
  }) => Promise<void>;
}

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate required fields
    if (!name || !email || !message) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const formData = {
      name,
      email,
      company,
      project: projectType,
      message
    };

    try {
      await onSubmit(formData);
      // Reset form fields
      setName("");
      setEmail("");
      setCompany("");
      setProjectType("");
      setMessage("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-red-800">GET IN TOUCH</h2>
      {error && (
        <div className="mb-4 p-4 bg-red-800/20 text-red-300 rounded-lg">
          {error}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">Company / Brand</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
            placeholder="Your company or brand name"
          />
        </div>

        <div>
          <label htmlFor="project" className="block text-sm font-medium mb-2">Project Type</label>
          <select
            id="project"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white appearance-none"
            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            <option value="" disabled className="bg-gray-800 text-white">Select project type</option>
            <option value="fashion" className="bg-gray-800 text-white">Fashion Campaign</option>
            <option value="product" className="bg-gray-800 text-white">Product Promotion</option>
            <option value="event" className="bg-gray-800 text-white">Event or Show</option>
            <option value="commercial" className="bg-gray-800 text-white">Commercial Shoot</option>
            <option value="editorial" className="bg-gray-800 text-white">Editorial</option>
            <option value="other" className="bg-gray-800 text-white">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
            placeholder="Tell us about your product and promotion goals..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-red-800 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}; 