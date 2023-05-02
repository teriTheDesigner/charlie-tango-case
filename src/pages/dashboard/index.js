import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";

export default function AllData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from Supabase and set it to the state
    const fetchData = () => {
      fetchFromSupabase()
        .then((fetchedData) => {
          setData(fetchedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>All Data | Your App</title>
      </Head>
      <div className={`wrapper`}>
        <h1 className={styles.headline}>All Data</h1>
        <div className={styles.cardContainer}>
          {data.map((item) => (
            <div key={item.name} className={styles.card}>
              {/* Display data fields as card content */}
              <div className={styles.cardContent}>
                <p>Field 1</p>
                <p>{item.email}</p>
              </div>
              <div className={styles.cardContent}>
                <p>Field 2</p>
                <p>{item.field2}</p>
              </div>
              {/* Add more card content as needed */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

async function fetchFromSupabase() {
  const apiUrl =
    "https://bmfekiqwrptfzlyfxxbl.supabase.co/rest/v1/Charlie_Tango_case";
  //   const apiKey = process.env.SUPABASE_KEY;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_KEY,
        Prefer: "return=representation",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
