import styles from "@/pages/Home.module.css";
import { estateTypes } from "@/data/estateTypes";

export default function IndexForm() {
  return (
    <form action="/buyers" method="GET" className={styles.form}>
      <label>
        <span className={styles.label}>Price</span>
        <input name="price" required />
      </label>
      <label>
        <span className={styles.label}>Size</span>
        <input name="size" required type="number" />
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
      </label>
      <button className={styles.button}>Find potential buyers</button>
    </form>
  );
}
