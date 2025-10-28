const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;

export class SchemeTranslator {
  static async translateSchemes(schemes, targetLanguage) {
    if (!targetLanguage || targetLanguage === 'en') return schemes;
    
    try {
      const translatedSchemes = await Promise.all(
        schemes.map(scheme => this.translateScheme(scheme, targetLanguage))
      );
      return translatedSchemes;
    } catch (error) {
      console.error('Translation error:', error);
      return schemes;
    }
  }

  static async translateScheme(scheme, targetLanguage) {
    const fieldsToTranslate = ['title', 'description', 'amount', 'category'];
    const translated = { ...scheme };

    for (const field of fieldsToTranslate) {
      if (scheme[field]) {
        translated[field] = await this.translateText(scheme[field], targetLanguage);
      }
    }

    return translated;
  }

  static async translateText(text, targetLanguage) {
    if (!GOOGLE_TRANSLATE_API_KEY) return text;

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: text,
            target: targetLanguage,
            format: 'text'
          })
        }
      );

      const data = await response.json();
      return data.data?.translations?.[0]?.translatedText || text;
    } catch (error) {
      console.error('Translation API error:', error);
      return text;
    }
  }
}
