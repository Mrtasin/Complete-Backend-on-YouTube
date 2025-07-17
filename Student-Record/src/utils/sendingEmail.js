import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendingEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Student Record",
      link: "https://www.youtube.com/@tasincoder",
    },
  });

  const email = {
    body: {
      name: options.name,
      intro: "Welcome to Tasin Coder! We're very excited to have you on board.",
      action: {
        instructions: options.instructions,
        button: {
          color: "#22BC66",
          text: options.subject,
          link: `${process.env.BASE_URL}/api/v1/users/${options.route}/${options.token}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = mailGenerator.generate(email);

  const emailText = mailGenerator.generatePlaintext(email);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: MAILTRAP_FROM,
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailBody,
  });

  console.log("Message sent:-", info.messageId);
};

// const options = {
//   name: name,
//   instructions: instructions,
//   email: email,
//   route: route,
//   token: token,
//   subject: subject,
// };

export default sendingEmail;
