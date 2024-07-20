const companies = [
  { name: 'Johnson & Johnson', factors: { salary: 8, remoteWork: 6, workLifeBalance: 7, innovation: 9, careerStability: 9, benefits: 8, companyReputation: 9, professionalDevelopment: 8, teamDynamics: 7, companyMission: 8 } },
  { name: 'Pfizer', factors: { salary: 9, remoteWork: 7, workLifeBalance: 6, innovation: 9, careerStability: 8, benefits: 9, companyReputation: 8, professionalDevelopment: 8, teamDynamics: 7, companyMission: 8 } },
  { name: 'Roche', factors: { salary: 8, remoteWork: 6, workLifeBalance: 8, innovation: 9, careerStability: 8, benefits: 8, companyReputation: 9, professionalDevelopment: 9, teamDynamics: 8, companyMission: 9 } },
  { name: 'Novartis', factors: { salary: 8, remoteWork: 7, workLifeBalance: 7, innovation: 9, careerStability: 8, benefits: 8, companyReputation: 8, professionalDevelopment: 9, teamDynamics: 8, companyMission: 8 } },
  { name: 'Merck', factors: { salary: 9, remoteWork: 6, workLifeBalance: 7, innovation: 8, careerStability: 9, benefits: 9, companyReputation: 8, professionalDevelopment: 8, teamDynamics: 7, companyMission: 8 } },
  { name: 'GlaxoSmithKline', factors: { salary: 8, remoteWork: 7, workLifeBalance: 8, innovation: 8, careerStability: 8, benefits: 8, companyReputation: 8, professionalDevelopment: 8, teamDynamics: 8, companyMission: 9 } },
  { name: 'Sanofi', factors: { salary: 8, remoteWork: 6, workLifeBalance: 7, innovation: 8, careerStability: 8, benefits: 8, companyReputation: 7, professionalDevelopment: 8, teamDynamics: 7, companyMission: 8 } },
  { name: 'Gilead Sciences', factors: { salary: 9, remoteWork: 8, workLifeBalance: 7, innovation: 9, careerStability: 7, benefits: 9, companyReputation: 8, professionalDevelopment: 8, teamDynamics: 8, companyMission: 9 } },
  { name: 'AstraZeneca', factors: { salary: 8, remoteWork: 7, workLifeBalance: 7, innovation: 9, careerStability: 8, benefits: 8, companyReputation: 8, professionalDevelopment: 8, teamDynamics: 7, companyMission: 9 } },
  { name: 'Amgen', factors: { salary: 9, remoteWork: 7, workLifeBalance: 7, innovation: 9, careerStability: 8, benefits: 9, companyReputation: 8, professionalDevelopment: 9, teamDynamics: 8, companyMission: 8 } }
];

function matchCompanies(userFactors) {
  return companies.map(company => {
    let score = 0;
    for (let factor in userFactors) {
      score += Math.abs(userFactors[factor] - company.factors[factor]);
    }
    return { name: company.name, score };
  }).sort((a, b) => a.score - b.score);
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const userFactors = req.body;
    const matches = matchCompanies(userFactors);
    res.status(200).json({
      topMatches: matches.slice(0, 3),
      visibleMatches: matches.slice(3, 5)
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}