import styles from "@/pages/Home.module.css";
import { estateTypes } from "@/data/estateTypes";
import { useRouter } from "next/router";

export default function IndexForm() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const query = {
      price: formData.get("price"),
      size: formData.get("size"),
      zipCode: formData.get("zipCode"),
      estateType: formData.get("estateType"),
    };

    router.push({
      pathname: "/buyers",
      query,
    });
  };

  // action="/buyers" method="GET"

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
      </label>
      <button className={styles.button}>Find potential buyers</button>
    </form>
  );
}
