import axios from "axios";
import {Todo} from "../models/Todo";

class TodoService {
    getTodos = async (): Promise<Todo[]> =>  {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        return response.data
    }
}

export const todoService = new TodoService()