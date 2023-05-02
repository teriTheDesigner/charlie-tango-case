import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import styles from "./Contact.module.css";
// import { createClient } from "@supabase/supabase-js";
export default function Contact() {
  const formEl = useRef(null);
  const { query } = useRouter();
  function submitted(e) {
    e.preventDefault();
    // console.log({ buyers });
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      price: query.price,
      estateType: query.estate_type,
      size: query.size,
      zipCode: query.zipcode,
      buyers: buyers,
    };
    fetch("/api/addSellers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log("data is", data));
  }

  // console.log({ query });

  const [buyers, setBuyers] = useState([]);
  useEffect(() => {
    if (query.id) {
      setBuyers(query.id.map(JSON.parse));
    }
  }, [query.id]);

  console.log("buyers:", buyers);

  function deleteBuyer(id) {
    setBuyers((prev) => prev.filter((buyer) => buyer.id !== id));
  }
  // _______________________1_
  return (
    <>
      <Head>
        <title>Select buyer | EDC</title>
      </Head>
      <div className={`wrapper`}>
        <h1 className={styles.headline}>Potential buyers</h1>
        <div className={styles.content}>
          <h2>Buyers</h2>
          <div className={"page-section"}>
            <ul className={"card_wrapper"}>
              {/* <li> */}
              {/* {buyers.map((buyer) => (
              // <li key={buyer.id} className={styles.buyerItem}>
              //   <button onClick={() => deleteBuyer(buyer.id)}>X</button>
              //   <pre className={styles.buyerContent}>
              //     <code>{JSON.stringify(buyer, null, 2)}</code>
              //   </pre>
              // </li>
              //_______________________________1__
              <li key={buyer.id} className={styles.buyerItem}>
                <div>
                  <p className={styles.buyerID}>ID: {buyer.id}</p>
                  <p className={styles.buyerEmail}>Email: {buyer.email}</p>
                </div>
              </li>
              //_______________________________1__
            ))} */}

              {buyers.map((buyer) => (
                <div key={buyer.id} className={styles.card}>
                  <button onClick={() => deleteBuyer(buyer.id)}>X</button>
                  <div className={styles.card_content}>
                    <p>Buyer&apos;s ID</p>
                    <p>{buyer.id}</p>
                  </div>
                  {/* <div className={styles.card_content}>
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
                  <p className={styles.icon}>Min Size</p>
                  <p>{buyer.minSize}</p>
                </div>
                <div className={styles.card_content}>
                  <p>Max Price</p>
                  <p>{buyer.maxPrice}</p>
                </div> */}
                  <div>
                    <p>Description</p>
                    <p>{buyer.description}</p>
                  </div>
                </div>
              ))}
            </ul>

            <form
              className={styles.contactForm}
              ref={formEl}
              onSubmit={submitted}
            >
              <label>
                Name
                <input type="text" name="name" required />
              </label>
              <label>
                Email Address
                <input type="email" name="email" required />
              </label>
              <label>
                Phone Number
                <input type="tel" name="phone" required />
              </label>
              <label>
                <input type="checkbox" name="offersAndInfo" />
                Yes please, EDC may contact me with offers and information
                related to the real estate market.
              </label>
              <button type="submit">Contact buyers</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
