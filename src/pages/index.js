import Head from "next/head";
import styles from "./Home.module.css";
import IndexForm from "@/components/IndexForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.headline}>Hello</h1>

        <div className={styles.content}>
          <IndexForm />
        </div>
      </div>
    </>
  );
}
