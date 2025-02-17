import db from "../src/utils/db";
import { TodoType } from "../src/types";

const getTodos = (): Array<TodoType> => [
  {
    title: "Learn TypeScript",
    color: "#34C759",
    completed: false,
    created: new Date(),
    updated: new Date(),
  },
  {
    title: "Learn Prisma",
    color: "#FF9500",
    completed: false,
    created: new Date(),
    updated: new Date(),
  },
  {
    title: "Learn GraphQL",
    color: "#FF9500",
    completed: false,
    created: new Date(),
    updated: new Date(),
  },
];

const seed = async () => {
  await Promise.all(
    getTodos().map(async (todo) => {
      await db.todo.create({
        data: todo,
      });
    })
  );
};

seed()
  .then(() => {
    console.log("Seed complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
