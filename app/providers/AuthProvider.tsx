"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiFetch from "../lib/apiFetch";

type User = {
	sub?: string;
	email?: string;
	name?: string;
	picture?: string;
	given_name?: string;
	family_name?: string;
	email_verified?: boolean;
	// add your fields
} | null;

type AuthContextValue = {
	user: User;
	loading: boolean;
	refresh: () => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	const fetchSession = async () => {
		setLoading(true);
		try {
			const res = await apiFetch("/auth/validate-session", { method: "GET" });
			if (res.ok) {
				const data = await res.json();
				setUser(data.google_user_info ?? null);
			} else {
				setUser(null);
			}
		} catch (err) {
			console.error("session fetch error", err);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// on mount - fetch session
		fetchSession();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logout = async () => {
		try {
			const res = await apiFetch("/auth/logout", { method: "POST" });
			// Clear client state regardless of backend result
			if (res.ok) {
				setUser(null);
				router.replace("/");
			}
		} catch (err) {
			console.error("logout failed", err);
			setUser(null);
		}
	};

	const value: AuthContextValue = {
		user,
		loading,
		refresh: fetchSession,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}