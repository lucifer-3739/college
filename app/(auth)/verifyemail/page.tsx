"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.error(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600 py-8 px-4">
            <h1 className="text-4xl font-bold mb-4">Verify Email</h1>
            {token && (
                <h2 className="p-2 mb-4 bg-orange-500 text-white rounded">{token}</h2>
            )}
            {verified ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-green-600">Email Verified Successfully!</h2>
                    <Link href="/login">
                        <a className="text-blue-500 underline">Go to Login</a>
                    </Link>
                </div>
            ) : error ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-red-600">Error Verifying Email</h2>
                    <p className="text-gray-700">Please try again later or contact support.</p>
                </div>
            ) : (
                <p className="text-white">Verifying your email...</p>
            )}
        </div>
    );
}
