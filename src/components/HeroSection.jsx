import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                className="text-5xl lg:text-6xl font-heading font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Your Rights,
                </span>
                <br />
                In Your Language,
                <br />
                <span className="text-secondary">In Seconds</span>
              </motion.h1>
              
              <motion.p
                className="text-xl text-text-secondary max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Discover government schemes and benefits you're eligible for. Simply scan your documents or speak in your language.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button className="flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 hover:scale-105 shadow-lg">
                <Zap size={20} />
                <span className="font-semibold">Start Scan</span>
                <ArrowRight size={16} />
              </button>
              
              <button className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
                <Play size={16} />
                <span className="font-semibold">Try Demo</span>
              </button>
            </motion.div>

            <motion.div
              className="flex items-center space-x-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1,234+</div>
                <div className="text-sm text-text-secondary">Schemes Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-text-secondary">Users Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-text-secondary">Languages</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <Zap className="text-white" size={24} />
                  </div>
                  <p className="text-text-secondary">Scan documents instantly</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;