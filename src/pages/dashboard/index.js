import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import styles from "./Dashboard.module.css";

const supabase = createClient(
  "https://bmfekiqwrptfzlyfxxbl.supabase.co",
  process.env.SUPABASE_KEY
);

export async function getServerSideProps() {
  const { data: sellers, error } = await supabase
    .from("Charlie_Tango_case")
    .select("*");

  if (error) {
    console.error(error);
    return { props: {} };
  }
  console.log("sellers:", sellers);

  return { props: { sellers } };
}

export default function Sellers({ sellers }) {
  console.log("sellers prop:", sellers);
  return (
    <div className={styles.layout}>
      <Head>
        <title>Dashboard| EDC</title>
      </Head>
      <h1 className={styles.h1}>Dashboard</h1>

      {sellers.map((seller) => (
        <div key={seller.id} className={styles.sellerCard}>
          <div className={styles.seller}>
            <h2>Seller ID: {seller.id}</h2>

            <div className={styles.oneField}>
              <p>
                <b>Id</b>
              </p>
              <p>{seller.id}</p>
            </div>
            <div className={styles.oneField}>
              <p>
                <b>Name</b>
              </p>
              <p>{seller.name}</p>
            </div>
            <div className={styles.oneField}>
              <p>
                <b>E-mail</b>
              </p>
              <p>{seller.email}</p>
            </div>
            <div className={styles.oneField}>
              <p>
                <b>Phone</b>
              </p>
              <p>{seller.phone}</p>
            </div>
            <div className={styles.oneField}>
              <p>
                <b>Price</b>
              </p>
              <p>{seller.price}</p>
            </div>
            <div className={styles.oneField}>
              <p>
                <b>Zip Code</b>
              </p>
              <p>{seller.zipCode}</p>
            </div>
            <div className={styles.oneField}>
              <p>
                <b>Size</b>
              </p>
              <p>{seller.size}</p>
            </div>
            <div className={styles.oneField}>
              <p>
                <b>Estate Type</b>
              </p>
              <p>{seller.estateType}</p>
            </div>
          </div>
          <div className={styles.buyersCard}>
            <h2>Buyers</h2>
            {seller.buyers.map((buyer) => (
              <div key={buyer.id} className={styles.oneBuyer}>
                <div className={styles.oneField}>
                  <p>
                    <b>Buyer ID</b>
                  </p>
                  <p>{buyer.id}</p>
                </div>
                <div className={styles.oneField}>
                  <p>
                    <b>Max Price</b>
                  </p>
                  <p>{buyer.maxPrice}</p>
                </div>
                <div className={styles.oneField}>
                  <p>
                    <b>Max Size</b>
                  </p>
                  <p>{buyer.minSize}</p>
                </div>
                <div className={styles.oneField}>
                  <p>
                    <b>Adults</b>
                  </p>
                  <p>{buyer.adults}</p>
                </div>
                <div className={styles.oneField}>
                  <p>
                    <b>Children</b>
                  </p>
                  <p>{buyer.children}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
