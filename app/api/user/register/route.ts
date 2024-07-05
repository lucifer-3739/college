import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { ConnectDB } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import userimg from "@/public/user.png"

export async function POST(request: NextRequest) {
    try {
        await ConnectDB();

        const reqBody = await request.json();
        const { name, email, password } = reqBody;

        // Validate the request body
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Set user profile icon
        const profilePhoto = "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Free-PNG-Clip-Art.png"

        const newUser = new User({
            profile: profilePhoto,
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("Saved User:", savedUser);

        // Send verification email (uncomment and ensure sendEmail is correctly imported)
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
        });

    } catch (error: any) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
