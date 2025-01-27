import ApiClient from "@/config/axios"
import { Todo } from "@/models/todo"
import { useQuery } from "@tanstack/react-query"

export interface Auth {
    token: string
    baseURL: string
}

const getTodos = async ({ token, baseURL }: Auth) => {

    const url = 'todo/user'

    const instance = await ApiClient({ token, baseURL })

    const todos: Todo[] = await instance.get(url).then(res => res.data)

    return todos

}


const useTodos = ({ token, baseURL }: Auth) => useQuery({
    queryKey: ['todos', { token }],
    queryFn: () => getTodos({ token, baseURL }),
    enabled: !!token
})

export default useTodos