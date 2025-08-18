import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imageFile) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imageFile, 'eng+hin', {
      logger: m => console.log(m)
    });
    return text;
  } catch (error) {
    console.error('OCR Error:', error);
    return '';
  }
};

export const processUploadedFile = async (file) => {
  if (file.type.startsWith('image/')) {
    return await extractTextFromImage(file);
  } else if (file.type === 'application/pdf') {
    // For PDF processing, you'd need pdf-parse or similar
    return 'PDF processing not implemented yet';
  }
  return '';
};