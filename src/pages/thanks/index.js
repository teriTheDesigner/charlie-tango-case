import Head from "next/head";
import styles from "../Home.module.css";
import style from "./Thanks.module.css";
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
      <div className={style.layout}>
        <h1 className={styles.headline}>Thank you!</h1>
        <img className={style.img} alt="icon"></img>
        <div className={style.div}>
          <p>
            Thank you for registering your property with our agency! Our team of
            experienced agents will review your information and contact you as
            soon as possible to discuss the next steps in the selling process.
            If you have any questions or concerns, please don't hesitate to
            reach out to us.
          </p>
          <button className={styles.button} onClick={handleViewDashboard}>
            View dashboard
          </button>
        </div>
      </div>
    </>
  );
}
