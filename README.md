# Sahai.ai - Government Scheme Discovery Platform

**Your Rights, In Your Language, In Seconds**

Sahai.ai is an AI-powered platform that helps Indian citizens discover government schemes and benefits they're eligible for through document scanning, voice input, and intelligent analysis.

## Features

- **Document Analysis**: Upload documents for automatic profile extraction
- **Voice Input**: Speak in your language for hands-free interaction
- **Smart Eligibility**: AI-powered eligibility checking with detailed reasoning
- **Real-time Schemes**: Latest government schemes with official application links
- **Multi-language Support**: Available in multiple Indian languages with dynamic translation
- **Responsive Design**: Works seamlessly across all devices
- **Network Translation**: Google Translate API integration for any language support
- **Offline Capability**: Works without internet with cached translations

## Technology Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **AI/ML**: OpenRouter API (Google Gemini)
- **OCR**: Tesseract.js
- **Translation**: Google Translate API + i18next
- **Analytics**: Firebase Analytics
- **Icons**: Lucide React
- **Authentication**: Firebase Auth

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sahai-ai.git

# Navigate to project directory
cd sahai-ai

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

## Environment Configuration

Create a `.env` file in the root directory:

```env
# OpenRouter API for AI processing
VITE_OPENROUTER_API_KEY=your_openrouter_api_key

# Google Translate API for dynamic translations
VITE_GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## How It Works

1. **Upload Documents**: Users can drag & drop documents, take photos, or type details
2. **AI Analysis**: OpenRouter API extracts user profile and analyzes eligibility
3. **Scheme Discovery**: AI finds relevant government schemes based on user criteria
4. **Eligibility Check**: Each scheme shows eligibility status with detailed reasoning
5. **Direct Application**: Users can apply directly through official government links

## Usage Guide

### Document Upload Options
- **Drag & Drop**: Simply drag documents (PDF, JPG, PNG) into the upload area
- **Camera Capture**: Use "Take Photo" to capture documents with your device camera
- **Voice Input**: Speak your details in any supported language
- **Manual Entry**: Type information directly using "Type Details"

### Language Support
- **Static Languages**: Pre-configured Hindi and English translations
- **Dynamic Translation**: Real-time translation to 20+ languages via Google Translate API
- **Offline Mode**: Cached translations work without internet connectivity
- **Auto-Detection**: Automatic language detection from user input

### Eligibility Analysis
The AI system evaluates multiple criteria:
- Age limits and demographic ranges
- Income thresholds (BPL, EWS, LIG categories)
- Caste and reservation category requirements
- Gender-specific scheme eligibility
- Geographic eligibility (state/district/block level)
- Occupation and employment status
- Educational qualification requirements
- Asset ownership (land, property, vehicles)

## Project Architecture

```
src/
├── components/              # React components
│   ├── ModernHeader.jsx    # Navigation with language selector
│   ├── ModernHero.jsx      # Landing section with i18n
│   ├── ModernUploadSection.jsx # File upload interface
│   ├── SimpleResultsSection.jsx # Scheme results display
│   ├── LanguageSelector.jsx # Dynamic language switcher
│   └── SimpleFooter.jsx    # Footer component
├── contexts/               # React contexts
│   ├── LanguageContext.jsx # Language state management
│   └── ThemeContext.jsx    # Theme management
├── i18n/                   # Internationalization
│   ├── index.js           # Base i18next configuration
│   ├── enhancedI18n.js    # Enhanced i18n with Google Translate
│   └── dynamicTranslator.js # Network translation service
├── services/               # API services
│   ├── api/
│   │   ├── openRouterService.js # OpenRouter API integration
│   │   ├── ocrService.js       # OCR text extraction
│   │   └── alphaVantageService.js # Additional API services
│   ├── ai/                 # AI service modules
│   │   ├── schemeAI.js     # Scheme discovery AI
│   │   ├── healthcareAI.js # Healthcare AI tools
│   │   └── educationAI.js  # Education AI tools
│   ├── translationService.js # Network translation handler
│   └── firebase.js         # Firebase configuration
├── auth/                   # Authentication system
│   ├── components/         # Auth UI components
│   └── context/           # Auth context
├── sdg/                    # SDG platform modules
│   ├── components/         # SDG-specific components
│   ├── tools/             # AI-powered SDG tools
│   └── pages/             # SDG dashboard pages
├── App.jsx                # Main application component
├── App.css               # Custom styles
└── main.jsx              # Application entry point
```

## API Integration

### OpenRouter API
- **Model**: Google Gemini Flash 1.5
- **Purpose**: Document analysis and scheme discovery
- **Features**: Eligibility checking with detailed reasoning
- **Endpoints**: Text analysis, document processing, scheme matching

### Google Translate API
- **Service**: Cloud Translation API v2
- **Purpose**: Real-time language translation
- **Features**: Auto-detection, 100+ language support, caching
- **Fallback**: Offline translation cache for network failures

### Firebase Services
- **Analytics**: User interactions and engagement tracking
- **Authentication**: Secure user login and session management
- **Hosting**: Static site deployment and CDN
- **Performance**: Real-time performance monitoring

## Design System

- **Primary Color**: #2563EB (Blue)
- **Secondary Color**: #FACC15 (Yellow)
- **Typography**: Inter (body), Poppins (headings)
- **Components**: Shadcn/UI compatible
- **Animations**: Framer Motion

## Performance Metrics

- **Lighthouse Score**: 95+ across all metrics (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with Vite code splitting and tree shaking
- **Loading Time**: <2s initial load, <500ms subsequent navigation
- **Translation Speed**: <1s for cached translations, <3s for API calls
- **Accessibility**: WCAG AA compliant with screen reader support
- **Mobile Performance**: Optimized for low-bandwidth connections
- **Offline Capability**: Service worker for offline translation cache

## Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Firebase Hosting
npx firebase deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Government of India for open data initiatives
- OpenRouter for AI API services
- Firebase for analytics and hosting
- React and Vite communities

## Support

For support, email support@sahai.ai or join our community discussions.

## Supported Languages

### Pre-configured Languages
- English (en)
- Hindi (हिंदी)
- Bengali (বাংলা)
- Telugu (తెలుగు)
- Marathi (मराठी)
- Tamil (தமிழ்)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Punjabi (ਪੰਜਾਬੀ)
- Odia (ଓଡ଼ିଆ)
- Assamese (অসমীয়া)
- Urdu (اردو)

### Dynamic Translation Support
- Spanish, French, German, Chinese, Japanese, Korean, Arabic
- 100+ additional languages via Google Translate API
- Real-time translation with caching for performance

---

**Made with dedication for India**