const ALPHA_VANTAGE_API_URL = 'https://www.alphavantage.co/query';
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

export class AlphaVantageService {
  static async getCommodityPrice(symbol) {
    try {
      const response = await fetch(`${ALPHA_VANTAGE_API_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
      const data = await response.json();
      return data['Global Quote'];
    } catch (error) {
      console.error('Alpha Vantage API error:', error);
      return null;
    }
  }

  static async getTopGainersLosers() {
    try {
      const response = await fetch(`${ALPHA_VANTAGE_API_URL}?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Alpha Vantage API error:', error);
      return null;
    }
  }

  static async getMarketNews(tickers = '') {
    try {
      const response = await fetch(`${ALPHA_VANTAGE_API_URL}?function=NEWS_SENTIMENT&tickers=${tickers}&limit=10&apikey=${API_KEY}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Alpha Vantage API error:', error);
      return null;
    }
  }

  static async analyzeMarketTrends(cropSymbols) {
    try {
      // Get market data for agricultural commodities
      const marketData = await this.getTopGainersLosers();
      const newsData = await this.getMarketNews('CORN,SOYB,WEAT');
      
      // Analyze trends
      const trends = {
        supplyShortages: [],
        priceRising: [],
        marketSentiment: 'neutral'
      };

      if (marketData?.top_gainers) {
        trends.priceRising = marketData.top_gainers
          .filter(stock => stock.symbol && this.isAgricultureRelated(stock.symbol))
          .map(stock => stock.symbol)
          .slice(0, 3);
      }

      if (newsData?.feed) {
        const positiveNews = newsData.feed.filter(article => 
          article.overall_sentiment_score > 0.1
        ).length;
        const totalNews = newsData.feed.length;
        
        if (positiveNews / totalNews > 0.6) {
          trends.marketSentiment = 'positive';
        } else if (positiveNews / totalNews < 0.4) {
          trends.marketSentiment = 'negative';
        }
      }

      return trends;
    } catch (error) {
      console.error('Market analysis error:', error);
      return {
        supplyShortages: [],
        priceRising: [],
        marketSentiment: 'neutral'
      };
    }
  }

  static isAgricultureRelated(symbol) {
    if (!symbol || typeof symbol !== 'string') return false;
    const agriSymbols = ['CORN', 'SOYB', 'WEAT', 'CANE', 'RICE', 'ADM', 'BG', 'CF'];
    return agriSymbols.some(agri => symbol.includes(agri));
  }

  static async getCropPriceProjections(crops) {
    try {
      const projections = [];
      
      for (const crop of crops.slice(0, 3)) {
        // Map crop names to commodity symbols
        const symbol = this.mapCropToSymbol(crop);
        const priceData = await this.getCommodityPrice(symbol);
        
        if (priceData) {
          const currentPrice = parseFloat(priceData['05. price']);
          const changePercent = parseFloat(priceData['10. change percent'].replace('%', ''));
          
          projections.push({
            crop: crop,
            currentPrice: `$${currentPrice.toFixed(2)}`,
            changePercent: `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}%`,
            trend: changePercent > 0 ? 'rising' : 'falling',
            futureProjection: this.calculateProjection(changePercent)
          });
        }
      }
      
      return projections;
    } catch (error) {
      console.error('Price projection error:', error);
      return [];
    }
  }

  static mapCropToSymbol(crop) {
    const mapping = {
      'Turmeric': 'CORN', // Proxy for spices
      'Coriander': 'SOYB', // Proxy for seeds
      'Chili': 'WEAT', // Proxy for cash crops
      'Millets': 'CORN',
      'Pulses': 'SOYB',
      'Wheat': 'WEAT',
      'Rice': 'CORN',
      'Cotton': 'SOYB'
    };
    
    return mapping[crop] || 'CORN';
  }

  static calculateProjection(changePercent) {
    if (changePercent > 5) return '+25-40%';
    if (changePercent > 2) return '+15-25%';
    if (changePercent > 0) return '+5-15%';
    if (changePercent > -2) return '-5 to +5%';
    return '-10 to -5%';
  }
}