import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Buyers.module.css";
import { useState, useEffect } from "react";
import { estateTypes } from "@/data/estateTypes";
// _______________________________1_
import { generateBuyerProfiles } from "@/data/buyerProfiles";
// _______________________________1_

export default function Buyers() {
  const { query } = useRouter();
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  // _______________1_
  const router = useRouter();
  // _______________1_
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

  // _______________________________1_

  useEffect(() => {
    if (query.price && query.size && query.estateType && query.zipCode) {
      setBuyers(
        generateBuyerProfiles({
          price: parseInt(query.price),
          size: parseInt(query.size),
          estateType: query.estateType,
          zipCode: parseInt(query.zipCode),
        })
      );
    }
  }, [query]);

  function handleContactClick() {
    const selectedBuyers = buyers.filter((buyer) => buyer.selected);
    const serializedBuyers = selectedBuyers.map((buyer) =>
      JSON.stringify(buyer)
    );
    const queryParams = new URLSearchParams({
      id: serializedBuyers,
    });

    router().push(`/contact?${queryParams}`);
  }

  // _______________________________1_
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
      <div className={`wrapper`}>
        <h1 className={styles.headline}>Potential buyers</h1>
        <form action="/contact" method="GET" className={styles.cardPageLayout}>
          <input name="price" value={query.price} type="hidden" />
          <input name="estate_type" value={query.estateType} type="hidden" />
          <input name="size" value={query.size} type="hidden" />
          <input name="zipcode" value={query.zipCode} type="hidden" />
          {buyers.map((buyer) => (
            <div key={buyer.id} className={styles.card}>
              <input
                type="checkbox"
                name="id"
                value={JSON.stringify(buyer)}
                className={styles.checkbox}
              ></input>
              <div className={styles.card_content}>
                <p>Buyer&apos;s ID</p>
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
          <button onClick={handleContactClick}>Continue</button>
        </form>
      </div>
    </>
  );
}
