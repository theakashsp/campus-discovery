const express = require('express');
const router = express.Router();
const { getAllColleges, getCollegeById, getFilters, getNearbyColleges, getTopRated, getLowFees } = require('../controllers/collegeController');

router.get('/nearby', getNearbyColleges);
router.get('/filters', getFilters);
router.get('/top-rated', getTopRated);
router.get('/low-fees', getLowFees);
router.get('/:id', getCollegeById);
router.get('/', getAllColleges);

module.exports = router;
