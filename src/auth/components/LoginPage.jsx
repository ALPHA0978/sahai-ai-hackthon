import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import WelcomePanel from './WelcomePanel';
import LoginForm from './LoginForm';

const LoginPage = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(25px)', WebkitBackdropFilter: 'blur(25px)', isolation: 'isolate' }}>
        <style>
          {`
            body {
              overflow: hidden;
            }
            .shadow-inner {
              box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.5), 
                          inset -5px -5px 10px rgba(100, 100, 100, 0.2);
            }
          `}
        </style>



        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 text-white hover:text-gray-300"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
        >
          <X size={24} />
        </button>

        {/* Main Container */}
        <div className="min-h-screen flex items-center justify-center font-sans p-2 sm:p-4 md:p-6 antialiased relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="border border-white/20 rounded-[2rem] shadow-2xl flex flex-col md:flex-row w-full max-w-sm sm:max-w-md md:max-w-2xl overflow-hidden transform transition-all duration-300 hover:shadow-primary/30 relative z-10"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }}
          >
            {/* Welcome Panel */}
            <WelcomePanel isSignUp={isSignUp} />

            {/* Login Form */}
            <LoginForm 
              isSignUp={isSignUp} 
              onToggleMode={toggleMode}
              onClose={onClose}
            />
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default LoginPage;