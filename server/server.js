import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

app.post('/api/contact', async (req, res) => {
    if (!resend) {
        return res.status(503).json({ error: 'Email service not configured. Please set RESEND_API_KEY.' });
    }

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing name, email or message.' });
        }

        const { data, error } = await resend.emails.send({
            from: 'Arpit Portfolio <onboarding@resend.dev>',
            to: ['thakorarpitsinh25@gmail.com'],
            subject: `New Contact from ${name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #B6624B;">New Portfolio Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
                        ${message}
                    </div>
                    <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #888;">This email was sent via your Arpit Thakor Portfolio contact form.</p>
                </div>
            `,
        });

        if (error) {
            return res.status(400).json({ error });
        }

        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
