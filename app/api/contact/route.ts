import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
    if (!resend) {
        return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    try {
        const { name, email, message } = await request.json();

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
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
