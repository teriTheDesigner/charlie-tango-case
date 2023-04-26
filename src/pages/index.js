import Head from "next/head";
import styles from "./Home.module.css";
import { estateTypes } from "../data/estateTypes";

export default function Home() {
  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.headline}>Hello</h1>

        <div className={styles.content}>
          <form action="/buyers" method="GET" className={styles.form}>
            <label>
              <span className={styles.label}>Price</span>
              <input name="price" required />
            </label>
            <label>
              <span className={styles.label}>Size</span>
              <input name="size" required />
            </label>
            <label>
              <span className={styles.label}>Zip Code</span>
              <input name="zipCode" required />
            </label>
            <label>
              <span className={styles.label}>Estate type</span>
              <select name="estate_type" required>
                {estateTypes.map(({ name, id }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <button className={styles.button}>Find potential buyers</button>
          </form>
        </div>
      </div>
    </>
  );
}
