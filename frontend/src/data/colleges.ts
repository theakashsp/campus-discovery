export interface Course { name: string; fees: string; duration: string; eligibility: string; }
export interface Placements { highest_package: string; avg_package: string; placement_percent: number; recruiters: string[]; }
export interface Admission { exams: string[]; dates: string; process: string; }
export interface College {
  id: number; name: string; logo_url: string; image_url: string; city: string; state: string;
  location: string; type: string; fees_min: number; fees_max: number; rating: number;
  description: string; establishment_year: number; accreditation: string; ranking: number | null;
  courses: Course[]; placements: Placements; admission: Admission; website_url: string;
}

export const colleges: College[] = [
  {
    id: 1, name: "Indian Institute of Technology Bombay", logo_url: "https://upload.wikimedia.org/wikipedia/en/1/1d/IIT_Bombay_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800", city: "Mumbai", state: "Maharashtra",
    location: "Mumbai, Maharashtra", type: "Government", fees_min: 200000, fees_max: 250000, rating: 4.9,
    description: "IIT Bombay is one of India's premier engineering institutions, known for its rigorous academics, world-class research, and stellar placements.",
    establishment_year: 1958, accreditation: "NAAC A++", ranking: 1,
    courses: [
      { name: "B.Tech", fees: "₹2.0L/yr", duration: "4 Years", eligibility: "JEE Advanced" },
      { name: "M.Tech", fees: "₹1.0L/yr", duration: "2 Years", eligibility: "GATE" },
      { name: "MBA", fees: "₹8.0L/yr", duration: "2 Years", eligibility: "CAT" },
      { name: "PhD", fees: "₹0.5L/yr", duration: "5 Years", eligibility: "Written Test + Interview" }
    ],
    placements: { highest_package: "₹2.1 Cr", avg_package: "₹21.0 LPA", placement_percent: 97, recruiters: ["Google", "Microsoft", "Goldman Sachs", "Apple", "Amazon"] },
    admission: { exams: ["JEE Advanced", "GATE", "CAT"], dates: "Jan–May 2026", process: "JEE Advanced rank-based counselling via JoSAA." },
    website_url: "https://www.iitb.ac.in"
  },
  {
    id: 2, name: "Indian Institute of Technology Delhi", logo_url: "https://upload.wikimedia.org/wikipedia/en/f/fd/IIT_Delhi_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", city: "New Delhi", state: "Delhi",
    location: "New Delhi, Delhi", type: "Government", fees_min: 200000, fees_max: 250000, rating: 4.8,
    description: "IIT Delhi is a globally recognized institution offering cutting-edge programs in engineering, sciences, and management.",
    establishment_year: 1961, accreditation: "NAAC A++", ranking: 2,
    courses: [
      { name: "B.Tech", fees: "₹2.1L/yr", duration: "4 Years", eligibility: "JEE Advanced" },
      { name: "M.Tech", fees: "₹1.0L/yr", duration: "2 Years", eligibility: "GATE" },
      { name: "MBA", fees: "₹9.0L/yr", duration: "2 Years", eligibility: "CAT" }
    ],
    placements: { highest_package: "₹1.8 Cr", avg_package: "₹20.0 LPA", placement_percent: 96, recruiters: ["Google", "Meta", "Uber", "Samsung", "Adobe"] },
    admission: { exams: ["JEE Advanced", "GATE", "CAT"], dates: "Jan–May 2026", process: "JEE Advanced rank-based counselling via JoSAA." },
    website_url: "https://home.iitd.ac.in"
  },
  {
    id: 3, name: "Indian Institute of Science", logo_url: "https://upload.wikimedia.org/wikipedia/en/2/2e/Indian_Institute_of_Science_logo.svg",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800", city: "Bangalore", state: "Karnataka",
    location: "Bangalore, Karnataka", type: "Government", fees_min: 50000, fees_max: 150000, rating: 4.9,
    description: "IISc Bangalore is India's top research institution, excelling in science, engineering, and interdisciplinary studies.",
    establishment_year: 1909, accreditation: "NAAC A++", ranking: 3,
    courses: [
      { name: "B.S.", fees: "₹0.5L/yr", duration: "4 Years", eligibility: "JEE Advanced / KVPY" },
      { name: "M.Tech", fees: "₹0.7L/yr", duration: "2 Years", eligibility: "GATE" },
      { name: "PhD", fees: "₹0.4L/yr", duration: "5 Years", eligibility: "Written Test + Interview" }
    ],
    placements: { highest_package: "₹1.5 Cr", avg_package: "₹18.0 LPA", placement_percent: 92, recruiters: ["Intel", "Qualcomm", "Google", "Microsoft", "ISRO"] },
    admission: { exams: ["JEE Advanced", "GATE", "KVPY"], dates: "Feb–Jun 2026", process: "Entrance exam based admission with interview." },
    website_url: "https://www.iisc.ac.in"
  },
  {
    id: 4, name: "IIT Madras", logo_url: "https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800", city: "Chennai", state: "Tamil Nadu",
    location: "Chennai, Tamil Nadu", type: "Government", fees_min: 200000, fees_max: 250000, rating: 4.8,
    description: "IIT Madras is consistently ranked #1 in NIRF rankings, known for research and innovation in engineering.",
    establishment_year: 1959, accreditation: "NAAC A++", ranking: 4,
    courses: [
      { name: "B.Tech", fees: "₹2.0L/yr", duration: "4 Years", eligibility: "JEE Advanced" },
      { name: "M.Tech", fees: "₹1.0L/yr", duration: "2 Years", eligibility: "GATE" }
    ],
    placements: { highest_package: "₹1.6 Cr", avg_package: "₹19.5 LPA", placement_percent: 95, recruiters: ["Microsoft", "Google", "Oracle", "TCS", "Infosys"] },
    admission: { exams: ["JEE Advanced", "GATE"], dates: "Jan–May 2026", process: "JEE Advanced counselling via JoSAA." },
    website_url: "https://www.iitm.ac.in"
  },
  {
    id: 5, name: "BITS Pilani", logo_url: "https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg",
    image_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800", city: "Pilani", state: "Rajasthan",
    location: "Pilani, Rajasthan", type: "Private", fees_min: 500000, fees_max: 600000, rating: 4.7,
    description: "BITS Pilani is one of India's top private engineering institutions with a strong focus on innovation.",
    establishment_year: 1964, accreditation: "NAAC A", ranking: 5,
    courses: [
      { name: "B.E.", fees: "₹5.5L/yr", duration: "4 Years", eligibility: "BITSAT" },
      { name: "M.E.", fees: "₹3.0L/yr", duration: "2 Years", eligibility: "GATE / BITS HD" },
      { name: "MBA", fees: "₹7.0L/yr", duration: "2 Years", eligibility: "CAT / GMAT" }
    ],
    placements: { highest_package: "₹1.2 Cr", avg_package: "₹16.0 LPA", placement_percent: 93, recruiters: ["Google", "Microsoft", "Goldman Sachs", "DE Shaw", "Flipkart"] },
    admission: { exams: ["BITSAT"], dates: "Mar–Jun 2026", process: "BITSAT score-based admission." },
    website_url: "https://www.bits-pilani.ac.in"
  },
  {
    id: 6, name: "NIT Trichy", logo_url: "https://upload.wikimedia.org/wikipedia/en/8/8a/NIT_Trichy_logo.svg",
    image_url: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800", city: "Tiruchirappalli", state: "Tamil Nadu",
    location: "Tiruchirappalli, Tamil Nadu", type: "Government", fees_min: 150000, fees_max: 200000, rating: 4.5,
    description: "NIT Trichy is the top-ranked NIT in India, known for its strong alumni network and engineering programs.",
    establishment_year: 1964, accreditation: "NAAC A++", ranking: 6,
    courses: [
      { name: "B.Tech", fees: "₹1.5L/yr", duration: "4 Years", eligibility: "JEE Main" },
      { name: "M.Tech", fees: "₹1.0L/yr", duration: "2 Years", eligibility: "GATE" }
    ],
    placements: { highest_package: "₹60 LPA", avg_package: "₹12.0 LPA", placement_percent: 91, recruiters: ["Microsoft", "Amazon", "TCS", "Infosys", "Wipro"] },
    admission: { exams: ["JEE Main", "GATE"], dates: "Jan–Jun 2026", process: "JEE Main rank-based counselling via JoSAA." },
    website_url: "https://www.nitt.edu"
  },
  {
    id: 7, name: "VIT Vellore", logo_url: "https://upload.wikimedia.org/wikipedia/en/c/c5/VIT_Vellore_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800", city: "Vellore", state: "Tamil Nadu",
    location: "Vellore, Tamil Nadu", type: "Private", fees_min: 300000, fees_max: 500000, rating: 4.3,
    description: "VIT is a leading private university offering diverse programs with excellent infrastructure and global collaborations.",
    establishment_year: 1984, accreditation: "NAAC A++", ranking: 7,
    courses: [
      { name: "B.Tech", fees: "₹3.5L/yr", duration: "4 Years", eligibility: "VITEEE" },
      { name: "M.Tech", fees: "₹2.0L/yr", duration: "2 Years", eligibility: "GATE / VITMEE" },
      { name: "MBA", fees: "₹6.0L/yr", duration: "2 Years", eligibility: "CAT / GMAT" }
    ],
    placements: { highest_package: "₹50 LPA", avg_package: "₹8.0 LPA", placement_percent: 88, recruiters: ["Cognizant", "Wipro", "Infosys", "Amazon", "Deloitte"] },
    admission: { exams: ["VITEEE"], dates: "Jan–Apr 2026", process: "VITEEE score-based counselling." },
    website_url: "https://vit.ac.in"
  },
  {
    id: 8, name: "Delhi University", logo_url: "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Delhi_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800", city: "New Delhi", state: "Delhi",
    location: "New Delhi, Delhi", type: "Government", fees_min: 20000, fees_max: 100000, rating: 4.4,
    description: "Delhi University is one of India's oldest and most prestigious universities, offering a wide range of undergraduate and postgraduate programs.",
    establishment_year: 1922, accreditation: "NAAC A+", ranking: 8,
    courses: [
      { name: "B.A.", fees: "₹0.2L/yr", duration: "3 Years", eligibility: "CUET" },
      { name: "B.Com", fees: "₹0.3L/yr", duration: "3 Years", eligibility: "CUET" },
      { name: "B.Sc", fees: "₹0.2L/yr", duration: "3 Years", eligibility: "CUET" }
    ],
    placements: { highest_package: "₹30 LPA", avg_package: "₹6.5 LPA", placement_percent: 78, recruiters: ["Deloitte", "EY", "KPMG", "Accenture", "HUL"] },
    admission: { exams: ["CUET"], dates: "Mar–Jul 2026", process: "CUET score-based admission via CSAS portal." },
    website_url: "https://www.du.ac.in"
  },
  {
    id: 9, name: "IIM Ahmedabad", logo_url: "https://upload.wikimedia.org/wikipedia/en/5/5e/IIM_Ahmedabad_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800", city: "Ahmedabad", state: "Gujarat",
    location: "Ahmedabad, Gujarat", type: "Government", fees_min: 1100000, fees_max: 1200000, rating: 4.9,
    description: "IIM Ahmedabad is India's top business school, known for its rigorous MBA programs and exceptional placements.",
    establishment_year: 1961, accreditation: "AACSB / EQUIS", ranking: 9,
    courses: [
      { name: "MBA (PGP)", fees: "₹11.5L/yr", duration: "2 Years", eligibility: "CAT" },
      { name: "PhD", fees: "₹2.0L/yr", duration: "4 Years", eligibility: "CAT + Interview" }
    ],
    placements: { highest_package: "₹1.2 Cr", avg_package: "₹32.0 LPA", placement_percent: 99, recruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon"] },
    admission: { exams: ["CAT"], dates: "Sep–Mar 2026", process: "CAT score + AWT-PI (Academic Writing Test & Personal Interview)." },
    website_url: "https://www.iima.ac.in"
  },
  {
    id: 10, name: "AIIMS New Delhi", logo_url: "https://upload.wikimedia.org/wikipedia/en/d/d3/AIIMS_logo.svg",
    image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800", city: "New Delhi", state: "Delhi",
    location: "New Delhi, Delhi", type: "Government", fees_min: 5000, fees_max: 10000, rating: 4.9,
    description: "AIIMS Delhi is India's premier medical institution, offering world-class medical education and healthcare services.",
    establishment_year: 1956, accreditation: "NAAC A++", ranking: 10,
    courses: [
      { name: "MBBS", fees: "₹0.05L/yr", duration: "5.5 Years", eligibility: "NEET UG" },
      { name: "MD/MS", fees: "₹0.1L/yr", duration: "3 Years", eligibility: "NEET PG / INI-CET" }
    ],
    placements: { highest_package: "₹50 LPA", avg_package: "₹15.0 LPA", placement_percent: 100, recruiters: ["Apollo", "Fortis", "Max Healthcare", "WHO", "ICMR"] },
    admission: { exams: ["NEET UG", "INI-CET"], dates: "May–Sep 2026", process: "NEET UG rank-based counselling." },
    website_url: "https://www.aiims.edu"
  },
  {
    id: 11, name: "Manipal Institute of Technology", logo_url: "https://upload.wikimedia.org/wikipedia/en/f/f2/MIT_Manipal_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800", city: "Manipal", state: "Karnataka",
    location: "Manipal, Karnataka", type: "Private", fees_min: 400000, fees_max: 550000, rating: 4.4,
    description: "MIT Manipal is a top private engineering college in India with a beautiful campus and strong industry connections.",
    establishment_year: 1957, accreditation: "NAAC A++", ranking: 11,
    courses: [
      { name: "B.Tech", fees: "₹4.5L/yr", duration: "4 Years", eligibility: "MET" },
      { name: "M.Tech", fees: "₹2.5L/yr", duration: "2 Years", eligibility: "GATE / MET" }
    ],
    placements: { highest_package: "₹45 LPA", avg_package: "₹8.5 LPA", placement_percent: 87, recruiters: ["Amazon", "Microsoft", "TCS", "Infosys", "Cisco"] },
    admission: { exams: ["MET"], dates: "Jan–May 2026", process: "MET score-based counselling." },
    website_url: "https://manipal.edu/mit.html"
  },
  {
    id: 12, name: "Jadavpur University", logo_url: "https://upload.wikimedia.org/wikipedia/en/9/95/Jadavpur_University_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800", city: "Kolkata", state: "West Bengal",
    location: "Kolkata, West Bengal", type: "Government", fees_min: 10000, fees_max: 50000, rating: 4.5,
    description: "Jadavpur University is one of the most prestigious public universities in India known for its engineering and arts programs.",
    establishment_year: 1955, accreditation: "NAAC A", ranking: 12,
    courses: [
      { name: "B.E.", fees: "₹0.1L/yr", duration: "4 Years", eligibility: "WBJEE / JEE Main" },
      { name: "M.Tech", fees: "₹0.5L/yr", duration: "2 Years", eligibility: "GATE" },
      { name: "B.A.", fees: "₹0.05L/yr", duration: "3 Years", eligibility: "Merit" }
    ],
    placements: { highest_package: "₹42 LPA", avg_package: "₹7.5 LPA", placement_percent: 85, recruiters: ["TCS", "Cognizant", "Infosys", "Amazon", "Google"] },
    admission: { exams: ["WBJEE", "JEE Main", "GATE"], dates: "Feb–Jul 2026", process: "WBJEE/JEE Main rank-based counselling." },
    website_url: "http://www.jaduniv.edu.in"
  },
  {
    id: 13, name: "SRM Institute of Science and Technology", logo_url: "https://upload.wikimedia.org/wikipedia/en/f/fe/SRM_IST_logo.svg",
    image_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800", city: "Chennai", state: "Tamil Nadu",
    location: "Chennai, Tamil Nadu", type: "Private", fees_min: 350000, fees_max: 500000, rating: 4.2,
    description: "SRMIST is a top private university in Chennai, known for its engineering and management programs with global tie-ups.",
    establishment_year: 1985, accreditation: "NAAC A++", ranking: 13,
    courses: [
      { name: "B.Tech", fees: "₹3.5L/yr", duration: "4 Years", eligibility: "SRMJEEE" },
      { name: "MBA", fees: "₹5.0L/yr", duration: "2 Years", eligibility: "CAT / SRMJEEM" }
    ],
    placements: { highest_package: "₹41 LPA", avg_package: "₹7.0 LPA", placement_percent: 84, recruiters: ["Infosys", "Wipro", "TCS", "Cognizant", "HCL"] },
    admission: { exams: ["SRMJEEE"], dates: "Jan–May 2026", process: "SRMJEEE score-based counselling." },
    website_url: "https://www.srmist.edu.in"
  },
  {
    id: 14, name: "IIT Kharagpur", logo_url: "https://upload.wikimedia.org/wikipedia/en/1/13/IIT_Kharagpur_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800", city: "Kharagpur", state: "West Bengal",
    location: "Kharagpur, West Bengal", type: "Government", fees_min: 200000, fees_max: 250000, rating: 4.7,
    description: "IIT Kharagpur is India's first IIT with the largest campus, offering premier technical education since 1951.",
    establishment_year: 1951, accreditation: "NAAC A++", ranking: 14,
    courses: [
      { name: "B.Tech", fees: "₹2.0L/yr", duration: "4 Years", eligibility: "JEE Advanced" },
      { name: "M.Tech", fees: "₹1.0L/yr", duration: "2 Years", eligibility: "GATE" },
      { name: "MBA", fees: "₹8.5L/yr", duration: "2 Years", eligibility: "CAT" }
    ],
    placements: { highest_package: "₹1.5 Cr", avg_package: "₹18.0 LPA", placement_percent: 94, recruiters: ["Google", "Microsoft", "Goldman Sachs", "JPMorgan", "Samsung"] },
    admission: { exams: ["JEE Advanced", "GATE", "CAT"], dates: "Jan–May 2026", process: "JEE Advanced rank-based counselling via JoSAA." },
    website_url: "https://www.iitkgp.ac.in"
  },
  {
    id: 15, name: "Savitribai Phule Pune University", logo_url: "https://upload.wikimedia.org/wikipedia/en/5/5a/SPPU_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800", city: "Pune", state: "Maharashtra",
    location: "Pune, Maharashtra", type: "Government", fees_min: 15000, fees_max: 80000, rating: 4.2,
    description: "SPPU is one of the largest universities in India, offering a wide range of programs from its sprawling Pune campus.",
    establishment_year: 1949, accreditation: "NAAC A+", ranking: 15,
    courses: [
      { name: "B.E.", fees: "₹0.8L/yr", duration: "4 Years", eligibility: "MHT CET" },
      { name: "M.Sc", fees: "₹0.3L/yr", duration: "2 Years", eligibility: "Entrance Exam" },
      { name: "MBA", fees: "₹1.5L/yr", duration: "2 Years", eligibility: "CMAT / CAT" }
    ],
    placements: { highest_package: "₹25 LPA", avg_package: "₹5.5 LPA", placement_percent: 75, recruiters: ["TCS", "Persistent", "Infosys", "Wipro", "Accenture"] },
    admission: { exams: ["MHT CET", "CMAT"], dates: "Feb–Jul 2026", process: "MHT CET / CMAT score-based admission via CAP rounds." },
    website_url: "http://www.unipune.ac.in"
  },
  {
    id: 16, name: "IIT Hyderabad", logo_url: "https://upload.wikimedia.org/wikipedia/en/0/0a/IIT_Hyderabad_Logo.svg",
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", city: "Hyderabad", state: "Telangana",
    location: "Hyderabad, Telangana", type: "Government", fees_min: 200000, fees_max: 250000, rating: 4.6,
    description: "IIT Hyderabad is among the new generation IITs that has rapidly risen in rankings with innovative curriculum.",
    establishment_year: 2008, accreditation: "NAAC A++", ranking: 16,
    courses: [
      { name: "B.Tech", fees: "₹2.0L/yr", duration: "4 Years", eligibility: "JEE Advanced" },
      { name: "M.Tech", fees: "₹1.0L/yr", duration: "2 Years", eligibility: "GATE" }
    ],
    placements: { highest_package: "₹70 LPA", avg_package: "₹14.0 LPA", placement_percent: 90, recruiters: ["Google", "Amazon", "Microsoft", "Qualcomm", "Intel"] },
    admission: { exams: ["JEE Advanced", "GATE"], dates: "Jan–May 2026", process: "JEE Advanced counselling via JoSAA." },
    website_url: "https://www.iith.ac.in"
  }
];
