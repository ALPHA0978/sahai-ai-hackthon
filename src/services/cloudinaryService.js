const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dnkbowuub/image/upload';
const UPLOAD_PRESET = 'sahai_ai_uploads'; 

export const CloudinaryService = {
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Upload failed');
    return await response.json();
  }
};