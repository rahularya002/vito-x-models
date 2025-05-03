export const FAQ = () => {
  const faqs = [
    {
      question: "How do I create a new campaign?",
      answer: "To create a new campaign, navigate to the Campaigns section in your dashboard and click on the \"New Campaign\" button. Follow the step-by-step wizard to set up your campaign details, select models, and upload your products."
    },
    {
      question: "How are models selected for my products?",
      answer: "Models are matched to your products based on several factors including their specialty, availability, and your campaign requirements. You can also manually select specific models from our catalog for your campaigns."
    },
    {
      question: "What file formats are supported for product uploads?",
      answer: "We support JPG, PNG, and WebP formats for product images. For the best results, we recommend high-resolution images (at least 1200x1200 pixels) with a clean background."
    },
    {
      question: "How do I track the performance of my campaigns?",
      answer: "You can track campaign performance in the Analytics section of your dashboard. We provide metrics such as impressions, clicks, engagement rates, and conversion data for each of your active campaigns."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), as well as PayPal and bank transfers for enterprise accounts. All payments are processed securely through our payment gateway."
    },
    {
      question: "How can I upgrade or downgrade my subscription?",
      answer: "You can change your subscription plan at any time by going to the Billing section in your account settings. Changes to your subscription will take effect at the start of your next billing cycle."
    }
  ];

  return (
    <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
            <p className="text-white/70">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 