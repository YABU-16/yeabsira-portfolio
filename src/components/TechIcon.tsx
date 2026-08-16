import {
  Server,
  Code2,
  Palette,
  ShoppingCart,
  Database,
  GitBranch,
  Box,
  type LucideIcon,
} from "lucide-react";

type IconMap = Record<string, LucideIcon>;

const ICONS: IconMap = {
  code: Code2,
  server: Server,
  palette: Palette,
  "shopping-cart": ShoppingCart,
  database: Database,
  git: GitBranch,
  api: Server,
  sql: Database,
  postgresql: Database,
  mysql: Database,
  express: Server,
  node: Server,
  github: GitBranch,
  vscode: Code2,
  box: Box,
};

// Brand-ish accent colors for glyphs so each tech reads distinctly.
const COLORS: Record<string, string> = {
  html: "#e34c26",
  css: "#2965f1",
  javascript: "#f7df1e",
  react: "#61dafb",
  tailwind: "#38bdf8",
  bootstrap: "#7952b3",
  node: "#8cc84b",
  express: "#e0e0e0",
  php: "#8ab4f8",
  postgresql: "#58a6ff",
  mysql: "#f29111",
  git: "#f05032",
  github: "#c9d1d9",
  figma: "#a259ff",
  vscode: "#3b82f6",
};

/**
 * Renders a distinct symbol for a technology/service. Uses a lucide icon where a
 * clean mapping exists, otherwise a colored monogram badge. No extra icon libs.
 */
export function TechGlyph({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const key = name.toLowerCase();
  const Icon = ICONS[key];

  if (key === "react") {
    return (
      <svg
        viewBox="0 0 256 228"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <path
          fill="#61dafb"
          d="M210.5 94.5c-3.3-1.7-6.8-3.4-10.4-5 2.3-8.8 3.6-17.5 3.6-25.7 0-24.3-13.5-39.8-33.2-39.8-8.4 0-17.5 3.3-26.6 9.4-7.3-7.2-17-12.8-28.9-12.8-13.2 0-24.7 6.9-33.1 17.7C70.4 31.3 59.9 34.6 50.9 34.6c-16.6 0-27.9 12.4-27.9 30.5 0 6.8 1.8 14.1 5.2 21.5-1.7.8-3.4 1.6-5.1 2.5-12.9 7.3-19.1 16.8-19.1 23.1 0 6.3 6.2 15.8 19.1 23.1 1.7 1 3.4 1.7 5.1 2.5-3.4 7.4-5.2 14.7-5.2 21.5 0 18.1 11.3 30.5 27.9 30.5 9 0 19.5-3.3 30.7-9.5 8.4 10.8 19.9 17.7 33.1 17.7 11.9 0 21.6-5.6 28.9-12.8 9.1 6.1 18.2 9.4 26.6 9.4 19.7 0 33.2-15.5 33.2-39.8 0-8.2-1.3-16.9-3.6-25.7 3.6-1.6 7.1-3.3 10.4-5 12.9-7.3 19.2-16.8 19.2-23.1 0-6.3-6.3-15.8-19.2-23.1zM145.5 45.5c7.8-7 14.8-10.2 20.3-10.2 10 0 15.9 8.1 15.9 22.4 0 6.4-1.2 13.2-3.2 20.1-6.6-2-13.3-3.7-19.9-4.9-4.6-7.1-9.3-13.8-13.1-17.4zM74 137.8c1.5 1.4 3 2.8 4.5 4.2-1.5 1.4-3 2.8-4.5 4.2-6.8 6.4-13.5 9.4-18.2 9.4-10 0-15.9-8.1-15.9-22.4 0-1.9.2-3.8.5-5.7l5.4-1.3 13.6-3.1c2.3 5.1 7.2 10.4 14.6 14.7zM72.4 89.2c1.5 1.4 3 2.9 4.5 4.3-1.7 1.3-3.3 2.7-4.9 4-7.4 4.3-12.3 9.6-14.6 14.7l-13.6-3.1-5.4-1.3c-.3-1.9-.5-3.8-.5-5.7 0-14.3 5.9-22.4 15.9-22.4 4.8 0 11.5 3 18.6 9.5zM99.5 116.4c3.7 6.4 7.3 12.8 10.6 18.9-3.6 7.6-7.4 14.9-11.2 21.3-7.9-.7-15.2-2-21.9-3.7 3.4-8.1 8.1-15.8 13.9-22.6 2.9-3 5.7-6.1 8.6-9zm28.5 29.7c-4.1 11-8.7 21.3-12.7 29-8.4.7-16.1 2.4-22.9 4.8 2.8-8.5 6.4-17.7 10.4-26.9 8-1.8 16.8-4.7 25.2-4.7v2.1c0 .2-2 2.7-.3 6.7-.1 0-.1 0 0 0 .1.4 0 .2 0 0l.3-.9.6-.1zm.1-99.5c8.5-.1 17.3 2.9 25.3 4.7 4 9.2 7.6 18.4 10.4 26.9-6.8 2.4-14.5 4.1-22.9 4.8-4-7.7-8.6-18-12.7-29zM128 101.6c9.6 0 17.5 7.9 17.6 17.5 0 9.7-7.9 17.7-17.6 17.7-9.6 0-17.6-8-17.6-17.7.1-9.7 8-17.5 17.6-17.5zm45.6 28.8c-3.4 8.1-10.5 18.5-22.5 27.7-3.9-6.5-7.8-13.7-11.2-21.3 3.8-6 7.4-12.5 10.6-18.9 2.9 2.9 5.7 6 8.6 9 5.8 6.8 10.5 14.5 13.9 22.6-6.7 1.7-14 3-21.9 3.7-3.8-6.4-7.6-13.7-11.2-21.3 3.3-6.1 6.9-12.5 10.6-18.9 4.6.2 9.1.7 13.2 1.5 6.6 1.2 13.3 2.9 19.9 4.9 1.9 6.9 3.2 13.7 3.2 20.1 0 .1 0 .2 0 .3.1 2.6 0 5.1 0 5.1z"
        />
      </svg>
    );
  }

  if (Icon)
    return <Icon style={{ width: size, height: size }} aria-hidden="true" />;

  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.5,
        color: COLORS[key] ?? "#9aa0b0",
      }}
      className="flex items-center justify-center font-bold"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
