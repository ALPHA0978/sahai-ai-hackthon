import { BaseAI } from './baseAI.js';

export class JobAI extends BaseAI {

  static async expandSkills(skillsInput) {
    const systemPrompt = `Expand skills into technical skills array: ["skill1", "skill2"]`;
    
    const response = await this.callAPI(`Expand: "${skillsInput}"`, systemPrompt);
    const skills = this.parseJSON(response);
    return Array.isArray(skills) ? skills : [skillsInput];
  }

  static async findJobs(jobProfile) {
    const expandedSkills = await this.expandSkills(jobProfile.skills);
    return this.searchJobs({ ...jobProfile, expandedSkills });
  }

  static searchJobs(jobProfile) {
    const jobs = this.getJobDatabase();
    const userSkills = jobProfile.expandedSkills?.map(s => s.toLowerCase()) || [];
    
    return jobs
      .map(job => {
        let score = 60;
        const jobSkills = job.requirements.map(r => r.toLowerCase());
        const matches = userSkills.filter(skill => 
          jobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
        );
        score += (matches.length / userSkills.length) * 35;
        
        return { ...job, matchScore: Math.min(95, Math.round(score)) };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  }

  static getFallbackJobs(jobProfile) {
    return this.getJobDatabase().slice(0, 3).map(job => ({
      ...job,
      matchScore: 75
    }));
  }

  static getJobDatabase() {
    return [
      {
        title: 'Software Developer',
        company: 'Tata Consultancy Services',
        description: 'Develop web applications using React and Node.js',
        location: 'Mumbai, India',
        salary: '4-8 LPA',
        type: 'Full-time',
        experience: 'Entry',
        category: 'Technology',
        requirements: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        applyUrl: 'https://www.tcs.com/careers',
        source: 'Company Website',
        postedDate: '2 days ago'
      },
      {
        title: 'Frontend Developer',
        company: 'Infosys',
        description: 'Build responsive user interfaces using React',
        location: 'Bangalore, India',
        salary: '5-9 LPA',
        type: 'Full-time',
        experience: 'Mid',
        category: 'Technology',
        requirements: ['React', 'JavaScript', 'TypeScript', 'CSS'],
        applyUrl: 'https://www.infosys.com/careers',
        source: 'Company Website',
        postedDate: '1 day ago'
      }
    ];
  }

  static parseJSON(response) {
    try {
      let clean = response.trim();
      if (clean.startsWith('```json')) clean = clean.replace(/```json\n?/, '').replace(/```\s*$/, '');
      
      const arrayStart = clean.indexOf('[');
      if (arrayStart !== -1) {
        clean = clean.substring(arrayStart, clean.lastIndexOf(']') + 1);
      }
      
      return JSON.parse(clean);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      return [];
    }
  }
}