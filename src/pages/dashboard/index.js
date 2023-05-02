import Head from "next/head";
import { createClient } from "@supabase/supabase-js";

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
    <>
      <Head>
        <title>Dashboard| EDC</title>
      </Head>
      <ul>
        {sellers.map((seller) => (
          <li key={seller.id}>{seller.name}</li>
        ))}
      </ul>
    </>
  );
}
