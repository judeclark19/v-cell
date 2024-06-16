import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "V-Cell",
    template: "V-Cell | %s"
  },
  description: "Game concept by Jim Fox - Web app by Jude Clark",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"]
  },
  manifest: "/site.webmanifest"
};
