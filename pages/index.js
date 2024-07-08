// pages/index.js

import Link from 'next/link';

// Mock data
const items = [
  { id: '1', name: 'Item 1', description: 'Description for Item 1' },
  { id: '2', name: 'Item 2', description: 'Description for Item 2' },
  { id: '3', name: 'Item 3', description: 'Description for Item 3' },
];

const Home = () => {
  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Link href={`/items/${item.id}`}>
              <a>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  // Using mock data directly
  return { props: { items } };
}

export default Home;











// API based 

// import Link from 'next/link';

// const Home = ({ items }) => {
//   return (
//     <div>
//       <h1>Items List</h1>
//       <ul>
//         {items.map(item => (
//           <li key={item.id}>
//             <Link href={`/items/${item.id}`}>
//               <a>{item.name}</a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export async function getStaticProps() {
//   // Fetch your items data from an API or database
//   const res = await fetch('https://api.example.com/items');
//   const items = await res.json();

//   return { props: { items } };
// }

// export default Home;
