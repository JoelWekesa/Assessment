import ListTodos from '@/components/todos/list-todos';
import {cookies} from 'next/headers';
import React from 'react';

const Home = async () => {
	let token: string | undefined;

	const cookieStore = await cookies();

	token = await cookieStore.get('sil-token')?.value;

	const fetchData = async () => {
		const url = process.env.NEXT_PUBLIC_APP_URL + 'api/auth';

		try {
			const response = await fetch(url, {
				method: 'GET',
			});

			if (response.ok) {
				const data = await response.json();
				return data.token;
			}
		} catch (error) {
			console.error(error);
		}
	};

	if (!token) {
		token = await fetchData();
	}

	return (
		<div className='flex flex-col gap-2'>
			<ListTodos token={token || ''} />
		</div>
	);
};

export default Home;
