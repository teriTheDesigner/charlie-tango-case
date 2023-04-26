import { useState } from "react";
import { generateBuyerProfiles } from "@/data/buyerProfiles";

export default function BuyersPage({ initialProfiles }) {
  const [profiles, setProfiles] = useState(initialProfiles);

  const handleSubmit = (e) => {
    e.preventDefault();
    const zipCode = e.target.zipCode.value;
    const price = e.target.price.value;
    const size = e.target.size.value;

    const newProfiles = generateBuyerProfiles({ zipCode, price, size });
    setProfiles(newProfiles);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="zipCode">Zip Code:</label>
        <input type="number" name="zipCode" required />

        <label htmlFor="price">Price:</label>
        <input type="number" name="price" required />

        <label htmlFor="size">Size:</label>
        <input type="number" name="size" required />

        <button type="submit">Search</button>
      </form>
      <div>
        {profiles.map((profile) => (
          <div key={profile.id}>
            <h3>{profile.description}</h3>
            <p>Takeover date: {profile.takeoverDate}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { zipCode, price, size } = context.query;
  const initialProfiles = generateBuyerProfiles({ zipCode, price, size });

  return {
    props: {
      initialProfiles,
    },
  };
}
