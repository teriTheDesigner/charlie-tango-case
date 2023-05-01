import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import styles from "./Contact.module.css";
// import { createClient } from "@supabase/supabase-js";
export default function Contact() {
  const formEl = useRef(null);
  const { query } = useRouter();
  function submitted(e) {
    e.preventDefault();
    console.log({ buyers });
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      price: query.price,
      estateType: query.estate_type,
      size: query.size,
      zipCode: query.zipcode,
      buyers: buyers,
    };
    fetch("/api/addSellers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  console.log({ query });

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
          <form
            className={styles.contactForm}
            ref={formEl}
            onSubmit={submitted}
          >
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
