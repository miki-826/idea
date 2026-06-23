"use client";

import { HAS_SUPABASE, supabase } from "@/lib/supabase";

export async function saveProject(payload: unknown) {
  const row = {
    title: "IDEA VISIBLE project",
    payload,
    updated_at: new Date().toISOString(),
  };

  if (HAS_SUPABASE && supabase) {
    const { error } = await supabase.from("idea_projects").insert(row);
    if (!error) return "Supabaseへ保存しました";
  }

  const all = JSON.parse(localStorage.getItem("idea-visible-cloud-fallback") ?? "[]");
  localStorage.setItem("idea-visible-cloud-fallback", JSON.stringify([row, ...all]));
  return "LocalStorageへ保存しました";
}
