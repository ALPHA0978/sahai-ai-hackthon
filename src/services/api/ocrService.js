import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imageFile) => {
  try {
    console.log('Starting OCR processing...');
    const { data: { text } } = await Tesseract.recognize(imageFile, 'eng+hin+ben+tel+tam+guj+kan+mal+pan+ori', {
      logger: m => {
        if (m.status === 'recognizing text') {
          console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
        }
      },
      tessedit_pageseg_mode: Tesseract.PSM.AUTO,
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,:-/()'
    });
    console.log('OCR completed, extracted text length:', text.length);
    return text.trim();
  } catch (error) {
    console.error('OCR Error:', error);
    return '';
  }
};

export const processUploadedFile = async (file) => {
  console.log('Processing file:', file.name, file.type, file.size);
  
  if (file.type.startsWith('image/')) {
    console.log('Processing as image file');
    return await extractTextFromImage(file);
  } else if (file.type === 'application/pdf') {
    console.log('Processing as PDF file');
    try {
      // For PDF files, suggest using image conversion
      return 'PDF detected. For best results, please convert your PDF to an image (JPG/PNG) or use the camera to capture the document.';
    } catch (error) {
      console.error('PDF processing error:', error);
      return 'PDF processing not supported. Please upload an image (JPG/PNG) or use the camera feature.';
    }
  }
  
  console.log('Unsupported file type:', file.type);
  return 'Unsupported file type. Please upload an image (JPG, PNG) or use the camera feature.';
};