export const dynamic = "force-dynamic";
import nodemailer from "nodemailer";

// Regex for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Regex for phone validation (6-12 digits)
const phoneRegex = /^\d{6,12}$/;

// Regex for name (letters and spaces only)
const nameRegex = /^[a-zA-Z\s]+$/;

export async function POST(req) {
    try {
        console.log("wow");
        const data = await req.json();
        const { fullname, email, phone, countryCode, interests, query } = data;

        const errors = {};

        // Full name validation
        if (!fullname || fullname.trim() === "") {
            errors.fullname = "Name is required.";
        } else if (!nameRegex.test(fullname.trim())) {
            errors.fullname = "Name can only contain letters and spaces.";
        } else if (fullname.trim().length < 3) {
            errors.fullname = "Full name must be at least 3 characters.";
        }

        // Email validation
        if (!email || email.trim() === "") {
            errors.email = "Email is required.";
        } else if (!emailRegex.test(email.trim())) {
            errors.email = "Enter a valid email address.";
        }

        // Phone validation
        if (!phone || phone.trim() === "") {
            errors.phone = "Phone number is required.";
        } else if (!phoneRegex.test(phone.trim())) {
            errors.phone = "Enter a valid phone number (6-12 digits).";
        }

        // Interests validation
        if (!interests || interests.length === 0) {
            errors.interests = "Select at least one interest.";
        }

        // Query validation
        if (!query || query.trim() === "") {
            errors.query = "Query is required.";
        } else if (query.trim().length < 50) {
            errors.query = "Query must be at least 50 characters.";
        }

        // If any validation failed, return errors
        if (Object.keys(errors).length > 0) {
            return new Response(JSON.stringify({ errors }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `Uxbodh <${process.env.EMAIL_USER}>`, // always your Gmail
            replyTo: email, // user email (any domain allowed)
            to: process.env.GMAIL_USER, // always your Gmail
            subject: "New Contact Form Submission",
            html: `
                <h2>New Contact Us Submission</h2>
                <p><strong>Name:</strong> ${fullname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${countryCode}-${phone}</p>
                <p><strong>Interests:</strong> ${interests.join(", ")}</p>
                <p><strong>Message:</strong> ${query}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({
                data: {
                    status: "success",
                    message: "Form submitted successfully!",
                },
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            },
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to submit form." }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
