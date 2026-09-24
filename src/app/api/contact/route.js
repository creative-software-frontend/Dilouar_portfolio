import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, error: "Please provide a valid email address" }, { status: 400 });
    }

    if (process.env.ZEROBOUNCE_API_KEY) {
      const verifyRes = await fetch(
        `https://api.zerobounce.net/v2/validate?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}`
      );
      const verifyData = await verifyRes.json();

      if (verifyData.status !== "valid") {
        return Response.json(
          { success: false, error: "The provided email address does not exist or is inactive" },
          { status: 400 }
        );
      }
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "rahashik129@gmail.com",
      replyTo: email,
      subject: `New Message from ${name} via Portfolio`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4f46e5;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #4f46e5;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return Response.json({ success: false, error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (err) {
    console.error("API Error:", err);
    return Response.json({ success: false, error: "Server error" }, { status: 500 });
  }
}