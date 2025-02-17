import axiosInstance from "@api/axiosInstance";
import LogService from "@api/services/LogService";
import { TodoType } from "@utils/types";

const TODOS_ENDPOINT = "/tasks";

const TodoService = {
  async getTodos(): Promise<TodoType[]> {
    return this.request("get", TODOS_ENDPOINT);
  },

  async getTodo(id: number): Promise<TodoType> {
    return this.request("get", `${TODOS_ENDPOINT}/${id}`);
  },

  async createTodo(todo: Omit<TodoType, "id">): Promise<TodoType> {
    return this.request("post", TODOS_ENDPOINT, todo);
  },

  async updateTodo(
    id: number,
    todo: Partial<Omit<TodoType, "id">>
  ): Promise<TodoType> {
    return this.request("put", `${TODOS_ENDPOINT}/${id}`, todo);
  },

  async deleteTodo(id: number): Promise<void> {
    await this.request("delete", `${TODOS_ENDPOINT}/${id}`);
  },

  async request(
    method: "get" | "post" | "put" | "delete",
    url: string,
    data?: Partial<Omit<TodoType, "id">>
  ) {
    try {
      const response = await axiosInstance({ method, url, data });
      return response.data;
    } catch (error: unknown) {
      LogService.error(
        `Error during ${method.toUpperCase()} request to ${url}:`,
        error as never
      );
      throw error;
    }
  },
};

export default TodoService;
