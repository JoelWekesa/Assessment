import React, {FC} from 'react';
import AddTodo from './add-todo';
import ListTodos from './list-todos';

const TodosComponent: FC<{token: string}> = ({token}) => {
	return (
		<div className='flex flex-col gap-2 px-4 py-2'>
			{JSON.stringify(process.env.NEXT_PUBLIC_API_URL)}
			<AddTodo token={token} />
			<ListTodos token={token} />
		</div>
	);
};

export default TodosComponent;
