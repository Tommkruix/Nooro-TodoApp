"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Body from "@layouts/Body";
import Breadcrumb from "@components/Breadcrumb";
import Button from "@components/Button";
import Input from "@components/Input";
import Alert from "@components/Alert";
import { TodoSchema } from "@schema/todo";
import TodoService from "@api/services/TodoService";
import LogService from "@api/services/LogService";

const TodoAdd: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const initialValues = {
    title: "",
    color: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError(null);
    try {
      await TodoService.createTodo({
        title: values.title,
        color: values.color,
        completed: false,
      });
      router.push("/");
    } catch (error: unknown) {
      LogService.error("Failed to create todo:", error as never);
      setError("Failed to create todo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Body>
      <Breadcrumb
        leftContent={
          <span>
            <Image
              src="/arrow-left.svg"
              alt="Arrow icon"
              width={24}
              height={24}
            />
          </span>
        }
        leftLink="/"
        extraStyles="pb-4 pt-24"
      />
      <br />
      {error && <Alert message={error} type="error" />}
      <Formik
        initialValues={initialValues}
        validationSchema={TodoSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, submitForm }) => (
          <Form>
            <div className="mb-4">
              <Field name="title">
                {({
                  field,
                }: {
                  field: {
                    name: string;
                    value: string;
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
                  };
                }) => (
                  <Input
                    title="Title"
                    name={field.name}
                    label="Ex. Brush your teeth"
                    icon="fas fa-tasks"
                    value={field.value}
                    onChange={(e) => setFieldValue("title", e.target.value)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <br />
            <div className="mb-4">
              <Field name="color">
                {({
                  field,
                }: {
                  field: {
                    name: string;
                    value: string;
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
                  };
                }) => (
                  <Input
                    title="Task color"
                    type="color"
                    name={field.name}
                    label="Task"
                    value={field.value}
                    onChange={(e) => setFieldValue("color", e.target.value)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="color"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <br />
            <Button
              text={isSubmitting ? "Adding..." : "Add Task"}
              iconSrc="/plus.svg"
              iconAlt="Add task plus"
              iconHeight={16}
              iconWidth={16}
              onClick={() => submitForm()}
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </Body>
  );
};

export default TodoAdd;
