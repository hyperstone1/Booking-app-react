const { sendMail } = require("../utils/sendMail");
class MailerController {
  sendMail = async (req, res) => {
    try {
      const { select, name, email, price, date } = req.body;

      await sendMail({
        from: "workprogexam12@gmail.com",
        to: `${email}, "info@itspro.by"`,
        subject: "Booking App",
        text: "Бронирование апартаментов",
        html: `<div><p>Благодарим за бронирование!</p>
                    <p>Ваше ФИО: ${name}</p>
                    <p>Выбранные дни бронирования: ${date}</p>
                    <p>Стоимость бронирования: ${price}</p>
                    <p>Время бронирования: ${select}</p>
                    <p>Бронирование осуществляется на период кратный 24 часам</p>
                    <p>С уважением, разработчик данного приложения</p>
              </div>`,
      });
      res.status(200).json({ message: "success" });
    } catch (e) {
      res.status(400).json({ message: "failed", err: e });
    }
  };
}

module.exports = MailerController;
