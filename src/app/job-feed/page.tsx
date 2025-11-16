"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function JobFeed() {
  useEffect(() => {
    redirect("/dashboard");
  }, []);

  return null;
}
