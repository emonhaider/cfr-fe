import { CFRItem } from "../model/cfr-item";

const baseUrl = 'http://localhost:3000';

export async function getCfrItemsByParent(parentId: string): Promise<CFRItem[]> {
  console.log(`getting cfr item with id: ${parentId}`);
  const url = new URL(`${baseUrl}/cfr?parentId=${parentId}`);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  return response.json();
}