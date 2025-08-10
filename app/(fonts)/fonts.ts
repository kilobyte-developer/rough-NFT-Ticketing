import { Inter, Poppins, Roboto_Mono } from "next/font/google"

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
export const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-poppins" })
export const mono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" })
