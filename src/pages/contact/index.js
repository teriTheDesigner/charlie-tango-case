import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Contact.module.css";
import { useState, useEffect } from "react";

export default function Contact() {
  const { query } = useRouter();
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(query.id);

  /*  useEffect(() => {
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
  } */
  return (
    <>
      <Head>
        <title>Select buyer | EDC</title>
      </Head>
      <div className={`wrapper`}>
        <h1 className={styles.headline}>Potential buyers</h1>
        <form
          action="/contact"
          method="GET"
          className={styles.cardPageLayout}
        ></form>
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
