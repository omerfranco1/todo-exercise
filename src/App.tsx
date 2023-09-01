import React, {ChangeEvent, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import TodoList from "./components/TodoList/TodoList";
import {todoService} from "./services/todoService";
import {Todo} from "./models/Todo";
import {AddEditTodoModal} from "./components/AddEditTodoModal/AddEditTodoModal";

function App() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [filter, setFilter] = useState<string>("")
    const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false)
    const [editedTodo, setEditedTodo] = useState<Todo | null>(null)
    const { t } = useTranslation();

    useEffect( () => {
        const getTodos = async () => {
            const response = await todoService.getTodos()
            setTodos(response)
        }
        getTodos()
    }, [])

    const searchChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }

    const deleteTodo = (itemToDelete: Todo) => {
        setTodos(todos.filter((item) => item !== itemToDelete))
    }

    const addTodo = (itemToAdd: Todo) => {
        todos.push(itemToAdd)
        closeAddModal()
    }

    const editTodo = (itemToEdit: Todo) => {
        setShowAddEditModal(true)
        setEditedTodo(itemToEdit)
    }

    const closeAddModal = () => {
        setEditedTodo(null)
        setShowAddEditModal(false)
    }

  return (
    <div className="container">
        <AddEditTodoModal saveTodoClicked={addTodo} closeClicked={closeAddModal} show={showAddEditModal} todo={editedTodo} />
        <h5 className="mb-2 mt-1">{t('listHeader')}</h5>
        <div className="d-flex mb-2">
            <div>
                <button className="btn btn-primary" onClick={() => setShowAddEditModal(true)}>{t('addTodo')}</button>
            </div>
            <div className="ms-auto">
                <input type="search" className="form-control rounded ms-auto" placeholder={t('search')} aria-label={t('search')}
                       aria-describedby="search-addon" onChange={searchChanged} />
            </div>
        </div>
        <TodoList todos={todos} filter={filter} deleteTodo={deleteTodo} editTodo={editTodo} />
    </div>
  );
}

export default App;
