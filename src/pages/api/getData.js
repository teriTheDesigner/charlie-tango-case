// pages/api/getData.js
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from("Charlie_Tango_case")
      .select("*");

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(
      "Error fetching data from Supabase:",
      error.message,
      error.stack
    );

    // console.error("Error fetching data from Supabase:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
}
