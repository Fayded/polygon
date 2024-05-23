type Todo = {
	id: number;
	text: string;
	isCompleted: boolean;
}

type TodosProps = {
	todos: Todo[];
	handleCompleted: (id: number) => void;
	handleDelete: (id: number) => void;	
}

export default function Todos(props: TodosProps) {
	return (
		<>
			{props.todos.map((todo: Todo) => (
				<li key={todo.id} className="flex justify-between p-4 border-b items-center">
					<span onClick={() => props.handleCompleted(todo.id)} className={todo.isCompleted ? 'line-through cursor-pointer' : 'cursor-pointer'}>{todo.text}</span>
					<button onClick={() => props.handleDelete(todo.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
				</li> 
			))}
		</>
	);
}
