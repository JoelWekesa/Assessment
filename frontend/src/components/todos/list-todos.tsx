'use client';
import useTodos from '@/services/get-todos';
import React, {FC} from 'react';
import Loading from '../shared/loading';
import {Todo} from '@/models/todo';
import {Card, CardFooter, CardHeader, CardTitle} from '../ui/card';
import {Button} from '../ui/button';
import {Pen, Trash2} from 'lucide-react';

const ListTodos: FC<{token: string}> = ({token}) => {
	const {data: todos = [], isLoading} = useTodos({token});

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='p-2'>
			{todos.map((todo) => (
				<TodoComponent key={todo.id} todo={todo} />
			))}
		</div>
	);
};

const TodoComponent: FC<{todo: Todo}> = ({todo}) => {
	return (
		<Card className='w-full p-2'>
			<CardHeader>
				<CardTitle>{todo.title}</CardTitle>
			</CardHeader>
			<CardFooter className='flex justify-between'>
				<Button variant='outline' size='icon'>
					<Pen />
				</Button>
				<Button variant='destructive' size='icon'>
					<Trash2 />
				</Button>
			</CardFooter>
		</Card>
	);
};
export default ListTodos;
