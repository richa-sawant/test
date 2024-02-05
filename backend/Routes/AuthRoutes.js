const { Router } = require("express");
const { isAuthenticated, refreshAccessToken } = require("../middleware/isAuthenticated");
const { signup, logout, login_post } = require("../controllers/AuthController");
const { info } = require("../controllers/InfoController");

const router = Router();

router.get("/", (req, res) => res.json({ "status": "connected to backend" }));
router.post('/api/signup', signup);
router.get("/api/isAuth", isAuthenticated);
router.post('/api/refreshToken', refreshAccessToken);
router.post('/api/info', info);
router.post("/api/login", login_post);

router.get("/api/logout", logout);




module.exports = router;
