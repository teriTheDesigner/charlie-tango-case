import Head from "next/head";
import styles from "../Home.module.css";
import { useRouter } from "next/router";

export default function Thanks() {
  const router = useRouter();

  function handleViewDashboard() {
    router.push("/dashboard");
  }

  return (
    <>
      <Head>
        <title>Thank you | EDC</title>
      </Head>
      <h1 className={styles.headline}>Thank you!</h1>
      <button className={styles.button} onClick={handleViewDashboard}>
        View dashboard
      </button>
    </>
  );
}
