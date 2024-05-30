import { CFRItem, FileSignedUrl } from "../model/cfr-item";

// TODO: Read from env using Vite 
// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://k6gwuu18d0.execute-api.us-east-1.amazonaws.com/prod';

export async function getDownloadSignedUrl(): Promise<FileSignedUrl> {
  const url = new URL(`${baseUrl}/cfr/actions/get-download-signed-url`);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  return response.json();
}
export async function getCfrItemsByParent(parentId: string): Promise<CFRItem[]> {
  console.log(`getting cfr item with id: ${parentId}`);
  const url = new URL(`${baseUrl}/cfr?parentId=${parentId}`);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  return response.json();
}