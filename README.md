# Sahai.ai - Government Scheme Discovery Platform

**Your Rights, In Your Language, In Seconds**

Sahai.ai is an AI-powered platform that helps Indian citizens discover government schemes and benefits they're eligible for through document scanning, voice input, and intelligent analysis.

## 🚀 Features

- **Document Analysis**: Upload documents for automatic profile extraction
- **Voice Input**: Speak in your language for hands-free interaction
- **Smart Eligibility**: AI-powered eligibility checking with detailed reasoning
- **Real-time Schemes**: Latest government schemes with official application links
- **Multi-language Support**: Available in multiple Indian languages
- **Responsive Design**: Works seamlessly across all devices

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **AI/ML**: OpenRouter API (Google Gemini)
- **OCR**: Tesseract.js
- **Analytics**: Firebase Analytics
- **Icons**: Lucide React

## 📦 Installation

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

## 🔧 Environment Setup

Create a `.env` file in the root directory:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🎯 How It Works

1. **Upload Documents**: Users can drag & drop documents, take photos, or type details
2. **AI Analysis**: OpenRouter API extracts user profile and analyzes eligibility
3. **Scheme Discovery**: AI finds relevant government schemes based on user criteria
4. **Eligibility Check**: Each scheme shows eligibility status with detailed reasoning
5. **Direct Application**: Users can apply directly through official government links

## 📱 Usage

### Document Upload
- Drag and drop documents (PDF, JPG, PNG)
- Click "Take Photo" to capture documents
- Use "Voice Input" to speak your details
- Click "Type Details" to manually enter information

### Eligibility Criteria
The AI analyzes multiple factors:
- Age limits and ranges
- Income thresholds (BPL, EWS, LIG)
- Caste category requirements
- Gender-specific schemes
- State/district eligibility
- Occupation-based criteria
- Education level requirements
- Land ownership status

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── HeroSection.jsx # Landing section
│   ├── UploadSection.jsx # File upload interface
│   ├── ResultsSection.jsx # Scheme results display
│   ├── CTASection.jsx  # Call-to-action section
│   └── Footer.jsx      # Footer component
├── services/           # API services
│   ├── api/
│   │   ├── openRouter.js    # OpenRouter API integration
│   │   ├── ocrService.js    # OCR text extraction
│   │   ├── speechService.js # Speech-to-text
│   │   └── defaultSchemes.js # Default scheme loader
│   └── firebase.js     # Firebase configuration
├── App.jsx            # Main application component
├── App.css           # Custom styles
└── main.jsx          # Application entry point
```

## API Integration

### OpenRouter API
- **Model**: Google Gemini Flash 1.5
- **Purpose**: Document analysis and scheme discovery
- **Features**: Eligibility checking with detailed reasoning

### Firebase Analytics
- **Tracking**: User interactions and engagement
- **Performance**: Real-time analytics dashboard

## Design System

- **Primary Color**: #2563EB (Blue)
- **Secondary Color**: #FACC15 (Yellow)
- **Typography**: Inter (body), Poppins (headings)
- **Components**: Shadcn/UI compatible
- **Animations**: Framer Motion

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with Vite
- **Loading Time**: <2s initial load
- **Accessibility**: WCAG AA compliant

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

---

**Made with ❤️ for India** 🇮🇳