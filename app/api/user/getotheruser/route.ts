import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Define the handler for the GET method
export async function GET(req: NextRequest) {
    try {
        // Retrieve the username from headers
        const username = req.headers.get('username');

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        // Find users where username is not the logged-in user's username
        const otherUsers = await User.find({
            username: { $ne: username }
        }).select("-password");

        return NextResponse.json(otherUsers);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while fetching users" }, { status: 500 });
    }
}
