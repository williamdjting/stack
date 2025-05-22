'use client';

// pages/applications/[id].js

// source: https://chatgpt.com/c/7b3706ca-945c-43ab-863e-a8d355b62d6f

import React, { useState, useEffect } from 'react';

import { useParams } from 'next/navigation';

import { GetStaticProps } from 'next';

import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

// import { supabase } from '../../../../lib/supabase/server';
import { createClient } from '../../../../app/supabase/client';

import { executeAI } from '../../../../lib/openai/executeai';

//const ItemPage = ({}) => {

const supabase = createClient();

export default function IDPage() {
	const params = useParams();

	const id = params.id;

	const [newData, setNewData] = useState({
		jobtitle: '',
		company: '',
		jobdescription: '',
		resumeexperience: '',
		resumeskills: '',
		resumeprojects: '',
		resumeeducation: '',
		coverlettercontactinfo: '',
		coverletterstylerequest: '',
	});

	const [error, setError] = useState<string | null>(null);

	// need to add a handleSubmit to update the DB with the new updated data and then redirect back home

	useEffect(() => {
		// Fetch data at specific ID on component mount
		if (!id) {
			console.log('this ID does not exist');
			console.log(id);
			return;
		}
		const fetchData = async () => {
			const { data, error } = await supabase
				.from('notes2')
				.select() // Adjust this to your table and query
				.eq('id', id) // Filter where 'id' equals the passed id
				.single(); // Expect only a single row (returns an error if multiple)

			if (error) {
				console.error(error);
				console.log('line 44');
				setError(error.message); // Set error if there's an issue
			} else {
				setNewData(data);
			}
		};

		fetchData();

		console.log('line 92', id);
	}, [id]);

	// Handler to update form data
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setNewData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// on Submit need to update the Supabase database with the updated entered value and then execute the Submit button action (either create resume or create cover letter)
	// Handler to submit form data to Supabase
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('this page is updating existing applicationS!!!!');

		// Insert new data to Supabase
		try {
			const { data, error } = await supabase
				.from('notes2')
				.update({
					jobtitle: newData.jobtitle,
					company: newData.company,
					jobdescription: newData.jobdescription,
					resumeexperience: newData.resumeexperience,
					resumeskills: newData.resumeskills,
					resumeprojects: newData.resumeprojects,
					resumeeducation: newData.resumeeducation,
					coverlettercontactinfo: newData.coverlettercontactinfo,
					coverletterstylerequest: newData.coverletterstylerequest,
				})
				.eq('id', id)
				.select();

			// updates the DB with new entry then sets data in useState to be the same data
			if (data && Array.isArray(data) && data.length > 0) {
				setNewData(data[0]); // ✅ now you're passing an object
			} else if (error) {
				console.error(error);
				setError(error.message); // Set error if there's an issue
			}

			// this redirect should occur but i think after the executeAI function is called?
			// if (error) {
			//   console.error("Insert error:", error);
			// } else {
			//   console.log("Insert successful - printing data", data);
			//   setRedirectTo("/projects");
			// }
			console.log('line 135 outside executeAI');

			// this component calls executeAI which calls openAI API
			try {
				console.log('line 140 inside executeAI');
				// use the updated data in notes2 held in useState as passed in param to executeAI
				const aiResponse = await executeAI(newData); // pass in newData object to executeAI as param
				console.log('AI Response:', aiResponse);

				// try and catch block here to call Aida's docx file generator function,
				// this docx has to be called after executeAI is successful - not before or in parallel
				// if (aiResponse) {}
				// next docx into line 154 if statement
				try {
					console.log('line 143 inside docx');

					console.log('Docx response');

					if (!aiResponse || Object.keys(aiResponse).length === 0) {
						throw new Error('Received empty or invalid data from OpenAI');
					} else {
						console.log('Starting to generate docx');

						const response = await fetch('/api/generate-resume-docx', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								aiResponse,
							}),
						});

						if (response.ok) {
							console.log('Resume response is okay');
							const blob = await response.blob();

							// upload the blob to Supabase Storage
							// reference: https://chatgpt.com/share/676e6af6-a3bc-8008-b027-83faad107989

							let filePathStorageID = id;
							let filePath = `test/resume/Resume${filePathStorageID}`;
							const { data, error } = await supabase.storage
								.from('files') // Replace with your bucket name
								.upload(filePath, blob, {
									contentType:
										'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
								});
							console.log('outside upload the blob execution');

							if (error) {
								console.error('Error uploading blob to Supabase:', error);
							} else {
								console.log('Blob uploaded successfully:', data);
							}

							// local download code

							const url = window.URL.createObjectURL(blob);
							const a = document.createElement('a');
							a.href = url;
							// need to change the download docx file name
							a.download = 'Resume.docx';
							document.body.appendChild(a);
							a.click();
							a.remove();
						} else {
							console.error(
								'Failed to generate resume document',
								response.statusText
							);
						}

						const response2 = await fetch('/api/generate-cl-docx', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								aiResponse,
							}),
						});

						console.log('starting to generate cl');

						if (response2.ok) {
							console.log('Cover Letter response is okay');
							const blob = await response2.blob();

							// upload the blob to Supabase Storage
							// reference: https://chatgpt.com/share/676e6af6-a3bc-8008-b027-83faad107989

							let filePathStorageID2 = id;
							let filePath2 = `test/coverletter/CoverLetter${filePathStorageID2}`;
							const { data, error } = await supabase.storage
								.from('files') // Replace with your bucket name
								.upload(filePath2, blob, {
									contentType:
										'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
								});
							console.log('outside upload the blob execution');

							if (error) {
								console.error('Error uploading blob to Supabase:', error);
							} else {
								console.log('Blob uploaded successfully:', data);
							}

							const url = window.URL.createObjectURL(blob);
							const a = document.createElement('a');
							a.href = url;
							// need to change the download docx file name
							a.download = 'CoverLetter.docx';
							document.body.appendChild(a);
							a.click();
							a.remove();
						} else {
							console.error(
								'Failed to generate cl document',
								response2.statusText
							);
						}
					}
				} catch (error) {
					console.error('Error calling docx file generator', error);
				}
			} catch (error) {
				console.error('Error calling executeAI:', error);
			}
		} catch (error) {
			console.error('Error calling supabase:', error);
		}
	};

	return (
		<div className="bg-skyblue min-h-screen flex flex-col items-center justify-center p-10">
			<Card className="w-full max-w-[1200px] p-10">
				<CardHeader>
					<div className="flex">
						<Link
							className="inline-block flex"
							href={`/dashboard`}
						>
							<ArrowLeft />
							<p className="pb-5">Go Back</p>
						</Link>
					</div>
					<CardTitle>Application Page {id}</CardTitle>
					<CardDescription>Edit existing job applications. </CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div>
							Job Title:
							<Textarea
								style={{ color: 'black' }}
								name="jobtitle"
								defaultValue={newData.jobtitle}
								placeholder={newData.jobtitle}
								onChange={handleChange}
								rows={5}
								cols={25}
								required
							/>
						</div>
						<div>
							Company:
							<Textarea
								style={{ color: 'black' }}
								name="company"
								defaultValue={newData.company}
								placeholder={newData.company}
								onChange={handleChange}
								rows={5}
								cols={25}
								required
							/>
						</div>
						<div>
							Job Description:
							<Textarea
								style={{ color: 'black' }}
								name="jobdescription"
								defaultValue={newData.jobdescription}
								placeholder={newData.jobdescription}
								rows={5}
								cols={25}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							Resume - Experience:
							<Textarea
								style={{ color: 'black' }}
								name="resumeexperience"
								defaultValue={newData.resumeexperience}
								placeholder={newData.resumeexperience}
								rows={5}
								cols={25}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							Resume - Projects:
							<Textarea
								style={{ color: 'black' }}
								name="resumeprojects"
								defaultValue={newData.resumeprojects}
								placeholder={newData.resumeprojects}
								rows={5}
								cols={25}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							Resume - Skills:
							<Textarea
								style={{ color: 'black' }}
								name="resumeskills"
								defaultValue={newData.resumeskills}
								placeholder={newData.resumeskills}
								rows={5}
								cols={25}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							Resume - Education:
							<Textarea
								style={{ color: 'black' }}
								name="resumeeducation"
								defaultValue={newData.resumeeducation}
								placeholder={newData.resumeeducation}
								onChange={handleChange}
								rows={5}
								cols={25}
								required
							/>
						</div>
						<div>
							Cover Letter - Contact Info:
							<Textarea
								style={{ color: 'black' }}
								name="coverlettercontactinfo"
								defaultValue={newData.coverlettercontactinfo}
								placeholder={newData.coverlettercontactinfo}
								rows={5}
								cols={25}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							Cover Letter - Style Request:
							<Textarea
								style={{ color: 'black' }}
								name="coverletterstylerequest"
								defaultValue={newData.coverletterstylerequest}
								placeholder={newData.coverletterstylerequest}
								rows={5}
								cols={25}
								onChange={handleChange}
								required
							/>
						</div>
						<Button
							className="w-full mt-5"
							variant="skyblue"
							type="submit"
							value="Create Resume and Cover Letter"
						>
							Create Resume and Cover Letter
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

// getStaticPaths and getStaticProps from
// https://chatgpt.com/c/66e63bd1-ce70-8008-927d-c1caf88c1c0c

export async function getStaticPaths() {
	// Fetch available IDs from Supabase if needed
	const { data: items } = await supabase.from('notes2').select('id');

	if (!items) {
		throw new Error('Failed to fetch items from Supabase');
	}

	const paths = items.map((item) => ({
		params: { id: item.id.toString() }, // Generate paths dynamically
	}));

	return { paths, fallback: false };
}

// export async function getStaticProps({ params }) {
export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params?.id || typeof params.id !== 'string') {
		return { notFound: true };
	}
	// Fetch the item from Supabase for the given 'id'
	const { data: item, error } = await supabase
		.from('notes2')
		.select()
		.eq('id', params.id)
		.single();

	return {
		props: { item },
		// revalidate: 10, // Optional: Revalidate data every 10 seconds
	};
};
