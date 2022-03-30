const router = require("express").Router();
const MailerController = require("../controllers/MailerController");
const mailerController = new MailerController();

router.post("/send-mail", mailerController.sendMail);

module.exports = router;
