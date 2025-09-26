import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/typography/styleguide.css"


export const metadata: Metadata = {
  title: "Gault&Millau",
  description: "Le guide gastronomique de référence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}