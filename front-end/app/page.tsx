"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import Button from "@components/Button";
import Body from "@layouts/Body";
import Alert from "@components/Alert";
import Breadcrumb from "@components/Breadcrumb";
import TodoItem from "@components/TodoItem";
import EmptyTodo from "@components/EmptyTodo";
import TodoService from "@api/services/TodoService";
import LogService from "@api/services/LogService";
import { TodoType } from "@utils/types";

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await TodoService.getTodos();
        setTodos(todos);
      } catch (error: unknown) {
        LogService.error("Failed to fetch todos:", error as never);
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <Body>
      <Link href="/todo">
        <Button
          text="Create Task"
          iconSrc="/plus.svg"
          iconAlt="Create task plus"
          iconHeight={16}
          iconWidth={16}
          extraStyles="-mt-4 mb-24"
        />
      </Link>
      <Breadcrumb
        leftContent={
          <div className="flex items-center">
            <span className="text-deep_blue text-body font-bold mr-2">
              Tasks
            </span>
            <div className="bg-deep_grey w-7 h-6 pt-0.5 text-sm text-center rounded-full ">
              {todos.length}
            </div>
          </div>
        }
        leftLink={"/"}
        rightContent={
          <div className="flex items-center">
            <span className="text-purple text-body font-bold mr-2">
              Completed
            </span>
            <div className="bg-deep_grey w-14 h-6 pt-0.5 text-sm text-center rounded-full ">
              {todos.filter((todo) => todo.completed).length} of {todos.length}
            </div>
          </div>
        }
        rightLink={"/"}
      />
      <div
        className={`bg-deep_grey h-0.5 mt-8 ${
          todos.length > 0 ? "mb-14" : "mb-24"
        }`}
      />
      {error && <Alert message={error} type="error" />}
      <br/>
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : todos.length > 0 ? (
        todos.map((todo) => (
          <React.Fragment key={todo.id}>
            <TodoItem
              key={todo.id}
              id={todo.id as number}
              checked={todo.completed}
              content={todo.title}
              onDelete={async (id: number) => {
                await TodoService.deleteTodo(id);
                setTodos(todos.filter((todo) => todo.id && todo.id !== id));
              }}
              onToggle={async (id: number) => {
                const updatedTodo = await TodoService.updateTodo(id, {
                  completed: !todo.completed,
                });
                setTodos(
                  todos.map((todo) =>
                    todo.id === Number(id) ? updatedTodo : todo
                  )
                );
              }}
            />
            <br />
          </React.Fragment>
        ))
      ) : (
        <EmptyTodo />
      )}
    </Body>
  );
}
