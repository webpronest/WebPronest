// "use client";

import GoogleLoginButton from "./GoogleLoginButton";

// import { useState } from "react";

export default function AuthModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void; }) {
    //   const [open, setOpen] = useState(false);

    return (
        <>
            {/* Trigger Button */}
            {/* <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Login / Sign Up
      </button> */}

            {/* Popup Modal */}
            {open && (
                <div
                    className="fixed inset-0fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 bg-opacity-40"
                    onClick={() => setOpen(false)} // click outside to close
                >
                    <div
                        className="bg-white p-6 rounded-md shadow-lg w-80"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Continue With
                        </h2>

                        <button
                            onClick={loginWithGoogle}
                            aria-label="Continue with Google"
                            className="w-full flex items-center justify-center gap-3 py-2 px-3 border border-gray-200 rounded-md bg-white hover:shadow-md transition-shadow duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <span className="w-5 h-5 inline-flex">
                                <svg viewBox="0 0 533.5 544.3" width="20" height="20" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                                    <path fill="#4285F4" d="M533.5 278.4c0-17-1.5-33.4-4.3-49.4H272v93.7h147.1c-6.3 34-25.1 62.8-53.7 82v68.1h86.6c50.8-46.8 82.5-116 82.5-194.4z"/>
                                    <path fill="#34A853" d="M272 544.3c72.6 0 133.6-24.1 178.2-65.5l-86.6-68.1c-24 16.2-54.8 25.9-91.6 25.9-70.5 0-130.2-47.5-151.6-111.5H32.9v69.9C77.6 486.9 167.1 544.3 272 544.3z"/>
                                    <path fill="#FBBC05" d="M120.4 327.1c-6.9-20.7-6.9-42.9 0-63.6V193.6H32.9c-39.9 79.5-39.9 174.1 0 253.6l87.5-69.9z"/>
                                    <path fill="#EA4335" d="M272 107.7c38.6 0 73.4 13.3 100.8 39.4l75.4-75.4C408.1 24.9 344.8 0 272 0 167.1 0 77.6 57.4 32.9 143.6l87.5 69.9C141.8 155.2 201.5 107.7 272 107.7z"/>
                                </svg>
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                                Continue with Google
                            </span>
                        </button>
                        {/* <div className="flex items-center justify-center mb-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-2 text-gray-500">or</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <button
                            className="w-full block text-center py-2 border border-gray-300 rounded-md mb-3 hover:bg-gray-100 transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                            onClick={() => setOpen(false)}
                        >
                            Continue with Email
                        </button> */}

                        {/* <GoogleLoginButton /> */}

                        <button
                            onClick={() => setOpen(false)}
                            className="w-full py-2 mt-3 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || "";


export function loginWithGoogle() {
    console.log("Google Client ID:", GOOGLE_CLIENT_ID);
    const currentUrl = window.location.href;
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&response_type=code` +
        `&scope=openid%20email%20profile` +
        `&access_type=offline` +           // to get refresh_token
        `&prompt=consent`;                 // ensures refresh token returns
    // window.location.href = oauthUrl;
    console.log("Redirecting to:", oauthUrl);
    localStorage.setItem("postLoginRedirect", currentUrl);
    window.open(oauthUrl, "_self");

}
