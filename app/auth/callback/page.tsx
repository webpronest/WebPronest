"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoaderIcon from "@/components/LoaderIcon";
import ProgressDots from "@/components/ProgressDots";
import { useAuth } from "@/app/providers/AuthProvider";
import { apiFetch } from "@/app/lib/apiFetch";

type Status = "idle" | "loading" | "success" | "error";

export default function AuthGoogleCallback() {
  return (
    <Suspense fallback={
      <main className="min-h-screen grid place-items-center bg-gray-50 p-6">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-4">
            <LoaderIcon status="loading" />
            <div>
              <h1 className="text-xl font-semibold">Preparing to log you in</h1>
              <p className="text-gray-600 mt-1">Loading…</p>
            </div>
          </div>
          <ProgressDots />
        </div>
      </main>
    }>
      <GoogleCallback />
    </Suspense>
  );
}

export function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const { refresh } = useAuth();

  useEffect(() => {
    const redirect = localStorage.getItem("postLoginRedirect") || "/";

    if (!code) return;
    if (status === "loading") return;

    const doExchange = async () => {
      setStatus("loading");
      setMessage("Exchanging authorization code…");

      try {

        const res = await apiFetch("/auth/google/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
		  credentials: "include",
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (!res.ok) throw data;

        // Success
        setStatus("success");
        setMessage("Login successful — redirecting…");
		console.log("Login data:", data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.removeItem("postLoginRedirect");
		await refresh();
		setTimeout(() => router.replace(redirect), 1200);
      } catch (err: any) {
        console.error("Token exchange failed:", err);
        setStatus("error");
        setMessage(
          err?.detail ||
            err?.error_description ||
            "Exchange failed — please try again."
        );
      }
    };

    doExchange();
  }, [code, attempts]);

  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-4">
        {/* Title + Loader */}
        <div className="flex items-center gap-4">
          <LoaderIcon status={status} />

          <div>
            <h1 className="text-xl font-semibold">
              {status === "loading" && "Logging you in"}
              {status === "success" && "Welcome back!"}
              {status === "error" && "Something went wrong"}
              {status === "idle" && "Processing"}
            </h1>

            <p className="text-gray-600 mt-1">
              {message ||
                (code
                  ? "Preparing to exchange authorization code…"
                  : "Waiting for authorization code…")}
            </p>
          </div>
        </div>

        {/* Progress dots */}
        {status === "loading" && <ProgressDots />}

        {/* Error actions */}
        {status === "error" && (
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                setAttempts((a) => a + 1);
                setStatus("idle");
                setMessage("");
              }}
              className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Retry
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 bg-white hover:bg-gray-100"
            >
              Back to login
            </button>
          </div>
        )}

        {/* Success actions */}
        {status === "success" && (
          <div className="pt-2">
            <p className="text-sm text-gray-500">
              If you are not redirected automatically, click below.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-3 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
