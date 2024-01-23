"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.push("/"); // Redirect to home
  }, [router]);

  return null; // Render nothing or a loading indicator
}

export default NotFound;
