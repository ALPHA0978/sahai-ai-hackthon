import { OpenRouterService } from './api/openRouterService';

export class MySchemeService {
  static async scrapeMySchemeData(filters = {}) {
    try {
      const prompt = `
        You are a real-time government scheme researcher. Find ONLY ACTIVE, CURRENTLY AVAILABLE government schemes from India.
        
        Search criteria: ${JSON.stringify(filters)}
        
        IMPORTANT: Return ONLY schemes that are:
        1. Currently active (not expired)
        2. Have valid application processes
        3. Have working official government websites
        4. Are from verified government sources
        
        For each scheme, verify:
        - Current status (Active/Inactive)
        - Application deadline (if any)
        - Official government website URL
        - Ministry/Department name
        
        Return JSON array with this exact structure:
        {
          "name": "Exact official scheme name",
          "ministry": "Official ministry name",
          "description": "Official description",
          "type": "Central/State",
          "status": "Active",
          "eligibility": "Specific eligibility criteria",
          "benefits": "Exact benefits amount/type",
          "applicationDeadline": "Ongoing/Specific date",
          "officialLink": "Real government website URL",
          "applicationLink": "Direct application URL",
          "tags": ["relevant", "tags"],
          "lastUpdated": "2024 date"
        }
        
        Focus on popular active schemes: PM-KISAN, PMAY, NSP, Ayushman Bharat, etc.
        Verify all URLs are from .gov.in domains.
      `;

      const response = await OpenRouterService.generateText(prompt);
      
      try {
        const schemes = JSON.parse(response);
        const validSchemes = await this.validateSchemes(schemes);
        return Array.isArray(validSchemes) ? validSchemes : this.getActiveSchemes();
      } catch (parseError) {
        console.error('Error parsing schemes data:', parseError);
        return this.getActiveSchemes();
      }
    } catch (error) {
      console.error('Error scraping myScheme data:', error);
      return this.getActiveSchemes();
    }
  }

  static async validateSchemes(schemes) {
    if (!Array.isArray(schemes)) return this.getActiveSchemes();
    
    return schemes.filter(scheme => {
      // Validate scheme has required fields
      return scheme.name && 
             scheme.ministry && 
             scheme.status === 'Active' &&
             scheme.officialLink &&
             scheme.officialLink.includes('.gov.in');
    });
  }

  static getActiveSchemes() {
    return [
      {
        name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        ministry: "Ministry of Agriculture and Farmers Welfare",
        description: "A Central Sector Scheme providing income support to all landholding farmers' families to supplement their financial needs for procuring various inputs related to agriculture and allied activities as well as domestic needs.",
        type: "Central",
        status: "Active",
        eligibility: "All landholding farmers' families",
        benefits: "₹6,000 per year in three equal installments",
        applicationDeadline: "Ongoing",
        officialLink: "https://pmkisan.gov.in",
        applicationLink: "https://pmkisan.gov.in/Registrationform.aspx",
        tags: ["Agriculture", "Financial Assistance", "Farmers", "Income Support"],
        lastUpdated: "2024-01-15"
      },
      {
        name: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
        ministry: "Ministry of Housing and Urban Affairs",
        description: "A flagship scheme providing affordable housing to the urban poor with credit linked subsidy for home loans.",
        type: "Central",
        status: "Active",
        eligibility: "EWS, LIG, and MIG categories in urban areas",
        benefits: "Subsidy up to ₹2.67 lakh on home loans",
        applicationDeadline: "Ongoing till 2024",
        officialLink: "https://pmaymis.gov.in",
        applicationLink: "https://pmaymis.gov.in/Open/Find_Beneficiary_Details.aspx",
        tags: ["Housing", "Urban Development", "Subsidy", "EWS", "LIG", "MIG"],
        lastUpdated: "2024-01-10"
      },
      {
        name: "National Scholarship Portal (NSP) 2024-25",
        ministry: "Ministry of Education",
        description: "A one-stop solution for various scholarship schemes for students from different backgrounds and categories for academic year 2024-25.",
        type: "Central",
        status: "Active",
        eligibility: "Students from SC/ST/OBC/Minority communities pursuing higher education",
        benefits: "₹1,000 to ₹20,000 per year based on course and category",
        applicationDeadline: "31st October 2024",
        officialLink: "https://scholarships.gov.in",
        applicationLink: "https://scholarships.gov.in/fresh/newstdRegfrmInstruction",
        tags: ["Education", "Scholarship", "Students", "SC", "ST", "OBC", "Minority"],
        lastUpdated: "2024-01-20"
      }
    ];
  }

  static async getSchemesByProfile(userProfile) {
    try {
      const prompt = `
        Based on this user profile: ${JSON.stringify(userProfile)}
        
        Find and return relevant government schemes from myScheme portal.
        Consider user's age, income, occupation, state, caste, education, etc.
        
        Return realistic schemes with eligibility matching and reasoning.
        Format as JSON array with scheme details and eligibility status.
      `;

      const response = await OpenRouterService.generateText(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error getting schemes by profile:', error);
      return this.getFallbackSchemes();
    }
  }
}

// Add to OpenRouterService
export const OpenRouterServiceExtended = {
  ...OpenRouterService,
  
  async getAllGovernmentSchemes() {
    return await MySchemeService.scrapeMySchemeData();
  },

  async getSchemesByFilters(filters) {
    return await MySchemeService.scrapeMySchemeData(filters);
  }
};