import express from "express";
import type { Request, Response } from "express";
import { validationResult } from "express-validator";

import * as TodoService from "../services/todo";
import { handleValidationErrors } from "../middlewares/validationMiddleware";
import {
  createTodoValidationRules,
  updateTodoValidationRules,
} from "../utils/constants";

const todoController = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
todoController.get("/", async (_req: Request, res: Response) => {
  try {
    const todos = await TodoService.getTodos();
    res.status(200).json(todos);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: A task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Task not found
 */
todoController.get(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    try {
      const todo = await TodoService.getTodo(id);
      if (!todo) {
        res.status(404).json({ message: "Not found" });
        return;
      }
      res.status(200).json(todo);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid input
 */
todoController.post(
  "/",
  [...createTodoValidationRules(), handleValidationErrors],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const todo = await TodoService.createTodo(req.body);
      res.status(201).json(todo);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
todoController.put(
  "/:id",
  [...updateTodoValidationRules(), handleValidationErrors],
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const updatedTodo = await TodoService.updateTodo(id, req.body);
      res.status(200).json(updatedTodo);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
todoController.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    await TodoService.deleteTodo(id);
    res.status(204).send();
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default todoController;
