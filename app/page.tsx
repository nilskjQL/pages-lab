import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Hack The Planet",
};

export default function HomePage() {
  // Hide the main page by returning a 404 page
  notFound();
  return null;
}
