"use client"

import { ArrowRight, Calendar, User, Clock, Tag } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Insights, trends, and innovations in AI-powered commercial production.
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "The Future of AI in Commercial Production",
              excerpt: "Explore how artificial intelligence is revolutionizing the commercial production industry.",
              category: "Technology",
              date: "June 12, 2025",
              readTime: "5 min read",
              author: "Alex Johnson",
            },
            {
              title: "Creating Emotional Connections Through AI Storytelling",
              excerpt: "Learn how AI can help craft narratives that resonate deeply with your target audience.",
              category: "Storytelling",
              date: "June 8, 2025",
              readTime: "7 min read",
              author: "Maria Chen",
            },
            {
              title: "Cost Efficiency: Traditional vs. AI Commercial Production",
              excerpt:
                "A detailed comparison of production costs between traditional methods and AI-powered approaches.",
              category: "Business",
              date: "June 3, 2025",
              readTime: "6 min read",
              author: "David Smith",
            },
            {
              title: "The Ethics of AI in Creative Industries",
              excerpt: "Examining the ethical considerations and responsibilities when using AI in creative work.",
              category: "Ethics",
              date: "May 28, 2025",
              readTime: "8 min read",
              author: "Priya Patel",
            },
            {
              title: "Case Study: How Brand X Increased Engagement by 300%",
              excerpt: "A detailed look at how AI-powered commercials transformed Brand X's marketing results.",
              category: "Case Study",
              date: "May 22, 2025",
              readTime: "10 min read",
              author: "James Wilson",
            },
            {
              title: "Emerging Trends in AI Visual Effects",
              excerpt: "Discover the cutting-edge visual effects techniques made possible by recent AI advancements.",
              category: "Technology",
              date: "May 15, 2025",
              readTime: "6 min read",
              author: "Sophia Lee",
            },
          ].map((post, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-red-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 relative">
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-800 mb-3 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-red-700/80 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-red-600/70 mb-4">
                  <div className="flex items-center mr-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center mr-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-800 font-medium group-hover:underline transition-all flex items-center">
                  Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-red-100 mb-16">
          <h2 className="text-2xl font-bold text-red-800 mb-6">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Technology",
              "Storytelling",
              "Business",
              "Ethics",
              "Case Study",
              "Production",
              "Innovation",
              "AI Research",
            ].map((category, index) => (
              <button
                key={index}
                className="rounded-full border border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800 px-4 py-2 transition-colors flex items-center"
              >
                <Tag className="w-4 h-4 mr-2" />
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl shadow-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6">
              Stay updated with the latest trends and insights in AI-powered commercial production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                className="flex-grow px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none"
                placeholder="Your email address"
              />
              <button className="bg-white text-red-600 hover:bg-red-100 px-6 py-3 font-semibold rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
