import getPotentialBuyers from "../../api/buyers";

export default async function handler(req, res) {
  const { zipCode, price, size } = req.query;
  const buyerProfiles = await getPotentialBuyers({ zipCode, price, size });

  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  return res.status(200).json(buyerProfiles);
}
