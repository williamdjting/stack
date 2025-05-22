'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '../../../app/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const supabase = createClient();
const ITEMS_PER_PAGE = 6;

export default function Notes() {
	const [notes, setNotes] = useState<any[]>([]); // Use a specific type if you have one for notes
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data, error } = await supabase.from('notes2').select();
				if (error) throw error;
				setNotes(data);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleCreateResume = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		router.push('/applications/new');
	};

	const pageCount = Math.ceil(notes.length / ITEMS_PER_PAGE);
	const paginatedData = notes.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	);

	const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
	const handleNext = () => setPage((prev) => Math.min(prev + 1, pageCount));

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	// if (notes.length === 0) return <p>No applications found.</p>;

	return (
		<div className="bg-skyblue min-h-screen flex flex-col justify-center pr-10 pl-10 pt-0">
			<div className="flex items-center justify-between">
				<p className="font-semibold text-left text-3xl pb-5">
					Job Applications
				</p>
				<Button
					variant="skyblue"
					className="mb-5"
					onClick={handleCreateResume}
				>
					Create a new Job Application
				</Button>
			</div>
			<Card className="p-5 min-h-[620px]">
				<Table>
					<TableCaption>A list of your recent job applications.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-1/5 text-center text-gray-950">
								Job Title
							</TableHead>
							<TableHead className="w-1/5 text-center text-gray-950">
								Company
							</TableHead>
							<TableHead className="w-1/5 text-center text-gray-950">
								Resume
							</TableHead>
							<TableHead className="w-1/5 text-center text-gray-950">
								Cover Letter
							</TableHead>
							<TableHead className="text-right text-gray-950">
								Application Link
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedData.map((note) => (
							<TableRow key={note.id}>
								<TableCell className="text-gray-700 font-normal">
									{note.jobtitle}
								</TableCell>
								<TableCell className="text-gray-700 font-normal">
									{note.company}
								</TableCell>
								<TableCell className="text-gray-700 font-normal">
									{note.resume}
								</TableCell>
								<TableCell className="text-gray-700 font-normal">
									{note.coverletter}
								</TableCell>
								<TableCell className="text-gray-700 font-normal text-right">
									<Button
										variant="ghost"
										asChild
									>
										<Link
											className="text-lg"
											href={`/applications/${note.id}`}
										>
											Go to Application {note.id}
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow></TableRow>
					</TableFooter>
				</Table>
			</Card>
			<Pagination className="mt-5">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={handlePrev}
							aria-disabled={page === 1}
						/>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink isActive>{page}</PaginationLink>
					</PaginationItem>
					{page < pageCount && (
						<>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink>{pageCount}</PaginationLink>
							</PaginationItem>
						</>
					)}
					<PaginationItem>
						<PaginationNext
							onClick={handleNext}
							aria-disabled={page === pageCount}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}

// // from here
// // youtube1: https://www.youtube.com/watch?v=Gz9bvYybaws&
// // youtube2: https://www.youtube.com/watch?v=VjohMDwjty4
// // using notes1 table

// // "use client";

// // import { createClient } from '@/app/lib/supabase/server';
// import { supabase } from '@/app/lib/supabase/server';

// // import supabase from "@/app/lib/supabase/server";

// import React, { createContext, useState, useEffect, useContext } from "react";
// import styles from "./dashboard.module.css";
// // import styles from "./ui-dashboard.module.css";

// import Link from "next/link";

// export default async function Notes() {

//   useEffect(() => {

//     // const supabase = createClient();
//   const { data: notes } = await supabase.from("notes2").select();
//   // const [data, setData] = useState([]);

//   // return <pre>{JSON.stringify(notes, null, 2)}</pre>
//   if (!notes) {
//     return <p>No posts found.</p>
//   }

//   if (!id) {
//     console.log("this ID does not exist");
//     return;
//   }

//   const fetchData = async () => {
//     const { data, error } = await supabase
//       .from("notes2")
//       .select() // Adjust this to your table and query

//   };

//   fetchData();

//   }, []);

//   return (
//     <>
//   <div className={styles.jobcontainer}>
//     <h1>Jobs you have applied for</h1>
//     <table>
//       <thead>
//         <tr>
//           <th>Job Title</th>
//           <th>Company</th>
//           <th>Job Link</th>
//           <th>Resume</th>
//           <th>Cover Letter</th>
//           <th>Application</th>
//         </tr>
//       </thead>
//       <tbody>
//         {notes.map((note, index) => (
//           <tr className={index ? styles.tbody : ""} key={index}>
//             <td className={styles.tcol}>{note.jobtitle}</td>
//             <td className={styles.tcol}>{note.company}</td>
//             <td className={styles.tcol}>
//               <a href={note.joblink}>{note.joblink}</a>
//             </td>
//             <td className={styles.tcol}>{note.resume}</td>
//             <td className={styles.tcol}>{note.coverletter}</td>
//             <td className={styles.tcol}>
//               <Link href={`/applications/${note.id}`}>
//                 Go to Application {note.id}
//               </Link>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </>

//   );
// }
