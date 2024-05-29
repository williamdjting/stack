import React from 'react';


interface PageProps {
  submittedData: {
    projectid: string;
    collection: string;
    distribution: string;
    quality: string;
    split: string;
    bias: string;
    influence: string;
    outcome: string;
  };
}

export function Testing({ submittedData }: PageProps) {
  return (
    <div>
      {submittedData && (
        <div>
          <li><strong>ProjectID:</strong> {submittedData.projectid}</li>
          <li><strong>Collection:</strong> {submittedData.collection}</li>
          <li><strong>Distribution:</strong> {submittedData.distribution}</li>
          <li><strong>Quality:</strong> {submittedData.quality}</li>
          <li><strong>Split:</strong> {submittedData.split}</li>
          <li><strong>Bias:</strong> {submittedData.bias}</li>
          <li><strong>Influence:</strong> {submittedData.influence}</li>
          <li><strong>Outcome:</strong> {submittedData.outcome}</li>
        </div>
      )}
    </div>
  );
}

// const Page: React.FC<PageProps> = ({ submittedData }) => {
//   if (!submittedData) {
//     return null; // Or you can return a loading indicator
//   }

//   return (
//     <>
//       <h2>Submitted Data:</h2>
//       <ul>
//         <li><strong>ProjectID:</strong> {submittedData.projectid}</li>
//         <li><strong>Collection:</strong> {submittedData.collection}</li>
//         <li><strong>Distribution:</strong> {submittedData.distribution}</li>
//         <li><strong>Quality:</strong> {submittedData.quality}</li>
//         <li><strong>Split:</strong> {submittedData.split}</li>
//         <li><strong>Bias:</strong> {submittedData.bias}</li>
//         <li><strong>Influence:</strong> {submittedData.influence}</li>
//         <li><strong>Outcome:</strong> {submittedData.outcome}</li>
//       </ul>
//     </>
//   );
// }

// export default Page;