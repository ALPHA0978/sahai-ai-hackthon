import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Camera, Mic, Upload, FileText, Loader, X } from 'lucide-react';
import { processUploadedFile } from '../services/api/ocrService';
import { analyzeDocument } from '../services/api/openRouter';
import { transcribeAudio, startRecording } from '../services/api/speechService';

const UploadSection = ({ onSchemesFound }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [textInput, setTextInput] = useState('');
  const fileInputRef = useRef(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    setProgress(20);

    try {
      const extractedText = await processUploadedFile(file);
      setProgress(60);
      
      const userProfile = await analyzeDocument(extractedText);
      setProgress(80);
      
      if (userProfile && onSchemesFound) {
        onSchemesFound(userProfile);
      }
      setProgress(100);
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 1000);
    }
  }, [onSchemesFound]);

  const handleVoiceInput = async () => {
    if (isRecording) {
      if (recorder) {
        recorder.stop();
        setIsRecording(false);
      }
      return;
    }

    try {
      setIsRecording(true);
      const { recorder: mediaRecorder } = await startRecording();
      setRecorder(mediaRecorder);

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsProcessing(true);
        setProgress(30);

        try {
          const audioBlob = new Blob(mediaRecorder.chunks, { type: 'audio/wav' });
          const transcribedText = await transcribeAudio(audioBlob);
          setProgress(70);
          
          const userProfile = await analyzeDocument(transcribedText);
          setProgress(90);
          
          if (userProfile && onSchemesFound) {
            onSchemesFound(userProfile);
          }
          setProgress(100);
        } catch (error) {
          console.error('Voice processing error:', error);
        } finally {
          setTimeout(() => {
            setIsProcessing(false);
            setProgress(0);
          }, 1000);
        }
      };
    } catch (error) {
      console.error('Recording error:', error);
      setIsRecording(false);
    }
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
    setProgress(30);
    setShowTextModal(false);
    
    try {
      const userProfile = await analyzeDocument(textInput);
      setProgress(80);
      
      if (userProfile && onSchemesFound) {
        onSchemesFound(userProfile);
      }
      setProgress(100);
    } catch (error) {
      console.error('Text processing error:', error);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
        setTextInput('');
      }, 1000);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
            Upload Your Documents
          </h2>
          <p className="text-lg text-text-secondary">
            Drag and drop your documents, take a photo, or speak to get started
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            isDragActive 
              ? 'border-primary bg-primary/5 shadow-lg scale-105' 
              : 'border-gray-300 hover:border-primary hover:bg-primary/5 hover:shadow-custom'
          }`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          
          {isProcessing ? (
            <div className="space-y-4">
              <Loader className="w-12 h-12 text-primary mx-auto animate-spin" />
              <p className="text-lg font-medium text-text-primary">Processing your document...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-text-secondary">{progress}% complete</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div>
                <p className="text-xl font-medium text-text-primary mb-2">
                  {isDragActive ? 'Drop your files here' : 'Drag & drop your documents here'}
                </p>
                <p className="text-text-secondary">
                  or click to browse • Supports PDF, JPG, PNG
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center space-x-4 mt-8"
        >
          <button 
            onClick={handleTakePhoto}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Camera className="w-5 h-5 text-primary" />
            <span className="font-medium">Take Photo</span>
          </button>
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <button 
            onClick={handleVoiceInput}
            disabled={isProcessing}
            className={`flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md ${
              isRecording ? 'bg-red-50 border-red-300' : ''
            }`}
          >
            <Mic className={`w-5 h-5 ${isRecording ? 'text-red-500' : 'text-primary'}`} />
            <span className="font-medium">{isRecording ? 'Recording...' : 'Voice Input'}</span>
          </button>
          
          <button 
            onClick={() => setShowTextModal(true)}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-medium">Type Details</span>
          </button>
        </motion.div>

        {/* Text Input Modal */}
        {showTextModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Enter Your Details</h3>
                <button 
                  onClick={() => setShowTextModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>
              
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter details like: Name, Age, Location (State/District), Occupation, Annual Income, Caste Category (General/SC/ST/OBC), Gender, Marital Status, Education Level, Land Ownership, Family Size, etc."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-primary"
              />
              
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => setShowTextModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim()}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadSection;