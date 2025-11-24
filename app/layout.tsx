import "./globals.css";
import type { ReactNode } from "react";
import { MotionRoot } from "../components/motion-root";

export const metadata = {
  title: "Jungle Whisper",
  description: "An animated jungle tale featuring a lion, rabbit, and owl."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
