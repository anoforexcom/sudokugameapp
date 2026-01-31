import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "sudokuhub.live - Premium Sudoku Puzzle Game | 150 Challenging Levels",
    description: "Play 150 progressive Sudoku levels with hints, leaderboards, and achievements. Premium brain training game with credit system and global rankings. Free to start!",
    keywords: ["sudoku", "puzzle game", "brain training", "logic game", "sudoku online", "free sudoku", "sudoku puzzles", "mind games", "number puzzle", "sudoku app"],
    authors: [{ name: "sudokuhub.live" }],
    robots: "index, follow",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        title: "SudokuHub",
        statusBarStyle: "black-translucent",
    },
    openGraph: {
        type: "website",
        url: "https://sudokuhub.live/",
        title: "sudokuhub.live - Premium Sudoku Puzzle Game",
        description: "Play 150 progressive Sudoku levels with hints, leaderboards, and achievements. Free to start!",
        images: [{ url: "https://sudokuhub.live/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "sudokuhub.live - Premium Sudoku Puzzle Game",
        description: "Play 150 progressive Sudoku levels with hints, leaderboards, and achievements. Free to start!",
        images: ["https://sudokuhub.live/og-image.png"],
    },
};

export const viewport: Viewport = {
    themeColor: "#4f46e5",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
