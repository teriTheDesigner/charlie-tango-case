import { generateBuyerProfiles } from "../data/buyerProfiles";

export default async function getPotentialBuyers({ zipCode, price, size }) {
  const buyerProfiles = generateBuyerProfiles({ zipCode, price, size });
  return buyerProfiles;
}
