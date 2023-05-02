// pages/api/get-data.js
import { supabase } from "../../utils/supabaseClient";

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
    console.error("Error fetching data from Supabase:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
