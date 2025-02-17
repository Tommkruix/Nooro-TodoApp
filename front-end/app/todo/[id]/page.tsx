"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

import Body from "@layouts/Body";
import Breadcrumb from "@components/Breadcrumb";
import Button from "@components/Button";
import Input from "@components/Input";
import Alert from "@components/Alert";
import TodoService from "@api/services/TodoService";
import LogService from "@api/services/LogService";

const TodoEdit: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [todo, setTodo] = useState<{ title: string; color: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todo = await TodoService.getTodo(Number(id));
        setTodo({
          title: todo.title,
          color: todo.color,
        });
      } catch (error: unknown) {
        LogService.error("Failed to fetch todo:", error as never);
        setError("Failed to fetch todo");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id]);

  const initialValues = {
    title: todo?.title || "",
    color: todo?.color || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    color: Yup.string().required("Color is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError(null);
    try {
      await TodoService.updateTodo(Number(id), {
        title: values.title,
        color: values.color,
      });
      router.push("/");
    } catch (error: unknown) {
      LogService.error("Failed to update todo:", error as never);
      setError("Failed to update todo");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
              text={isSubmitting ? "Saving..." : "Save"}
              iconSrc="/mdi_check-bold.svg"
              iconAlt="Save task plus"
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

export default TodoEdit;
