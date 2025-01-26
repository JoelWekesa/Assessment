import TodosComponent from '@/components/todos';
import {cookies} from 'next/headers';

const Home = async () => {
	let token: string | undefined;

	const cookieStore = await cookies();

	token = await cookieStore.get('sil-token')?.value;

	const fetchData = async () => {
		const url = process.env.NEXT_PUBLIC_APP_URL + '/api/auth';

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

	const fetchMetrics = async () => {
		const url = process.env.NEXT_PUBLIC_APP_URL + '/api/metrics/pagevisits';
		try {
			await fetch(url, {
				method: 'GET',
			});
		} catch (error) {
			console.error(error);
		}
	};

	if (!token) {
		token = await fetchData();
	}

	await fetchMetrics();

	return (
		<>
			{JSON.stringify(process.env.NEXT_PUBLIC_API_URL)}
			<TodosComponent token={token || ''} />
		</>
	);
};

export default Home;
