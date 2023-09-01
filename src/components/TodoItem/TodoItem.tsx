import React from 'react';
import {Todo} from "../../models/Todo";
import {PencilIcon, TrashIcon} from "@primer/octicons-react";
import { useTranslation } from 'react-i18next';
import "./TodoItem.css"

type TodoItemProps = {
    item: Todo
    deleteTodo: (itemToDelete: Todo) => void
    editTodo: (itemToEdit: Todo) => void
}

export const TodoItem = ({item, deleteTodo, editTodo}: TodoItemProps) => {
    const { t } = useTranslation();

  return (
      <li className="list-group-item list-group-item-action d-flex">
          <div className="p-1">{item.title}</div>
          <div className={"p-1 " + (item.completed ? 'text-success' : 'text-info')}>{item.completed ? t('completed') : t('inProgress')}</div>
          <div className="p-1 ms-auto d-flex">
              <div className="cursor-pointer" onClick={() => editTodo(item)}>
                <PencilIcon size={24} />
              </div>
              <div className="ms-3 cursor-pointer" onClick={() => deleteTodo(item)}>
                <TrashIcon size={24} />
              </div>
          </div>
      </li>
  );
}

export default TodoItem;
