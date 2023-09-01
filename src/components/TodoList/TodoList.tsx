import React from 'react';
import {Todo} from "../../models/Todo";
import TodoItem from "../TodoItem/TodoItem";

type TodoListProps = {
    todos: Todo[]
    filter: string
    deleteTodo: (itemToDelete: Todo) => void
    editTodo: (itemToEdit: Todo) => void
}

export const TodoList = ({todos, filter, deleteTodo, editTodo}: TodoListProps) => {
  return (
    <ul className="list-group">
        {todos.map((item: Todo, index: number) =>  {
            if (filter && !item.title.includes(filter)) {
                return null
            }
            return (<TodoItem item={item} deleteTodo={deleteTodo} editTodo={editTodo} key={index} />)})
        }
    </ul>
  );
}

export default TodoList;
