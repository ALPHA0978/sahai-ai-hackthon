import { BaseAI } from './baseAI.js';

export class InfrastructureAI extends BaseAI {

  // Comprehensive infrastructure project analysis
  static async analyzeProject(projectData) {
    const systemPrompt = `You are an expert infrastructure engineer and urban planner. Analyze the infrastructure project comprehensively. Return ONLY valid JSON:
{
  "projectOverview": {
    "type": "Transportation|Water|Energy|Digital|Housing|Mixed",
    "scale": "Local|Regional|National",
    "complexity": "Low|Medium|High|Very High",
    "innovationLevel": "Traditional|Modern|Cutting-edge"
  },
  "feasibilityAnalysis": {
    "overallScore": "feasibility score (0-100)",
    "technicalFeasibility": {
      "score": "technical viability (0-100)",
      "challenges": ["technical challenges identified"],
      "solutions": ["proposed technical solutions"],
      "innovations": ["innovative approaches possible"]
    },
    "economicFeasibility": {
      "score": "economic viability (0-100)",
      "costBenefit": "cost-benefit analysis summary",
      "roi": "expected return on investment",
      "paybackPeriod": "estimated payback period",
      "fundingSources": ["potential funding sources"]
    },
    "socialFeasibility": {
      "score": "social acceptance (0-100)",
      "communityImpact": "impact on local communities",
      "stakeholderSupport": "level of stakeholder support",
      "publicBenefit": ["benefits to public"]
    },
    "environmentalFeasibility": {
      "score": "environmental compatibility (0-100)",
      "sustainabilityRating": "Green|Moderate|Concerning",
      "carbonFootprint": "estimated carbon impact",
      "mitigationMeasures": ["environmental mitigation strategies"]
    }
  },
  "impactAssessment": {
    "trafficAndMobility": {
      "improvement": "expected improvement percentage",
      "congestionReduction": "traffic congestion impact",
      "accessibilityGains": ["accessibility improvements"],
      "modalShift": "expected changes in transportation modes"
    },
    "economicImpact": {
      "jobCreation": "jobs created during construction and operation",
      "economicGrowth": "expected economic growth impact",
      "propertyValues": "impact on local property values",
      "businessOpportunities": ["new business opportunities created"]
    },
    "socialImpact": {
      "qualityOfLife": "impact on quality of life",
      "equityConsiderations": ["equity and inclusion factors"],
      "communityConnectivity": "how it connects communities",
      "culturalPreservation": ["cultural heritage considerations"]
    },
    "environmentalImpact": {
      "airQuality": "impact on air quality",
      "waterResources": "impact on water systems",
      "biodiversity": "impact on local ecosystems",
      "climateResilience": "contribution to climate adaptation"
    }
  },
  "riskAssessment": {
    "overallRisk": "Low|Medium|High|Very High",
    "riskCategories": [
      {
        "category": "Technical|Financial|Environmental|Social|Political",
        "risk": "specific risk identified",
        "probability": "Low|Medium|High",
        "impact": "Low|Medium|High|Critical",
        "mitigation": ["risk mitigation strategies"],
        "contingency": ["contingency plans"]
      }
    ],
    "criticalSuccessFactors": ["factors essential for project success"]
  },
  "smartTechnologyIntegration": {
    "iotOpportunities": ["IoT integration possibilities"],
    "dataAnalytics": ["data collection and analysis opportunities"],
    "automationPotential": ["automation possibilities"],
    "digitalTwinCapability": "potential for digital twin modeling",
    "aiApplications": ["AI applications in project operation"]
  },
  "sustainabilityFeatures": {
    "greenTechnologies": ["sustainable technologies to incorporate"],
    "energyEfficiency": ["energy efficiency measures"],
    "wasteReduction": ["waste minimization strategies"],
    "circularEconomy": ["circular economy principles"],
    "climateAdaptation": ["climate change adaptation features"]
  },
  "recommendations": {
    "immediate": ["immediate actions to take"],
    "designOptimizations": ["design improvements to consider"],
    "stakeholderEngagement": ["stakeholder engagement strategies"],
    "phaseImplementation": ["phased implementation approach"],
    "monitoringPlan": ["key performance indicators to monitor"]
  },
  "alternativeScenarios": [
    {
      "scenario": "alternative approach name",
      "description": "scenario description",
      "advantages": ["benefits of this approach"],
      "disadvantages": ["drawbacks of this approach"],
      "feasibilityScore": "feasibility of alternative (0-100)"
    }
  ]
}`;

    const response = await this.callAPI(`Infrastructure Project Analysis:\n${JSON.stringify(projectData, null, 2)}\n\nProvide comprehensive analysis covering technical, economic, social, and environmental aspects.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultAnalysis(projectData);
  }

  // Advanced route and network optimization
  static async optimizeRoute(projectData) {
    const systemPrompt = `You are an expert in transportation engineering and network optimization. Optimize infrastructure routing. Return ONLY valid JSON:
{
  "optimizationResults": {
    "methodology": "optimization approach used",
    "objectiveFunction": "what was optimized for",
    "constraints": ["constraints considered"],
    "improvementAchieved": "percentage improvement over baseline"
  },
  "optimalSolution": {
    "routeDescription": "detailed route description",
    "totalDistance": "total distance with units",
    "estimatedCost": "comprehensive cost estimate",
    "constructionTime": "estimated construction duration",
    "keyFeatures": ["notable features of optimal route"],
    "technicalSpecifications": {
      "designSpeed": "design speed parameters",
      "capacity": "traffic or utility capacity",
      "materials": ["primary materials required"],
      "standards": ["design standards applied"]
    }
  },
  "alternativeRoutes": [
    {
      "name": "alternative route name",
      "description": "route description",
      "distance": "route distance",
      "cost": "estimated cost",
      "advantages": ["benefits of this route"],
      "disadvantages": ["drawbacks of this route"],
      "suitability": "best use case for this alternative",
      "riskLevel": "Low|Medium|High",
      "environmentalImpact": "environmental considerations"
    }
  ],
  "networkIntegration": {
    "existingInfrastructure": ["connections to existing systems"],
    "futureExpansion": ["future expansion possibilities"],
    "intermodalConnections": ["connections to other transport modes"],
    "redundancy": "backup route options"
  },
  "trafficAnalysis": {
    "currentFlow": "existing traffic patterns",
    "projectedFlow": "future traffic projections",
    "peakCapacity": "peak hour capacity",
    "levelOfService": "expected level of service",
    "bottleneckAnalysis": ["potential bottlenecks identified"]
  },
  "costBreakdown": {
    "landAcquisition": "land acquisition costs",
    "construction": "construction costs",
    "utilities": "utility relocation costs",
    "environmental": "environmental mitigation costs",
    "contingency": "contingency allowance",
    "maintenance": "annual maintenance costs"
  },
  "implementationPlan": {
    "phases": [
      {
        "phase": "construction phase name",
        "duration": "phase duration",
        "activities": ["key activities in phase"],
        "milestones": ["phase milestones"],
        "dependencies": ["dependencies on other phases"]
      }
    ],
    "criticalPath": ["critical path activities"],
    "resourceRequirements": ["key resources needed"]
  }
}`;

    const response = await this.callAPI(`Route Optimization Project:\n${JSON.stringify(projectData, null, 2)}\n\nOptimize routing considering cost, efficiency, environmental impact, and integration with existing infrastructure.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultRoute(projectData);
  }

  // Comprehensive impact assessment
  static async assessImpact(projectData) {
    const systemPrompt = `You are an expert in environmental and social impact assessment. Conduct comprehensive impact analysis. Return ONLY valid JSON:
{
  "assessmentScope": {
    "studyArea": "geographical scope of assessment",
    "timeframe": "temporal scope (construction + operation)",
    "methodology": ["assessment methodologies used"],
    "stakeholdersConsulted": ["stakeholder groups engaged"]
  },
  "environmentalImpact": {
    "airQuality": {
      "constructionPhase": {
        "impact": "impact during construction",
        "severity": "Low|Medium|High",
        "duration": "Temporary|Short-term|Long-term|Permanent",
        "mitigation": ["mitigation measures"]
      },
      "operationalPhase": {
        "impact": "impact during operation",
        "severity": "Low|Medium|High",
        "duration": "Temporary|Short-term|Long-term|Permanent",
        "mitigation": ["mitigation measures"]
      }
    },
    "waterResources": {
      "surfaceWater": {
        "impact": "impact on surface water",
        "severity": "Low|Medium|High",
        "mitigation": ["water protection measures"]
      },
      "groundwater": {
        "impact": "impact on groundwater",
        "severity": "Low|Medium|High",
        "mitigation": ["groundwater protection measures"]
      },
      "stormwaterManagement": ["stormwater management strategies"]
    },
    "biodiversity": {
      "habitatImpact": "impact on natural habitats",
      "speciesImpact": "impact on flora and fauna",
      "corridorConnectivity": "impact on wildlife corridors",
      "conservationMeasures": ["biodiversity conservation strategies"],
      "offsetRequirements": ["biodiversity offset needs"]
    },
    "soilAndGeology": {
      "soilContamination": "soil contamination risks",
      "erosionControl": ["erosion prevention measures"],
      "geologicalStability": "geological stability assessment",
      "excavationImpacts": ["impacts from excavation activities"]
    },
    "noiseAndVibration": {
      "constructionNoise": "construction noise impacts",
      "operationalNoise": "operational noise impacts",
      "sensitiveReceptors": ["noise-sensitive locations"],
      "mitigationMeasures": ["noise reduction strategies"]
    },
    "climateChange": {
      "ghgEmissions": "greenhouse gas emissions estimate",
      "carbonFootprint": "project carbon footprint",
      "climateResilience": "climate adaptation features",
      "renewableEnergy": ["renewable energy integration opportunities"]
    }
  },
  "socialImpact": {
    "communityDisplacement": {
      "householdsAffected": "number of households impacted",
      "resettlementPlan": ["resettlement strategies"],
      "compensationFramework": "compensation approach",
      "livelihoodRestoration": ["livelihood restoration measures"]
    },
    "economicImpacts": {
      "localEmployment": "local employment opportunities",
      "businessDisruption": "impact on local businesses",
      "propertyValues": "impact on property values",
      "economicDevelopment": ["economic development opportunities"]
    },
    "socialCohesion": {
      "communityConnectivity": "impact on community connections",
      "culturalSites": "impact on cultural heritage sites",
      "socialServices": "impact on access to social services",
      "vulnerableGroups": ["impacts on vulnerable populations"]
    },
    "publicHealth": {
      "healthRisks": ["potential health risks identified"],
      "healthcareAccess": "impact on healthcare access",
      "safetyMeasures": ["public safety measures"],
      "emergencyResponse": ["emergency response considerations"]
    }
  },
  "cumulativeImpacts": {
    "otherProjects": ["other projects in the area"],
    "combinedEffects": ["cumulative environmental effects"],
    "synergisticImpacts": ["synergistic impacts identified"],
    "managementApproach": ["cumulative impact management"]
  },
  "stakeholderEngagement": {
    "consultationProcess": ["stakeholder consultation methods"],
    "keyIssuesRaised": ["main concerns from stakeholders"],
    "responseStrategies": ["how concerns were addressed"],
    "ongoingEngagement": ["ongoing engagement commitments"]
  },
  "mitigationHierarchy": {
    "avoidance": ["impacts avoided through design"],
    "minimization": ["impacts minimized through measures"],
    "restoration": ["restoration and rehabilitation measures"],
    "offsetting": ["offset requirements and strategies"]
  },
  "monitoringPlan": {
    "environmentalMonitoring": ["environmental parameters to monitor"],
    "socialMonitoring": ["social indicators to track"],
    "reportingSchedule": "monitoring and reporting frequency",
    "adaptiveManagement": ["adaptive management triggers"]
  },
  "complianceRequirements": {
    "permits": ["required permits and approvals"],
    "standards": ["applicable environmental standards"],
    "regulations": ["relevant regulations and guidelines"],
    "certifications": ["sustainability certifications to pursue"]
  }
}`;

    const response = await this.callAPI(`Impact Assessment for:\n${JSON.stringify(projectData, null, 2)}\n\nConduct comprehensive environmental and social impact assessment following international best practices.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultImpact();
  }

  // Comprehensive resource planning and project management
  static async planResources(projectData) {
    const systemPrompt = `You are an expert project manager and resource planner for infrastructure projects. Create comprehensive resource plan. Return ONLY valid JSON:
{
  "projectSummary": {
    "totalCost": "total project cost with currency",
    "duration": "total project duration",
    "complexity": "Low|Medium|High|Very High",
    "riskLevel": "Low|Medium|High",
    "teamSize": "estimated team size"
  },
  "costBreakdown": {
    "directCosts": {
      "materials": "materials cost",
      "labor": "labor cost",
      "equipment": "equipment cost",
      "subcontractors": "subcontractor cost"
    },
    "indirectCosts": {
      "overhead": "overhead cost",
      "administration": "administrative cost",
      "insurance": "insurance cost",
      "permits": "permits and approvals cost"
    },
    "contingency": {
      "percentage": "contingency percentage",
      "amount": "contingency amount",
      "justification": "reason for contingency level"
    }
  },
  "materialRequirements": [
    {
      "category": "material category",
      "materials": [
        {
          "name": "specific material name",
          "quantity": "quantity needed with units",
          "unitCost": "cost per unit",
          "totalCost": "total cost for this material",
          "supplier": "potential suppliers",
          "deliverySchedule": "when material is needed",
          "qualityStandards": ["quality specifications"],
          "sustainabilityRating": "environmental rating if applicable"
        }
      ]
    }
  ],
  "humanResources": {
    "managementTeam": [
      {
        "role": "management position",
        "responsibilities": ["key responsibilities"],
        "qualifications": ["required qualifications"],
        "duration": "engagement duration",
        "cost": "estimated cost"
      }
    ],
    "technicalTeam": [
      {
        "role": "technical position",
        "skillsRequired": ["required skills"],
        "experience": "experience level needed",
        "quantity": "number of people needed",
        "duration": "engagement duration",
        "cost": "estimated cost"
      }
    ],
    "constructionCrew": [
      {
        "trade": "construction trade",
        "quantity": "number of workers",
        "duration": "work duration",
        "skillLevel": "skill level required",
        "cost": "estimated cost"
      }
    ]
  },
  "equipmentRequirements": [
    {
      "category": "equipment category",
      "equipment": [
        {
          "name": "equipment name",
          "type": "equipment type",
          "quantity": "number needed",
          "duration": "usage duration",
          "acquisitionMethod": "Purchase|Rent|Lease",
          "cost": "estimated cost",
          "specifications": ["technical specifications"],
          "operator": "operator requirements"
        }
      ]
    }
  ],
  "projectTimeline": {
    "phases": [
      {
        "phase": "project phase name",
        "startDate": "relative start date",
        "duration": "phase duration",
        "endDate": "relative end date",
        "keyActivities": ["major activities in phase"],
        "deliverables": ["phase deliverables"],
        "dependencies": ["dependencies on other phases"],
        "criticalPath": "true|false if on critical path",
        "resourcePeak": "peak resource requirements",
        "riskFactors": ["phase-specific risks"]
      }
    ],
    "milestones": [
      {
        "milestone": "milestone name",
        "date": "target date",
        "significance": "importance of milestone",
        "criteria": ["completion criteria"]
      }
    ]
  },
  "procurementStrategy": {
    "procurementMethod": "Traditional|Design-Build|PPP|Other",
    "contractStrategy": ["contracting approaches"],
    "supplierSelection": ["supplier selection criteria"],
    "riskAllocation": ["how risks are allocated"],
    "qualityAssurance": ["quality assurance measures"]
  },
  "riskManagement": {
    "scheduleRisks": ["schedule-related risks"],
    "costRisks": ["cost-related risks"],
    "resourceRisks": ["resource availability risks"],
    "mitigationStrategies": ["risk mitigation approaches"],
    "contingencyPlans": ["backup plans for major risks"]
  },
  "sustainabilityConsiderations": {
    "greenMaterials": ["sustainable material options"],
    "wasteManagement": ["waste reduction strategies"],
    "energyEfficiency": ["energy-efficient approaches"],
    "localSourcing": ["local sourcing opportunities"],
    "circularEconomy": ["circular economy principles"]
  },
  "qualityManagement": {
    "qualityStandards": ["applicable quality standards"],
    "inspectionPlan": ["inspection and testing requirements"],
    "qualityControl": ["quality control measures"],
    "documentation": ["required documentation"]
  }
}`;

    const response = await this.callAPI(`Resource Planning for:\n${JSON.stringify(projectData, null, 2)}\n\nCreate comprehensive resource plan covering all aspects of project delivery.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultResources(projectData);
  }

  // Smart city planning and integration
  static async planSmartCity(cityData) {
    const systemPrompt = `You are a smart city planning expert. Design comprehensive smart city solutions. Return ONLY valid JSON:
{
  "cityProfile": {
    "population": "current and projected population",
    "area": "city area",
    "economicProfile": "economic characteristics",
    "currentChallenges": ["major urban challenges"],
    "developmentGoals": ["city development objectives"]
  },
  "smartInfrastructure": {
    "digitalBackbone": {
      "connectivity": ["connectivity infrastructure needs"],
      "dataCenter": ["data center requirements"],
      "cloudServices": ["cloud infrastructure needs"],
      "cybersecurity": ["cybersecurity measures"]
    },
    "iotDeployment": {
      "sensorNetwork": ["IoT sensor deployment plan"],
      "dataCollection": ["data collection strategies"],
      "realTimeMonitoring": ["real-time monitoring systems"],
      "predictiveAnalytics": ["predictive analytics applications"]
    }
  },
  "smartServices": {
    "transportation": {
      "intelligentTraffic": ["smart traffic management systems"],
      "publicTransit": ["smart public transportation"],
      "parkingManagement": ["smart parking solutions"],
      "mobilityAsService": ["mobility-as-a-service options"]
    },
    "utilities": {
      "smartGrid": ["smart electricity grid features"],
      "waterManagement": ["smart water management systems"],
      "wasteManagement": ["smart waste collection and processing"],
      "energyEfficiency": ["energy efficiency programs"]
    },
    "publicSafety": {
      "emergencyResponse": ["smart emergency response systems"],
      "crimePreventionTech": ["crime prevention technologies"],
      "disasterManagement": ["disaster preparedness and response"],
      "publicHealthMonitoring": ["public health monitoring systems"]
    },
    "governance": {
      "digitalServices": ["digital government services"],
      "citizenEngagement": ["citizen engagement platforms"],
      "transparencyTools": ["transparency and accountability tools"],
      "dataGovernance": ["data governance frameworks"]
    }
  },
  "implementationRoadmap": {
    "phases": [
      {
        "phase": "implementation phase",
        "duration": "phase duration",
        "priorities": ["phase priorities"],
        "investments": ["key investments"],
        "outcomes": ["expected outcomes"]
      }
    ],
    "quickWins": ["quick win projects"],
    "longTermVision": ["long-term transformation goals"]
  },
  "sustainabilityIntegration": {
    "carbonNeutrality": ["carbon neutrality strategies"],
    "renewableEnergy": ["renewable energy integration"],
    "greenBuilding": ["green building standards"],
    "circularEconomy": ["circular economy initiatives"]
  }
}`;

    const response = await this.callAPI(`Smart City Planning for:\n${JSON.stringify(cityData, null, 2)}\n\nDesign comprehensive smart city transformation plan.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultSmartCityPlan();
  }

  // Default fallback methods
  static getDefaultAnalysis(projectData) {
    return {
      projectOverview: {
        type: 'Transportation',
        scale: 'Regional',
        complexity: 'Medium',
        innovationLevel: 'Modern'
      },
      feasibilityAnalysis: {
        overallScore: 78,
        technicalFeasibility: {
          score: 80,
          challenges: ['Soil conditions need assessment', 'Utility relocations required'],
          solutions: ['Detailed geotechnical survey', 'Utility mapping and coordination']
        },
        economicFeasibility: {
          score: 75,
          costBenefit: 'Positive with 15-year payback period',
          roi: '8-12% over project lifecycle'
        }
      },
      impactAssessment: {
        trafficAndMobility: {
          improvement: '35% reduction in travel time',
          congestionReduction: 'Significant improvement during peak hours'
        }
      },
      riskAssessment: {
        overallRisk: 'Medium',
        criticalSuccessFactors: ['Stakeholder buy-in', 'Adequate funding', 'Weather conditions']
      },
      recommendations: {
        immediate: ['Conduct detailed feasibility study', 'Engage stakeholders'],
        designOptimizations: ['Consider climate resilience', 'Integrate smart technologies']
      }
    };
  }

  static getDefaultRoute(projectData) {
    return {
      optimizationResults: {
        methodology: 'Multi-criteria optimization',
        objectiveFunction: 'Minimize cost while maximizing efficiency',
        improvementAchieved: '25% improvement over initial design'
      },
      optimalSolution: {
        routeDescription: 'Direct route via existing highway corridor with minimal environmental impact',
        totalDistance: projectData.length || '25 km',
        estimatedCost: projectData.budget || '₹200 crores',
        constructionTime: '18-24 months'
      },
      alternativeRoutes: [
        {
          name: 'Scenic Route',
          description: 'Longer route avoiding sensitive areas',
          advantages: ['Lower environmental impact', 'Better community acceptance'],
          disadvantages: ['Higher cost', 'Longer travel time']
        }
      ],
      networkIntegration: {
        existingInfrastructure: ['Highway network', 'Public transport'],
        futureExpansion: ['Planned metro extension', 'Airport connectivity']
      }
    };
  }

  static getDefaultImpact() {
    return {
      assessmentScope: {
        studyArea: '10 km radius from project site',
        timeframe: 'Construction + 30 years operation',
        methodology: ['Environmental Impact Assessment', 'Social Impact Assessment']
      },
      environmentalImpact: {
        airQuality: {
          constructionPhase: {
            impact: 'Temporary increase in dust and emissions',
            severity: 'Medium',
            duration: 'Temporary',
            mitigation: ['Dust suppression', 'Equipment maintenance']
          }
        },
        biodiversity: {
          habitatImpact: 'Minimal impact on existing habitats',
          conservationMeasures: ['Wildlife corridors', 'Native vegetation restoration']
        }
      },
      socialImpact: {
        economicImpacts: {
          localEmployment: '500+ construction jobs, 100+ permanent jobs',
          economicDevelopment: ['Improved market access', 'Tourism opportunities']
        },
        socialCohesion: {
          communityConnectivity: 'Enhanced connectivity between communities'
        }
      },
      mitigationHierarchy: {
        avoidance: ['Route optimization to avoid sensitive areas'],
        minimization: ['Construction timing to minimize disruption'],
        restoration: ['Habitat restoration post-construction']
      }
    };
  }

  static getDefaultResources(projectData) {
    return {
      projectSummary: {
        totalCost: projectData.budget || '₹300 crores',
        duration: projectData.timeline || '2.5 years',
        complexity: 'Medium',
        riskLevel: 'Medium'
      },
      costBreakdown: {
        directCosts: {
          materials: '40% of total cost',
          labor: '25% of total cost',
          equipment: '20% of total cost'
        },
        contingency: {
          percentage: '15%',
          justification: 'Medium complexity project with moderate risks'
        }
      },
      materialRequirements: [{
        category: 'Construction Materials',
        materials: [
          {
            name: 'Concrete',
            quantity: '50,000 cubic meters',
            sustainabilityRating: 'Standard with recycled content options'
          },
          {
            name: 'Steel',
            quantity: '5,000 tons',
            sustainabilityRating: 'Recycled steel preferred'
          }
        ]
      }],
      projectTimeline: {
        phases: [
          {
            phase: 'Planning & Approvals',
            duration: '6 months',
            keyActivities: ['Design finalization', 'Permit acquisition'],
            criticalPath: 'true'
          },
          {
            phase: 'Construction Phase 1',
            duration: '12 months',
            keyActivities: ['Site preparation', 'Foundation work'],
            criticalPath: 'true'
          }
        ]
      }
    };
  }

  static getDefaultSmartCityPlan() {
    return {
      cityProfile: {
        currentChallenges: ['Traffic congestion', 'Air pollution', 'Waste management'],
        developmentGoals: ['Sustainable development', 'Improved quality of life', 'Economic growth']
      },
      smartInfrastructure: {
        digitalBackbone: {
          connectivity: ['Fiber optic network', '5G infrastructure'],
          cybersecurity: ['Multi-layered security', 'Data protection protocols']
        }
      },
      smartServices: {
        transportation: {
          intelligentTraffic: ['Adaptive traffic signals', 'Real-time traffic monitoring'],
          publicTransit: ['Smart ticketing', 'Real-time information systems']
        }
      },
      implementationRoadmap: {
        quickWins: ['Smart parking', 'Digital citizen services'],
        longTermVision: ['Carbon neutral city', 'Fully integrated smart services']
      }
    };
  }
}