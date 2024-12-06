import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saragadamlikith48@gmail.com',
    pass: 'bllx tehm igbq viwc',
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: '"CineShelf" <saragadamlikith48@gmail.com>',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
