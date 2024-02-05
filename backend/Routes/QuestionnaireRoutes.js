const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const router = express.Router();
const { getQuestionnaire, createQuestionnaire } = require('../controllers/QuestionnaireController');

router.post('/api/questionnaire/add', isAuthenticated, createQuestionnaire);
router.get('/api/questionnaire/getquest', isAuthenticated, getQuestionnaire);


module.exports = router;
