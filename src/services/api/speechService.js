const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/audio/transcriptions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const transcribeAudio = async (audioBlob) => {
  try {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    formData.append('model', 'whisper-1');
    formData.append('language', 'hi');

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Sahai.ai'
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Speech API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.text || '';
  } catch (error) {
    console.error('Speech transcription error:', error);
    return '';
  }
};

export const startRecording = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          resolve(blob);
        };

        mediaRecorder.start();
        
        // Auto stop after 30 seconds
        setTimeout(() => {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
        }, 30000);

        // Return recorder for manual stop
        resolve({ recorder: mediaRecorder, stream });
      })
      .catch(reject);
  });
};