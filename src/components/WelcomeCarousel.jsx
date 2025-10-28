import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Heart, QrCode, AlertTriangle, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

const WelcomeCarousel = ({ onContinue }) => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [showQR, setShowQR] = useState(false);
  
  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिंदी' },
    { code: 'BN', name: 'বাংলা' },
    { code: 'TE', name: 'తెలుగు' },
    { code: 'MR', name: 'मराठी' },
    { code: 'TA', name: 'தமிழ்' },
    { code: 'GU', name: 'ગુજરાતી' },
    { code: 'KN', name: 'ಕನ್ನಡ' },
    { code: 'ML', name: 'മലയാളം' },
    { code: 'PA', name: 'ਪੰਜਾਬੀ' }
  ];

  const items = [
    {
      title: 'Choose Language',
      description: 'Select your preferred language',
      id: 1,
      icon: <Globe className="h-[16px] w-[16px] text-white" />,
      content: (
        <select
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className="w-full bg-white/95 border border-white/60 rounded-lg px-4 py-2 text-gray-900 backdrop-blur-md shadow-inner"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-black">
              {lang.name}
            </option>
          ))}
        </select>
      )
    },
    {
      title: 'Support Us',
      description: 'This website works on donations',
      id: 2,
      icon: <Heart className="h-[16px] w-[16px] text-white" />,
      content: (
        <button
          onClick={() => setShowQR(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
        >
          <QrCode size={16} />
          Donate Now
        </button>
      )
    },
    {
      title: 'Prototype Phase',
      description: 'Report issues in Report section',
      id: 3,
      icon: <AlertTriangle className="h-[16px] w-[16px] text-white" />,
      content: (
        <p className="text-sm text-white">
          If you find any problems, please send a report in the Report section
        </p>
      )
    },
    {
      title: 'Ready to Start',
      description: 'Click below to enter the website',
      id: 4,
      icon: <ArrowRight className="h-[16px] w-[16px] text-white" />,
      content: (
        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
        >
          <ArrowRight size={16} />
          Enter Website
        </button>
      )
    }
  ];

  const baseWidth = 350;
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex(prev => Math.min(prev + 1, items.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      {/* Lighting effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sahai.ai</h1>
          <p className="text-xl text-white/90">Your Rights, In Your Language, In Seconds</p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative overflow-hidden p-4 rounded-[24px] border border-white/30 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl mx-auto shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.3)]"
          style={{ width: `${baseWidth}px` }}
        >
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={{
              left: -trackItemOffset * (items.length - 1),
              right: 0
            }}
            style={{
              width: itemWidth,
              gap: `${GAP}px`,
              perspective: 1000,
              perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
              x
            }}
            onDragEnd={handleDragEnd}
            animate={{ x: -(currentIndex * trackItemOffset) }}
            transition={effectiveTransition}
          >
            {items.map((item, index) => {
              const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
              const outputRange = [90, 0, -90];
              const rotateY = useTransform(x, range, outputRange, { clamp: false });
              return (
                <motion.div
                  key={index}
                  className="relative shrink-0 bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-lg border border-white/40 rounded-[12px] overflow-hidden cursor-grab active:cursor-grabbing shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4),0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.5),0_0_30px_rgba(59,130,246,0.4)]"
                  style={{
                    width: itemWidth,
                    height: '280px',
                    rotateY: rotateY
                  }}
                  transition={effectiveTransition}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                  <div className="h-full p-5 flex flex-col items-center justify-center text-center">
                    <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg mb-4">
                      {item.icon}
                    </span>
                    <div className="mb-3 font-black text-lg text-white">{item.title}</div>
                    <p className="text-sm text-white/80 mb-4">{item.description}</p>
                    <div className="w-full">{item.content}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Dots */}
          <div className="flex w-full justify-center">
            <div className="mt-4 flex gap-2">
              {items.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all duration-200 ${
                    currentIndex === index 
                      ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]' 
                      : 'bg-blue-300/40 shadow-[0_0_6px_rgba(59,130,246,0.3)]'
                  }`}
                  animate={{
                    scale: currentIndex === index ? 1.3 : 1
                  }}
                  onClick={() => setCurrentIndex(index)}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Swipe instruction */}
        <p className="mt-6 text-white/80 text-sm">Swipe to explore all options</p>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60" onClick={() => setShowQR(false)}>
          <div className="bg-white p-6 rounded-lg max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Support Sahai.ai</h3>
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="text-center text-gray-600">
                <QrCode size={48} className="mx-auto mb-2" />
                <p className="text-sm">QR Code for Donations</p>
                <p className="text-xs mt-2">UPI: sahai@upi</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Your donations help us maintain and improve this free service.
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeCarousel;
