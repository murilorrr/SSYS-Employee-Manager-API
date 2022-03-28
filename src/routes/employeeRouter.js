const { Router } = require("express");
const { create, getAll } = require("../controllers/employees");

const router = new Router();

router.post("/", create);
router.get("/", getAll);

module.exports = router;
