// pages/applications/[id].js

// source: https://chatgpt.com/c/7b3706ca-945c-43ab-863e-a8d355b62d6f

import { useRouter } from 'next/router';

// Mock data - need to rewrite to pull from supabase
const items = [
  { id: '1', name: 'Item 1', description: 'Description for Item 1' },
  { id: '2', name: 'Item 2', description: 'Description for Item 2' },
  { id: '3', name: 'Item 3', description: 'Description for Item 3' },
];

const ItemPage = ({ item }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Item: {item.name}</h1>
      <p>Description: {item.description}</p>
    </div>
  );
};

export async function getStaticPaths() {
  // Generate paths for each item using mock data
  const paths = items.map(item => ({
    params: { id: item.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Find the item based on the id from the mock data
  const item = items.find(item => item.id === params.id);

  return { props: { item } };
}

export default ItemPage;




// API based

// import { useRouter } from 'next/router';

// const ItemPage = ({ item }) => {
//   const router = useRouter();
//   const { id } = router.query;

//   return (
//     <div>
//       <h1>Item: {item.name}</h1>
//       <p>Description: {item.description}</p>
//     </div>
//   );
// };

// export async function getStaticPaths() {
//   // Fetch your items data from an API or database
//   const res = await fetch('https://api.example.com/items');
//   const items = await res.json();

//   // Generate paths for each item
//   const paths = items.map(item => ({
//     params: { id: item.id.toString() },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   // Fetch data for a specific item based on the id
//   const res = await fetch(`https://api.example.com/items/${params.id}`);
//   const item = await res.json();

//   return { props: { item } };
// }

// export default ItemPage;
