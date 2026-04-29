const fs = require('fs');
const path = require('path');

const baseCourses = {
  "Engineering": [
    { name: "B.Tech", duration: "4 Years", eligibility: "10+2 with PCM (min 60%)" }, 
    { name: "M.Tech", duration: "2 Years", eligibility: "B.Tech/B.E + GATE" }, 
    { name: "BCA", duration: "3 Years", eligibility: "10+2" }
  ],
  "Medical": [
    { name: "MBBS", duration: "5.5 Years", eligibility: "10+2 with PCB + NEET" }, 
    { name: "BDS", duration: "5 Years", eligibility: "10+2 with PCB + NEET" }, 
    { name: "B.Sc Nursing", duration: "4 Years", eligibility: "10+2 with Science" }
  ],
  "Management": [
    { name: "MBA", duration: "2 Years", eligibility: "Graduation + CAT/MAT" }, 
    { name: "BBA", duration: "3 Years", eligibility: "10+2" }, 
    { name: "PGDM", duration: "2 Years", eligibility: "Graduation" }
  ],
  "Arts & Science": [
    { name: "B.Sc", duration: "3 Years", eligibility: "10+2 Science" }, 
    { name: "B.A.", duration: "3 Years", eligibility: "10+2" }, 
    { name: "M.Sc", duration: "2 Years", eligibility: "B.Sc" }
  ],
  "Law": [
    { name: "LLB", duration: "3 Years", eligibility: "Graduation" }, 
    { name: "BA LLB", duration: "5 Years", eligibility: "10+2" }, 
    { name: "LLM", duration: "1 Year", eligibility: "LLB" }
  ],
  "Architecture": [
    { name: "B.Arch", duration: "5 Years", eligibility: "10+2 with NATA/JEE" }, 
    { name: "M.Arch", duration: "2 Years", eligibility: "B.Arch" }
  ],
  "Commerce": [
    { name: "B.Com", duration: "3 Years", eligibility: "10+2 Commerce" }, 
    { name: "M.Com", duration: "2 Years", eligibility: "B.Com" }
  ],
  "Design": [
    { name: "B.Des", duration: "4 Years", eligibility: "10+2" }, 
    { name: "M.Des", duration: "2 Years", eligibility: "B.Des" }
  ]
};

const accreditingBodies = ["NAAC A++", "NAAC A+", "NAAC A", "NBA", "UGC Approved", "AICTE Approved"];
const topRecruiters = ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "IBM", "Deloitte", "KPMG", "PwC", "EY", "Goldman Sachs", "JP Morgan", "Morgan Stanley", "Cisco", "Intel", "Qualcomm", "Meta", "Apple"];
const examNames = ["JEE Main", "JEE Advanced", "NEET", "CAT", "MAT", "XAT", "GATE", "CLAT", "NATA", "CUET", "State CET"];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSubset(arr, size) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

const realInstitutions = [
  { name: "IIT Delhi", city: "New Delhi", state: "Delhi", type: "Engineering", url: "https://home.iitd.ac.in", rating: 4.9 },
  { name: "IIT Bombay", city: "Mumbai", state: "Maharashtra", type: "Engineering", url: "https://www.iitb.ac.in", rating: 4.9 },
  { name: "IIT Madras", city: "Chennai", state: "Tamil Nadu", type: "Engineering", url: "https://www.iitm.ac.in", rating: 4.9 },
  { name: "IIT Kanpur", city: "Kanpur", state: "Uttar Pradesh", type: "Engineering", url: "https://www.iitk.ac.in", rating: 4.8 },
  { name: "IIT Kharagpur", city: "Kharagpur", state: "West Bengal", type: "Engineering", url: "https://www.iitkgp.ac.in", rating: 4.8 },
  { name: "NIT Trichy", city: "Trichy", state: "Tamil Nadu", type: "Engineering", url: "https://www.nitt.edu", rating: 4.7 },
  { name: "NIT Surathkal", city: "Mangalore", state: "Karnataka", type: "Engineering", url: "https://www.nitk.ac.in", rating: 4.6 },
  { name: "NIT Warangal", city: "Warangal", state: "Telangana", type: "Engineering", url: "https://www.nitw.ac.in", rating: 4.6 },
  { name: "BITS Pilani", city: "Pilani", state: "Rajasthan", type: "Engineering", url: "https://www.bits-pilani.ac.in", rating: 4.8 },
  { name: "IIIT Hyderabad", city: "Hyderabad", state: "Telangana", type: "Engineering", url: "https://www.iiit.ac.in", rating: 4.8 },
  { name: "IIM Ahmedabad", city: "Ahmedabad", state: "Gujarat", type: "Management", url: "https://www.iima.ac.in", rating: 4.9 },
  { name: "IIM Bangalore", city: "Bangalore", state: "Karnataka", type: "Management", url: "https://www.iimb.ac.in", rating: 4.9 },
  { name: "IIM Calcutta", city: "Kolkata", state: "West Bengal", type: "Management", url: "https://www.iimcal.ac.in", rating: 4.8 },
  { name: "IIM Lucknow", city: "Lucknow", state: "Uttar Pradesh", type: "Management", url: "https://www.iiml.ac.in", rating: 4.7 },
  { name: "ISB Hyderabad", city: "Hyderabad", state: "Telangana", type: "Management", url: "https://www.isb.edu", rating: 4.8 },
  { name: "AIIMS New Delhi", city: "New Delhi", state: "Delhi", type: "Medical", url: "https://www.aiims.edu", rating: 4.9 },
  { name: "CMC Vellore", city: "Vellore", state: "Tamil Nadu", type: "Medical", url: "https://www.cmch-vellore.edu", rating: 4.8 },
  { name: "AFMC Pune", city: "Pune", state: "Maharashtra", type: "Medical", url: "https://www.afmc.nic.in", rating: 4.7 },
  { name: "NLSIU Bangalore", city: "Bangalore", state: "Karnataka", type: "Law", url: "https://www.nls.ac.in", rating: 4.9 },
  { name: "NALSAR Hyderabad", city: "Hyderabad", state: "Telangana", type: "Law", url: "https://www.nalsar.ac.in", rating: 4.8 },
  { name: "NID Ahmedabad", city: "Ahmedabad", state: "Gujarat", type: "Design", url: "https://www.nid.edu", rating: 4.8 },
  { name: "NIFT Delhi", city: "New Delhi", state: "Delhi", type: "Design", url: "https://nift.ac.in", rating: 4.7 },
  { name: "SRCC Delhi", city: "New Delhi", state: "Delhi", type: "Commerce", url: "https://www.srcc.edu", rating: 4.8 },
  { name: "LSR Delhi", city: "New Delhi", state: "Delhi", type: "Arts & Science", url: "https://lsr.edu.in", rating: 4.7 },
  { name: "St. Stephen's College", city: "New Delhi", state: "Delhi", type: "Arts & Science", url: "https://www.ststephens.edu", rating: 4.8 },
  { name: "Christ University", city: "Bangalore", state: "Karnataka", type: "Arts & Science", url: "https://christuniversity.in", rating: 4.6 },
  { name: "VIT Vellore", city: "Vellore", state: "Tamil Nadu", type: "Engineering", url: "https://vit.ac.in", rating: 4.5 },
  { name: "Manipal University", city: "Manipal", state: "Karnataka", type: "Engineering", url: "https://manipal.edu", rating: 4.5 },
  { name: "SRM University", city: "Chennai", state: "Tamil Nadu", type: "Engineering", url: "https://www.srmist.edu.in", rating: 4.4 },
  { name: "Jadavpur University", city: "Kolkata", state: "West Bengal", type: "Engineering", url: "http://www.jaduniv.edu.in", rating: 4.6 }
];

const generateColleges = () => {
  const colleges = [];
  
  // 1. Add Real Institutions
  realInstitutions.forEach((real, index) => {
    let baseFees = getRandomInt(50, 400) * 1000;
    if (real.type === "Medical") baseFees *= 2.5;
    if (real.type === "Management") baseFees *= 3.0;
    if (real.type === "Arts & Science" || real.type === "Commerce") baseFees *= 0.4;
    
    // IITs/NITs/IIMs have specific real-world fee estimates, but we randomize them slightly within realistic bounds
    const fees_min = Math.floor(baseFees * 0.8);
    const fees_max = Math.floor(baseFees * 1.5);
    
    let placement_percent = getRandomInt(88, 100);
    let avg_package = getRandomInt(12, 35);
    const highest_package = Math.floor(avg_package * getRandomInt(3, 8));

    const availableCourses = baseCourses[real.type];
    const numCourses = getRandomInt(1, availableCourses.length);
    const selectedCourses = getRandomSubset(availableCourses, numCourses).map(c => ({
      ...c,
      fees: `₹${(getRandomInt(fees_min, fees_max) / 100000).toFixed(2)} Lakhs / yr`
    }));

    const admission = {
      exams: getRandomSubset(examNames, getRandomInt(1, 2)),
      dates: `Application opens in ${getRandomElement(["January", "March", "May", "July"])} 2026. Deadlines apply.`,
      process: "Candidates must submit the online application along with entrance test scores. Shortlisted candidates will be called for counseling/interview rounds."
    };

    colleges.push({
      id: index + 1,
      name: real.name,
      logo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(real.name)}&background=random&color=fff&size=128`,
      image_url: `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80`,
      city: real.city,
      state: real.state,
      location: `${real.city}, ${real.state}`,
      type: real.type,
      fees_min,
      fees_max,
      rating: real.rating,
      website_url: real.url,
      description: `${real.name} is a premier institution located in ${real.city}, ${real.state}, recognized globally for its excellence in ${real.type} education and research.`,
      establishment_year: getRandomInt(1940, 1990),
      accreditation: getRandomElement(["NAAC A++", "NBA", "UGC Approved"]),
      ranking: index + 1,
      courses: selectedCourses,
      placements: {
        highest_package: `${highest_package} LPA`,
        avg_package: `${avg_package} LPA`,
        placement_percent,
        recruiters: getRandomSubset(topRecruiters, getRandomInt(6, 12))
      },
      admission
    });
  });

  // 2. Generate remaining colleges to reach 150
  const types = ["Engineering", "Medical", "Management", "Arts & Science", "Law", "Architecture", "Commerce", "Design"];
  const prefixes = ["National", "Global", "Indian", "Apex", "Pioneer", "Elite", "Royal", "Future", "Modern", "United", "International", "Sri"];
  const statesAndCities = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Delhi": ["New Delhi", "Dwarka", "Rohini"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
    "Uttar Pradesh": ["Noida", "Lucknow", "Kanpur", "Varanasi", "Agra"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "Kerala": ["Kochi", "Trivandrum", "Kozhikode"]
  };

  const startIndex = colleges.length + 1;
  for (let i = startIndex; i <= 150; i++) {
    const type = getRandomElement(types);
    const state = getRandomElement(Object.keys(statesAndCities));
    const city = getRandomElement(statesAndCities[state]);
    
    const prefix = getRandomElement(prefixes);
    const suffix = type === "Engineering" ? "Institute of Technology" :
                   type === "Medical" ? "Institute of Medical Sciences" :
                   type === "Management" ? "School of Business" :
                   getRandomElement(["College", "University", "Academy"]);
    
    const name = `${prefix} ${city} ${suffix}`;
    
    let baseFees = getRandomInt(50, 400) * 1000;
    if (type === "Medical") baseFees *= 2.5;
    if (type === "Arts & Science" || type === "Commerce") baseFees *= 0.4;
    
    const fees_min = Math.floor(baseFees * 0.8);
    const fees_max = Math.floor(baseFees * 1.5);
    
    const rating = parseFloat((getRandomInt(35, 45) / 10).toFixed(1));
    let placement_percent = getRandomInt(60, 90);
    
    let avg_package = getRandomInt(3, 10);
    if (type === "Medical") avg_package = getRandomInt(6, 12);
    
    const highest_package = Math.floor(avg_package * getRandomInt(2, 6));

    const availableCourses = baseCourses[type];
    const numCourses = getRandomInt(1, availableCourses.length);
    const selectedCourses = getRandomSubset(availableCourses, numCourses).map(c => ({
      ...c,
      fees: `₹${(getRandomInt(fees_min, fees_max) / 100000).toFixed(2)} Lakhs / yr`
    }));

    const admission = {
      exams: getRandomSubset(examNames, getRandomInt(1, 3)),
      dates: `Application opens in ${getRandomElement(["January", "March", "May", "July"])} 2026. Deadlines apply.`,
      process: "Candidates must submit the online application along with entrance test scores. Shortlisted candidates will be called for counseling/interview rounds."
    };

    const website_url = `https://www.${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.in`;

    colleges.push({
      id: i,
      name,
      logo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`,
      image_url: `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80`,
      city,
      state,
      location: `${city}, ${state}`,
      type,
      fees_min,
      fees_max,
      rating,
      website_url,
      description: `${name} is a premier institution located in ${city}, ${state}, dedicated to providing world-class education in ${type}.`,
      establishment_year: getRandomInt(1940, 2010),
      accreditation: getRandomElement(accreditingBodies),
      ranking: null,
      courses: selectedCourses,
      placements: {
        highest_package: `${highest_package} LPA`,
        avg_package: `${avg_package} LPA`,
        placement_percent,
        recruiters: getRandomSubset(topRecruiters, getRandomInt(3, 7))
      },
      admission
    });
  }
  
  return colleges;
};

const data = generateColleges();

fs.writeFileSync(path.join(__dirname, '../data/colleges.json'), JSON.stringify(data, null, 2));
console.log(`Successfully generated ${data.length} fully detailed colleges (including real Top 30) to data/colleges.json`);
