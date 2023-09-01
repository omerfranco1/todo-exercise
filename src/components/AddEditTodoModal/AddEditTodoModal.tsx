import React, {ChangeEvent, useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import { Modal } from "react-bootstrap";
import {Todo} from "../../models/Todo";

type AddEditTodoModalProps = {
    saveTodoClicked: (itemToSave: Todo) => void
    closeClicked: () => void
    show: boolean
    todo: Todo | null
}
export const AddEditTodoModal = ({saveTodoClicked, closeClicked, show, todo}: AddEditTodoModalProps) => {
    const [status, setStatus] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string>("")
    const { t } = useTranslation();

    useEffect(() => {
        if (status) {
            setError("")
        }
    }, [status])

    useEffect(() => {
        if (todo) {
            setStatus(todo.completed ? t('completed') : t('inProgress'))
            setTitle(todo.title)
        } else {
            setTitle("")
            setStatus("")
        }
    }, [todo, t])

    const saveTodo = () => {
        setError("")
        if (!title) {
            setError(t('titleError'))
            return
        }

        if (!status) {
            setError(t('statusError'))
            return
        }

        if (todo) {
            todo.title = title
            todo.completed = status === t('completed')
            closeClicked()
        } else {
            saveTodoClicked(new Todo(title, status === t('completed')))
            clearFields()
        }
    }

    const clearFields = () => {
        setTitle("")
        setStatus("")
    }

    const titleChanges = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)

        if (e.target.value) {
            setError("")
        }
    }

    const closeModal = () => {
        clearFields()
        setError("")
        closeClicked()
    }

    return (
        <Modal show={show}>
            <Modal.Header closeButton onHide={closeModal}>
                <Modal.Title>{t('addTodo')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex mb-2">
                    <input value={title} className="form-control rounded ms-auto" placeholder="title" onChange={titleChanges} />
                </div>
                <div className="d-flex">
                    <div className="btn-group">
                        <button className="btn dropdown-toggle" type="button" id="defaultDropdown"
                                data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                            {status || "Status"}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                            <li onClick={() => setStatus(t('inProgress'))}><div className="dropdown-item">{t('inProgress')}</div></li>
                            <li onClick={() => setStatus(t('completed'))}><div className="dropdown-item">{t('completed')}</div></li>
                        </ul>
                    </div>
                </div>
                {error && <div className="alert alert-danger">
                    {error}
                </div>}
            </Modal.Body>
             <Modal.Footer className="modal-footer">
                 <button type="button" className="btn btn-secondary" onClick={closeModal}>{t('close')}</button>
                 <button type="button" className="btn btn-primary" onClick={saveTodo}>{t('save')}</button>
             </Modal.Footer>
        </Modal>)
}
