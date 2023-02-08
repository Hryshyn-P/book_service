import { scheduleJob } from "node-schedule";
import { createTransport } from "nodemailer";

// Конфигурация для отправки email
const smtpConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "example@gmail.com",
    pass: "password",
  },
};

const emailList = ["example1@example.com", "example2@example.com"];

const job = scheduleJob("0 0 * * *", () => { // every day at 00:00
  console.log("Starting email send job...");

  const transporter = createTransport(smtpConfig);

  for (const email of emailList) {
    const mailOptions = {
      from: email,
      to: "recipient@example.com",
      subject: "Test Email",
      text: "This is a test email.",
    };

    // Отправка email с задержкой в 10 секунд между каждой отправкой
    setTimeout(() => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`Error sending email from ${email}: ${error}`);
        } else {
          console.log(`Email sent from ${email}: ${info.messageId}`);
        }
      });
    }, 10000);
  }
});
