import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SimpleFooter = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-600/25 flex items-center justify-center">
                  <img src="/vite.png" alt="Sahai.ai Logo" width={40} height={40} className="text-white" />
                </div>
                <div className="text-xs text-blue-400">AI + SDG Platform for Citizens</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm max-w-sm">
              Student-led innovation empowering Indian citizens to discover government schemes 
              and contribute to Sustainable Development Goals through AI.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-blue-400" />
                <span className="text-sm text-gray-300">contact@novonixsoft.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-blue-400" />
                <span className="text-sm text-gray-300">+91 9876-SAHAI-AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-blue-400" />
                <span className="text-sm text-gray-300">Sharda University, Agra</span>
              </div>
            </div>
          </div>

          {/* Platform Features */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform Features</h3>
            <ul className="space-y-2">
              {[
                'Government Schemes',
                'SDG Tools & Resources', 
                'AI-Powered Matching',
                'Multilingual Support',
                'Community Projects'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Novonixsoft */}
          <div>
            <h3 className="font-semibold text-white mb-4">About Novonixsoft</h3>
            <ul className="space-y-2">
              {[
                'Student Startup Story',
                'Founder: Manish Rajput',
                'IIC Sharda University', 
                'Social Impact Mission',
                'Academic Partnership'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & SDG Impact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Join Our Mission</h3>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Get updates on SDG projects and government schemes
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Join
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-300 mb-3">Follow our journey</p>
              <div className="flex space-x-3">
                {[
                  { icon: <Twitter size={18} />, label: 'Twitter' },
                  { icon: <Facebook size={18} />, label: 'Facebook' },
                  { icon: <Instagram size={18} />, label: 'Instagram' },
                  { icon: <Linkedin size={18} />, label: 'LinkedIn' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-300">
                © 2024 Novonixsoft. All rights reserved.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Made with dedication by students for India's future
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Founded by Manish Rajput | IIC Sharda University Agra
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-800 rounded-full mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-300">Empowering 25,000+ Citizens</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-900/50 rounded-full">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-xs text-gray-300">Contributing to 17 SDGs</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Student Innovation for Social Impact</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;