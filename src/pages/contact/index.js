import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./Contact.module.css";
import { createClient } from "@supabase/supabase-js";

export default function Contact() {
  const { query } = useRouter();

  console.log({ query });
  // const buyers = query.id ? query.id.map(JSON.parse) : [];
  // _______________________1_

  const [buyers, setBuyers] = useState([]);
  useEffect(() => {
    if (query.id) {
      setBuyers(query.id.map(JSON.parse));
    }
  }, [query.id]);

  console.log("buyers:", buyers);
  function deleteBuyer(id) {
    setBuyers((prev) => prev.filter((buyer) => buyer.id !== id));
  }
  // _______________________1_
  return (
    <>
      <Head>
        <title>Select buyer | EDC</title>
      </Head>
      <div className={`wrapper`}>
        <h1 className={styles.headline}>Potential buyers</h1>
        <div className={styles.content}>
          <h2>Buyers</h2>
          <ul>
            {buyers.map((buyer) => (
              <li key={buyer.id}>
                <button onClick={() => deleteBuyer(buyer.id)}>X</button>
                <pre>
                  <code>{JSON.stringify(buyer, null, 2)}</code>
                </pre>
              </li>
            ))}
          </ul>
          <form className={styles.contactForm}>
            <label>
              Name
              <input type="text" name="name" required />
            </label>
            <label>
              Email Address
              <input type="email" name="email" required />
            </label>
            <label>
              Phone Number
              <input type="tel" name="phone" required />
            </label>
            <label>
              <input type="checkbox" name="offersAndInfo" />
              Yes please, EDC may contact me with offers and information related
              to the real estate market.
            </label>
            <button type="submit">Contact buyers</button>
          </form>
        </div>
      </div>
    </>
  );
}
