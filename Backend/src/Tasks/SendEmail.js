import nodemailer from "nodemailer";

export default async function SendCodeEmail(name, email, code, identity, text) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif">
        <div style="margin: auto; background: #F6EEE3; border-radius: 10px; padding: 40px">
          <div style=" margin-bottom: 20px;text-align: center;">
            <img src="${process.env.EMAIL_LOGO_IMAGE_URL}" alt="Notreon Logo" style="width: 150px; height: auto;" />
          </div>
          <h2 style=" color: #6D6147; margin-top: 0;">Hello ${name},</h2>
          <p style="font-size: 16px;">
            ${text}
          </p>
          <div style="">
            <h3 style="font-size: 23px; color: #121212; background: #FFE93B5a;width: fit-content; padding: 0px 10px">
              ${code}
            </h3>
          </div>
          <div style="">
            <h3 style="font-size: 23px; color: #121212; background: #FFE93B5a;width: fit-content; padding: 0px 10px">
              ${identity}
            </h3>
          </div>
          <p style="font-size: 14px; color: #1E1E1E;">Please do not share this code and identity with anyone.</p>
          <p style="font-size: 14px; color: #1E1E1E;">we like to mention that if no action is taken within 2 days, the account will be deleted.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="text-align: center; font-size: 12px; color: #1212129a;">
            &copy; ${new Date().getFullYear()} Notreon. All rights reserved.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "Verification Code",
      text: `Here is your verification code: ${code}`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}