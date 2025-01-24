'use client';
import {Todo} from '@/models/todo';
import useTodos from '@/services/get-todos';
import {Loader2, Pen, Trash2} from 'lucide-react';
import {FC, useState} from 'react';
import Loading from '../shared/loading';
import {Button} from '../ui/button';
import {Card, CardFooter, CardHeader, CardTitle} from '../ui/card';
import {Checkbox} from '../ui/checkbox';
import useUpdateTodo from '@/services/update';
import useDeleteTodo from '@/services/delete-todo';

const ListTodos: FC<{token: string}> = ({token}) => {
	const {data: todos = [], isLoading} = useTodos({token});

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			{todos.map((todo) => (
				<div className='py-1' key={todo.id}>
					<TodoComponent todo={todo} token={token} />
				</div>
			))}
		</div>
	);
};

const TodoComponent: FC<{todo: Todo; token: string}> = ({todo, token}) => {
	const [complete, setComplete] = useState(todo.completed);

	const {mutate: update, isPending} = useUpdateTodo();

	const {mutate: remove, isPending: isDeleting} = useDeleteTodo();

	const toggleCheck = () => {
		update({auth: {token}, data: {title: todo.title, id: todo.id, completed: !complete}});
		setComplete((complete) => !complete);
	};

	const deleteTodo = () => {
		remove({token, id: todo.id});
	};

	return (
		<Card className='w-full p-2'>
			<CardHeader>
				<CardTitle>
					<div className='flex flex-row justify-between'>
						<span className={`${todo.completed && 'text-decoration: line-through'}`}>{todo.title}</span>
						<div className='flex items-center space-x-2'>
							<Checkbox id='todo' checked={complete} onCheckedChange={toggleCheck} />
							<label
								htmlFor='todo'
								className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
								{isPending ? 'Updating...' : todo.completed ? 'Completed' : 'Mark as complete'}
							</label>
						</div>
					</div>
				</CardTitle>
			</CardHeader>
			<CardFooter className='flex mr-auto justify-end gap-2'>
				<Button variant='outline' size='icon'>
					<Pen />
				</Button>
				<Button variant='destructive' size='icon' onClick={deleteTodo}>
					{isDeleting ? <Loader2 className='animate-spin' /> : <Trash2 />}
				</Button>
			</CardFooter>
		</Card>
	);
};
export default ListTodos;
