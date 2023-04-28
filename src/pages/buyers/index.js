import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Buyers.module.css";
import { useState, useEffect } from "react";
import { estateTypes } from "@/data/estateTypes";

export default function Buyers() {
  const { query } = useRouter();
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/find-buyers?price=${query.price}&size=${query.size}&zipCode=${query.zipCode}&estateType=${query.estateType}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBuyers(data);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function getEstateTypeName(id) {
    //goes through the object and returns the first element in the provided array
    const estateTypeName = estateTypes.find((x) => x.id === id);
    return estateTypeName ? estateTypeName.name : null;
  }
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
                <p>{getEstateTypeName(buyer.estateType)}</p>
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
                <p className={styles.icon}>Min Size</p>
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
          <button>Continue</button>
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
