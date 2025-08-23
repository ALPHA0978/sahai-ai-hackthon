import { ArrowRight, Zap } from 'lucide-react';

const SimpleCTASection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500 text-white">
              <Zap size={16} />
              <span className="text-sm font-medium">Ready to Get Started?</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Find Your Benefits Today
            </h2>
            
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              It takes less than <span className="font-semibold text-white">30 seconds</span> to discover 
              government schemes you're eligible for. Join 50,000+ Indians who found their benefits!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <Zap size={20} />
              <span>Start Your Scan Now</span>
              <ArrowRight size={20} />
            </button>
            
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { title: 'Free to Use', desc: 'No hidden charges' },
              { title: 'Secure & Private', desc: 'Your data is safe' },
              { title: 'Multi-language', desc: '12+ Indian languages' }
            ].map((feature, index) => (
              <div key={index} className="bg-blue-500 bg-opacity-50 p-6 rounded-lg">
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-blue-100">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 pt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-white text-sm font-medium">50,000+ Users Trust Us</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span className="text-white text-sm font-medium">99% Success Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-white text-sm font-medium">Government Approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleCTASection;