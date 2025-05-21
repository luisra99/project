import { User } from "./types";

// Mock authentication for demonstration
// In a real app, use a proper auth solution like NextAuth.js or Auth0

const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@restaurant.com",
    role: "admin",
  },
];

let currentUser: User | null = null;

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (email: string, password: string) => {
  console.log(email, password);
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail(email)) {
    return { success: false, error: "Correo inválido" };
  }

  if (!password || password.length === 0) {
    return { success: false, error: "Contraseña vacía" };
  }

  try {
    const res = await fetch(`/api/users/${encodeURIComponent(email)}`);

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Usuario no encontrado",
      };
    }

    const user = await res.json();
    console.log(user);
    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    if (user.password !== password) {
      return { success: false, error: "Contraseña incorrecta" };
    }

    return { success: true, user };
  } catch (error) {
    console.error("Error en login:", error);
    return { success: false, error: "Error interno" };
  }
};

export const logout = () => {
  currentUser = null;
  return { success: true };
};

export const getCurrentUser = () => {
  return currentUser;
};

export const isAdmin = () => {
  return currentUser?.role === "admin";
};

export const requireAdmin = () => {
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return true;
};
