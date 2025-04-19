import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) throw new Error("Cannot get settings");
  return data;
}

export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select()
    .single();

  if (error) throw new Error("Unable to update setting");

  return data;
}
