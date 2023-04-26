import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Buyers.module.css";
import { useState, useEffect } from "react";

export default function Buyers() {
  const { query } = useRouter();
  const [buyers, setBuyers] = useState([]);
  console.log(query.zipCode);
  console.log(query.estate_type);
  console.log(query.price);
  console.log(query.size);

  useEffect(() => {
    // Check if zipCode exists in the query
    if (query.zipCode) {
      fetch(
        `/api/find-buyers?price=${query.price}&size=${query.size}&zipCode=${query.zipCode}&estate_type=${query.estate_type}`
      )
        .then((res) => res.json())
        .then((data) => setBuyers(data));
    }
  }, [query.zipCode, query.estate_type, query.price, query.size]);

  console.log({ buyers });
  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.headline}>Potential buyers</h1>

        {buyers.map((buyer) => (
          <p key={buyer.id}>{buyer.description}</p>
        ))}
        <p>
          On this page you get the <code>`query`</code> params like{" "}
          <code>`zipCode`</code>, and can use them to fetch a list of buyers
          from the API.
        </p>
        <p>
          Make sure to read the docs on how to fetch data on a page - There are
          multiple ways of doing it, and you should choose the one that fits
          your solution best.
        </p>
        <ul>
          <li>
            <a
              href="https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props"
              target="_blank"
            >
              next.js - Data fetching
            </a>
          </li>
          <li>
            <a
              href="https://react.dev/learn/synchronizing-with-effects#fetching-data"
              target="_blank"
            >
              react.dev - Fetching data
            </a>
          </li>
        </ul>
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
