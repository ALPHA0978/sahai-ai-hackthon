import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Mic, Upload, FileText, Loader, X, 
  CheckCircle, AlertCircle, File, Image, 
  Zap, Clock, Shield 
} from 'lucide-react';
import { processUploadedFile } from '../services/api/ocrService';
import { OpenRouterService } from '../services/api/openRouterService';
import { DataService } from '../services/dataService';
// Voice functionality temporarily disabled - speechService removed
import { useAuth } from '../auth';

const ModernUploadSection = ({ onSchemesFound }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processingStep, setProcessingStep] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const updateProgress = (step, percentage) => {
    setProcessingStep(step);
    setProgress(percentage);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setUploadedFiles([file]);
    
    try {
      updateProgress('Uploading document...', 10);
      
      // Upload to Firebase Storage if user is logged in
      let documentUrl = null;
      if (user) {
        const uploadResult = await DataService.uploadDocument(user.uid, file);
        documentUrl = uploadResult.downloadURL;
        updateProgress('Document uploaded securely', 20);
      }

      updateProgress('Extracting text from document...', 40);
      const extractedText = await processUploadedFile(file);
      
      if (!extractedText.trim()) {
        throw new Error('No text could be extracted from the document');
      }

      updateProgress('Analyzing document with AI...', 60);
      
      const userProfile = await OpenRouterService.analyzeDocument(extractedText);
      
      if (!userProfile) {
        throw new Error('Could not extract profile information from document');
      }

      updateProgress('Profile extracted successfully!', 80);
      
      // Log analytics
      if (user) {
        await DataService.logUserAction(user.uid, 'document_processed', {
          fileType: file.type,
          fileSize: file.size,
          documentUrl
        });
      }
      
      updateProgress('Complete!', 100);
      
      if (onSchemesFound) {
        onSchemesFound(userProfile);
      }
      
    } catch (error) {
      console.error('Processing error:', error);
      setError(error.message || 'Failed to process document');
      
      if (user) {
        await DataService.logUserAction(user.uid, 'document_processing_error', {
          error: error.message,
          fileType: file.type
        });
      }
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
        setProcessingStep('');
        setUploadedFiles([]);
      }, 2000);
    }
  }, [onSchemesFound, user]);

  const handleVoiceInput = async () => {
    setError('Voice input feature is temporarily unavailable.');
  };

  const handleTakePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await onDrop([file]);
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    setShowTextModal(false);
    
    try {
      updateProgress('Analyzing text input...', 30);
      
      const userProfile = await OpenRouterService.analyzeDocument(textInput);
      
      if (!userProfile) {
        throw new Error('Could not extract profile information from text');
      }

      updateProgress('Text analysis complete!', 100);
      
      if (user) {
        await DataService.logUserAction(user.uid, 'text_processed', {
          textLength: textInput.length
        });
      }
      
      if (onSchemesFound) {
        onSchemesFound(userProfile);
      }
      
    } catch (error) {
      console.error('Text processing error:', error);
      setError(error.message || 'Failed to process text input');
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
        setProcessingStep('');
        setTextInput('');
      }, 2000);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'application/pdf': ['.pdf']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">

      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-4">
            <Zap size={14} />
            <span className="text-sm font-medium">AI-Powered Analysis</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upload & Discover Your Benefits
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload documents, take photos, speak naturally, or type manually. 
            Our AI analyzes everything to find schemes you're eligible for.
          </p>
        </div>

        {/* Simple Upload Area */}
        <div className="relative">
          <div
            className={`border-2 border-dashed p-8 text-center cursor-pointer rounded-lg transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
            }`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            
            {isProcessing ? (
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-4">
                    {processingStep || 'Processing Document...'}
                  </p>
                  
                  <div className="w-full max-w-md mx-auto">
                    <div className="bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      {progress}% Complete
                    </p>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-red-600 mb-2">
                    Processing Failed
                  </p>
                  <p className="text-sm text-red-500 mb-4">
                    {error}
                  </p>
                  <button 
                    onClick={() => setError(null)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto bg-blue-600 rounded-lg flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {isDragActive ? 'Drop your files here!' : 'Drag & Drop Documents'}
                  </p>
                  <p className="text-sm text-gray-600">
                    or click to browse • Supports PDF, JPG, PNG • Max 10MB
                  </p>
                </div>

                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <File className="w-8 h-8 text-red-500 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">PDF</span>
                  </div>
                  <div className="text-center">
                    <Image className="w-8 h-8 text-green-500 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Images</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Simple Security Badge */}
          <div className="absolute -top-3 right-4">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-100 border border-green-200">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-700">
                Secure & Private
              </span>
            </div>
          </div>
        </div>

        {/* Simple Alternative Input Methods */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <button 
            onClick={handleTakePhoto}
            disabled={isProcessing}
            className="bg-white border rounded-lg p-6 text-center hover:shadow-md transition-shadow disabled:opacity-50"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Take Photo
            </h3>
            <p className="text-sm text-gray-600">
              Capture documents with your camera
            </p>
          </button>
          
          <button 
            onClick={handleVoiceInput}
            disabled={isProcessing}
            className={`bg-white border rounded-lg p-6 text-center hover:shadow-md transition-shadow disabled:opacity-50 ${
              isRecording ? 'border-red-300 bg-red-50' : ''
            }`}
          >
            <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
              isRecording ? 'bg-red-500' : 'bg-blue-600'
            }`}>
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {isRecording ? 'Recording...' : 'Voice Input'}
            </h3>
            <p className="text-sm text-gray-600">
              {isRecording ? 'Click to stop recording' : 'Speak your details'}
            </p>
          </button>
          
          <button 
            onClick={() => setShowTextModal(true)}
            disabled={isProcessing}
            className="bg-white border rounded-lg p-6 text-center hover:shadow-md transition-shadow disabled:opacity-50"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Type Details
            </h3>
            <p className="text-sm text-gray-600">
              Manually enter your information
            </p>
          </button>
        </div>

        {/* Hidden file input for camera */}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Text Input Modal */}
        <AnimatePresence>
          {showTextModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="card p-8 w-full max-w-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>
                    Enter Your Details
                  </h3>
                  <button 
                    onClick={() => setShowTextModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter details like: Name, Age, Location (State/District), Occupation, Annual Income, Caste Category (General/SC/ST/OBC), Gender, Marital Status, Education Level, Land Ownership, Family Size, etc."
                  className="w-full h-40 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)'
                  }}
                />
                
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setShowTextModal(false)}
                    className="flex-1 btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTextSubmit}
                    disabled={!textInput.trim()}
                    className="flex-1 btn btn-primary disabled:opacity-50"
                  >
                    <Zap size={16} />
                    Analyze Text
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simple Processing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: <Clock className="w-6 h-6" />, value: '<30s', label: 'Processing Time' },
            { icon: <CheckCircle className="w-6 h-6" />, value: '99%', label: 'Accuracy Rate' },
            { icon: <Shield className="w-6 h-6" />, value: '100%', label: 'Secure & Private' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-3 text-blue-600">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernUploadSection;