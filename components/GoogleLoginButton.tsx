import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleLoginButton() {

  const handleCallback = async (response: any) => {
    console.log("Google Response:", response);
    const googleToken = response.credential;

    const backendRes = await fetch("http://localhost:8000/auth/google/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: googleToken }),
    });

    const data = await backendRes.json();
    localStorage.setItem("jwt", data.jwt);
    console.log("User:", data);
    alert("Login successful!");
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "193754887176-49aia3vra9qi1dmefbbito428935jg8a.apps.googleusercontent.com",
        callback: handleCallback,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large" } // customization attributes
      );
    }

  }, []);

  return <div id="googleBtn" className="flex items-center justify-center"></div>;
}