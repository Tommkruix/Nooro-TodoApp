import db from "../utils/db";
import { TodoType } from "../types";

export const getTodos = async (): Promise<TodoType[]> => {
  return await db.todo.findMany();
};

export const getTodo = async (id: number): Promise<TodoType | null> => {
  return await db.todo.findUnique({
    where: { id },
  });
};

export const createTodo = async (
  todo: Omit<TodoType, "id">
): Promise<TodoType> => {
  return await db.todo.create({
    data: todo,
  });
};

export const updateTodo = async (
  id: number,
  todo: Partial<Omit<TodoType, "id">>
): Promise<TodoType> => {
  return await db.todo.update({
    where: { id },
    data: todo,
  });
};

export const deleteTodo = async (id: number): Promise<TodoType> => {
  return await db.todo.delete({
    where: { id },
  });
};
