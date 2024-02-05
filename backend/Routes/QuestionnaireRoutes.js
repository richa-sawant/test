const express = require('express');
const router = express.Router();
const { getQuestionnaire, createQuestionnaire } = require('../controllers/QuestionnaireController');

router.post('/api/questionnaire/add', createQuestionnaire);
router.get('/api/questionnaire/getquest', getQuestionnaire);

module.exports = router;
