import getPotentialBuyers from "../api/buyers";

export async function getServerSideProps(context) {
  const { zipCode, price, size } = context.query;

  const buyerProfiles = await getPotentialBuyers({ zipCode, price, size });

  return {
    props: {
      buyerProfiles,
    },
  };
}
