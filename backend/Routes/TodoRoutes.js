const { Router } = require("express")
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { todo_post, todo_get } = require("../controllers/todoController")

const router = Router();

router.post("/api/todo",isAuthenticated, todo_post)
router.get("/api/todoALL",isAuthenticated, todo_get)

module.exports = router