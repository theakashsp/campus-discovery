const fs = require('fs');
const path = require('path');

// Load JSON data
const dataPath = path.join(__dirname, '../data/colleges.json');
let colleges = [];
try {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  colleges = JSON.parse(rawData);
} catch (error) {
  console.error("Error reading colleges.json:", error);
}

const getAllColleges = (req, res) => {
  const { 
    page = 1, 
    limit = 12, 
    query,
    name, 
    state, 
    city, 
    type, 
    course, 
    maxFees, 
    minRating 
  } = req.query;

  let filtered = colleges;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) ||
      c.city.toLowerCase().includes(lowerQuery) ||
      c.state.toLowerCase().includes(lowerQuery) ||
      c.courses.some(crs => crs.name.toLowerCase().includes(lowerQuery))
    );
  }

  if (name) {
    filtered = filtered.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (state && state !== "") {
    filtered = filtered.filter(c => c.state === state);
  }
  if (city && city !== "") {
    filtered = filtered.filter(c => c.city === city);
  }
  if (type && type !== "") {
    filtered = filtered.filter(c => c.type === type);
  }
  if (maxFees && !isNaN(maxFees)) {
    filtered = filtered.filter(c => c.fees_max <= parseInt(maxFees) || c.fees_min <= parseInt(maxFees));
  }
  if (minRating && !isNaN(minRating)) {
    filtered = filtered.filter(c => c.rating >= parseFloat(minRating));
  }
  if (course && course !== "") {
    filtered = filtered.filter(c => c.courses.some(crs => crs.name === course));
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = pageNum * limitNum;

  const paginatedResults = filtered.slice(startIndex, endIndex);

  res.json({
    data: paginatedResults,
    meta: {
      total: filtered.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(filtered.length / limitNum)
    }
  });
};

const getCollegeById = (req, res) => {
  const id = parseInt(req.params.id);
  const college = colleges.find(c => c.id === id);
  
  if (college) {
    res.json(college);
  } else {
    res.status(404).json({ error: "College not found" });
  }
};

const getFilters = (req, res) => {
  const states = Array.from(new Set(colleges.map(c => c.state))).sort();
  const cities = Array.from(new Set(colleges.map(c => c.city))).sort();
  const types = Array.from(new Set(colleges.map(c => c.type))).sort();
  
  const courseSet = new Set();
  colleges.forEach(c => {
    c.courses.forEach(crs => courseSet.add(crs.name));
  });
  const courses = Array.from(courseSet).sort();

  res.json({
    states,
    cities,
    types,
    courses
  });
};

const getNearbyColleges = (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ message: "City parameter is required" });
  }

  // Exact match or partial match for robustness
  const nearby = colleges.filter(c => c.city.toLowerCase() === city.toLowerCase() || c.state.toLowerCase().includes(city.toLowerCase()));
  
  res.json(nearby.slice(0, 10)); // return top 10 nearby
};

const getTopRated = (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const sorted = [...colleges].sort((a, b) => b.rating - a.rating);
  res.json(sorted.slice(0, limit));
};

const getLowFees = (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const sorted = [...colleges].sort((a, b) => a.fees_min - b.fees_min);
  res.json(sorted.slice(0, limit));
};

// We don't need searchColleges anymore as getAllColleges handles it.
module.exports = {
  getAllColleges,
  getCollegeById,
  getFilters,
  getNearbyColleges,
  getTopRated,
  getLowFees
};
