import { motion } from 'framer-motion';

const WelcomePanel = ({ isSignUp }) => {
  return (
    <motion.div
      className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex-col justify-center items-center text-white relative overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            {isSignUp ? 'Join Sahai.ai' : 'Welcome Back!'}
          </h2>
          <p className="text-lg opacity-90 mb-6">
            {isSignUp 
              ? 'Discover government schemes and benefits with AI-powered analysis'
              : 'Continue your journey to discover government benefits'
            }
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm">✓</span>
            </div>
            <span>AI-powered document analysis</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm">✓</span>
            </div>
            <span>Personalized scheme recommendations</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm">✓</span>
            </div>
            <span>Multi-language support</span>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
    </motion.div>
  );
};

export default WelcomePanel;