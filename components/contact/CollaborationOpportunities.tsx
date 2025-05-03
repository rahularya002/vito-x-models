import Link from "next/link";

export const CollaborationOpportunities = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-red-800">COLLABORATION OPPORTUNITIES</h2>
      <div className="space-y-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Product Campaigns</h3>
          <p className="text-white/80 mb-4">
            Showcase your products with our diverse roster of models. From fashion and accessories to lifestyle
            products, our talent can help your brand connect with your target audience.
          </p>
          <Link href="#" className="text-red-800 font-medium hover:underline">
            View our campaign portfolio →
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Brand Ambassadors</h3>
          <p className="text-white/80 mb-4">
            Partner with our models for long-term brand ambassador relationships. Build authentic connections with
            consumers through consistent representation by our professional talent.
          </p>
          <Link href="#" className="text-red-800 font-medium hover:underline">
            Meet our brand ambassadors →
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Digital & Social Media</h3>
          <p className="text-white/80 mb-4">
            Leverage our models social media presence and digital reach to promote your products to engaged
            audiences. Perfect for product launches and digital marketing campaigns.
          </p>
          <Link href="#" className="text-red-800 font-medium hover:underline">
            Explore digital opportunities →
          </Link>
        </div>
      </div>
    </div>
  );
}; 