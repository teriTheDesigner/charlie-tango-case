import styles from "@/pages/Home.module.css";
import { estateTypes } from "@/data/estateTypes";
import { useState } from "react";

export default function IndexForm() {
  const [selectedEstateType, setSelectedEstateType] = useState("1");
  return (
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
        <select name="estateType" required>
          {estateTypes.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        {/* _________________________1_ */}

        {/* <select
          name="estateType"
          required
          value={selectedEstateType}
          onChange={(e) => setSelectedEstateType(e.target.value)}
        >
          <option value="" disabled selected>
            Select estate type
          </option>
          {estateTypes.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select> */}
      </label>
      <button className={styles.button}>Find potential buyers</button>
    </form>
  );
}
