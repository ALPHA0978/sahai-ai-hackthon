import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Moon, Sun, User, LogOut, Menu, X, 
  Bell, Settings, ChevronDown, Search 
} from 'lucide-react';
import { useAuth } from '../auth';
import { LoginPage } from '../auth';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { DataService } from '../services/dataService';


const ModernHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { currentLanguage, changeLanguage: changeLang, t } = useLanguage();
  
  const changeLanguage = (lng) => {
    changeLang(lng);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      DataService.logUserAction(user.uid, 'header_view');
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      if (user) {
        await DataService.logUserAction(user.uid, 'logout');
      }
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
    { code: 'PA', name: 'ਪੰਜਾਬੀ' },
    { code: 'OR', name: 'ଓଡ଼ିଆ' },
    { code: 'AS', name: 'অসমীয়া' },
    { code: 'UR', name: 'اردو' }
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'glass' : ''
        }`}
        style={{
          backgroundColor: isScrolled ? 'var(--bg90)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border)' : 'none'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/25 flex items-center justify-center">
                <img src="/vite.png" alt="Logo" width={40} height={40} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-blue-600">
                  Sahai.ai
                </span>
                <div className="text-xs text-gray-500">
                  Your Rights Assistant
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 w-64 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Globe size={16} />
                  <span className="text-sm font-medium">{languages.find(l => l.code === currentLanguage)?.name || 'EN'}</span>
                  <ChevronDown size={14} className={`transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} />
                </button>
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                          currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* User Section */}
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* Notifications */}
                  <button className="relative p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                    <Bell size={20} />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-3 p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName} 
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">
                            {user.displayName?.charAt(0) || user.email?.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-medium hidden lg:block">
                        {user.displayName || user.email?.split('@')[0]}
                      </span>
                      <ChevronDown size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Dropdown */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="p-2">
                          <button 
                            onClick={() => {
                              window.location.href = '/profile-setup';
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                          >
                            <User size={16} />
                            <span>My Profile</span>
                          </button>
                          <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
                            <Settings size={16} />
                            <span>{t('settings')}</span>
                          </button>
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          >
                            <LogOut size={16} />
                            <span>{t('logout')}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLoginPage(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <User size={16} />
                  <span>{t('login')}</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t"
              style={{ 
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <div className="px-4 py-4 space-y-3">
                {/* Mobile Search */}
                <div className="relative">
                  <Search 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{ color: 'var(--text40)' }}
                  />
                  <input
                    type="text"
                    placeholder="Search schemes..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)'
                    }}
                  />
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => changeLanguage(currentLanguage === 'EN' ? 'HI' : 'EN')}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg btn-secondary"
                  >
                    <Globe size={16} />
                    <span>{languages.find(l => l.code === currentLanguage)?.name || 'EN'}</span>
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg btn-secondary"
                  >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </button>

                  {!user && (
                    <button 
                      onClick={() => {
                        setShowLoginPage(true);
                        setShowMobileMenu(false);
                      }}
                      className="btn btn-primary"
                    >
                      <User size={16} />
                      <span>{t('login')}</span>
                    </button>
                  )}
                </div>

                {/* Mobile User Section */}
                {user && (
                  <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center space-x-3 mb-3">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName} 
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.displayName?.charAt(0) || user.email?.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium" style={{ color: 'var(--text)' }}>
                          {user.displayName || user.email?.split('@')[0]}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text60)' }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Login Modal */}
      <LoginPage 
        isOpen={showLoginPage}
        onClose={() => setShowLoginPage(false)}
      />



      {/* Click outside to close menus */}
      {(showUserMenu || showMobileMenu || showLanguageMenu) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
            setShowLanguageMenu(false);
          }}
        />
      )}
    </>
  );
};

export default ModernHeader;