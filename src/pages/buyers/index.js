import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Buyers.module.css";
import { useState, useEffect } from "react";

export default function Buyers() {
  const { query } = useRouter();
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    // Check if zipCode exists in the query

    fetch(
      `/api/find-buyers?price=${query.price}&size=${query.size}&zipCode=${query.zipCode}&estate_type=${query.estate_type}`
    )
      .then((res) => res.json())
      .then((data) => setBuyers(data));
  }, [query]);

  console.log({ buyers });
  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <div className={`wrapper ${styles.cardPageLayout}`}>
        <h1 className={styles.headline}>Potential buyers</h1>
        <form action="/contact" method="GET">
          {buyers.map((buyer) => (
            <div key={buyer.id} className={styles.card}>
              <input
                type="checkbox"
                name="id[]"
                value={buyer.id}
                className={styles.checkbox}
              ></input>
              <div className={styles.card_content}>
                <p>Buyer's ID</p>
                <p>{buyer.id}</p>
              </div>
              <div className={styles.card_content}>
                <p>Estate Type</p>
                <p>{buyer.estateType}</p>
              </div>
              <div className={styles.card_content}>
                <p>Takeover Date</p>
                <p>{buyer.takeoverDate}</p>
              </div>
              <div className={styles.card_content}>
                <p>Adults</p>
                <p>{buyer.adults}</p>
              </div>
              <div className={styles.card_content}>
                <p>Children</p>
                <p>{buyer.children}</p>
              </div>
              <div className={styles.card_content}>
                <p>Min Size</p>
                <p>{buyer.minSize}</p>
              </div>
              <div className={styles.card_content}>
                <p>Max Price</p>
                <p>{buyer.maxPrice}</p>
              </div>
              <div>
                <p>Description</p>
                <p>{buyer.description}</p>
              </div>
            </div>
          ))}
          <button>Page 3</button>
        </form>
        <div className={styles.content}>
          <h2>Query params:</h2>
          <pre>
            <code>{JSON.stringify(query, null, 2)}</code>
          </pre>
        </div>
      </div>
    </>
  );
}
