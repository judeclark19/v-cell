import { Metadata } from "next";
import { metadata as pageMetadata } from "@/lib/metadata";
import Home from "./Home";

export const metadata: Metadata = pageMetadata;

export default function Page() {
  return <Home />;
}
