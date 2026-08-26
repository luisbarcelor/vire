import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vire",
  description:
    "Herramienta de información para invertir, localizada para España.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>
        {children}
        <footer>
          <p>
            Esta aplicación ofrece información educativa, no asesoramiento de
            inversión.
          </p>
        </footer>
      </body>
    </html>
  );
}
