import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Contact.module.css";

export default function Contact() {
  const { query } = useRouter();

  const buyers = query.id ? query.id.map(JSON.parse) : [];

  return (
    <>
      <Head>
        <title>Select buyer | EDC</title>
      </Head>
      <div className={`wrapper`}>
        <h1 className={styles.headline}>Potential buyers</h1>
        {/*  <form
          action="/contact"
          method="GET"
          className={styles.cardPageLayout}
        ></form> */}
        <div className={styles.content}>
          <h2>Buyers</h2>
          <ul>
            {buyers.map((buyer) => (
              <li key={buyer.id}>
                <pre>
                  <code>{JSON.stringify(buyer, null, 2)}</code>
                </pre>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
