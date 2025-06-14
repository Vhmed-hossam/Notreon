import nodemailer from "nodemailer";

export default async function SendCodeEmail(name, email, code, text) {
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

        const logoCid = "logo@notreon";

        const emailHtml = `
      <div style="font-family: Arial, sans-serif">
        <div style="max-width: 600px; margin: auto; background: #F6EEE3; border-radius: 10px; padding: 40px">
          <div style=" margin-bottom: 20px;">
            <img src="cid:${logoCid}" alt="Notreon Logo" style="width: 150px; height: auto;" />
          </div>
          <h2 style=" color: #6D6147; margin-top: 0;">Hello ${name},</h2>
          <p style="font-size: 16px;">
            ${text}
          </p>
          <div style="">
            <h3 style="font-size: 23px; color: #121212; background: #FFE93B1a;width: fit-content; padding: 0px 10px">
              ${code}
            </h3>
          </div>
          <p style="font-size: 14px; color: #1E1E1E;"></p>
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
            text: `Your verification code is: ${code}`,
            html: emailHtml,
            attachments: [
                {
                    filename: "logo.png",
                    path: "../Images/Notreon_logo.png",
                    cid: logoCid,
                },
            ],
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}