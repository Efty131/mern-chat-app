const express = require("express");
// const app = express();
// var bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const { sendMessage, allMessages } = require("../controllers/messageControllers");
const { protect } = require("../middlewares/authMiddleware");


const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/').post(protect,sendMessage);
router.route('/:chatId').get(protect,allMessages);

module.exports = router;