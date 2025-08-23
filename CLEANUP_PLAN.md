# Sahai.ai Codebase Cleanup Plan

## Files to Delete (Unused Components)

### 1. Duplicate/Unused Main Components
- `src/components/Header.jsx` (use ModernHeader.jsx)
- `src/components/HeroSection.jsx` (use ModernHero.jsx)
- `src/components/UploadSection.jsx` (use ModernUploadSection.jsx)
- `src/components/ResultsSection.jsx` (use SimpleResultsSection.jsx)
- `src/components/CTASection.jsx` (use SimpleCTASection.jsx)
- `src/components/Footer.jsx` (use SimpleFooter.jsx)
- `src/components/LoginModal.jsx` (not used)

### 2. Unused API Services
- `src/services/api/openRouter.js` ⚠️ CONTAINS HARDCODED API KEY
- `src/services/api/geminiService.js` (Firebase Functions not used)
- `src/services/api/defaultSchemes.js` (not imported)
- `src/services/api/speechService.js` (voice feature incomplete)

### 3. Unused Auth Components
- `src/auth/components/ThreeBackground.jsx`
- `src/auth/components/ParticleBackground.jsx`
- `src/auth/hooks/` (empty directory)

### 4. Unused SDG Platform (if not needed)
- `src/sdg/components/SDGDashboard.jsx`
- `src/sdg/components/AISolutionsDashboard.jsx`
- `src/sdg/components/AISolutionTool.jsx`
- `src/sdg/components/AIAssistant.jsx`
- `src/sdg/pages/` (all files except SimplePersonalizedSuggestions.jsx)
- `src/sdg/tools/` (all AI tool files)
- `src/sdg/services/`
- `src/sdg/utils/`
- `src/sdg/SDGPlatform.jsx`

### 5. Unused Styles
- `src/styles/theme.css` (use simple-theme.css)

## Dependencies to Remove

```bash
npm uninstall react-tsparticles tsparticles three react-intersection-observer workbox-precaching workbox-routing workbox-strategies @google/generative-ai
```

## Critical Security Fixes

### 1. Remove Hardcoded API Key
File: `src/services/api/openRouter.js` line 2
```javascript
// REMOVE THIS LINE:
const API_KEY = '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';
```

### 2. Add CSRF Protection
- Implement CSRF tokens for API calls
- Add request validation

### 3. Environment Variables
Ensure all API keys use environment variables:
```javascript
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
```

## Code Quality Improvements

### 1. Add Internationalization
Install and configure i18next for multi-language support

### 2. Remove Unused Imports
Clean up imports in remaining files

### 3. Consolidate Services
- Keep only `openRouterService.js`
- Remove duplicate API implementations

## Estimated Size Reduction
- **Files**: ~40 unused files
- **Dependencies**: ~8 unused packages
- **Bundle Size**: Estimated 30-40% reduction
- **Security**: Critical vulnerabilities fixed

## Implementation Steps
1. Backup current codebase
2. Remove unused files (start with SDG platform if not needed)
3. Remove unused dependencies
4. Fix security issues (API keys)
5. Test remaining functionality
6. Update imports and references
7. Run build to verify everything works