"use client";
import React, { useState } from "react";
import Authenticator from "@/services/auth/auth";
import { credentialsSchema, Credentials } from "../api/auth/schema";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Credentials>({ resolver: zodResolver(credentialsSchema) });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = (data: FieldValues) => {
    setIsSubmitting(true);
    if (isValid) {
      Authenticator.login(data as Credentials)
        .then((res) => {
          if (res) location.reload();
          else setIsSubmitting(false);
        })
        .catch((_) => setIsSubmitting(false));
    }
  };
  return (
    <article className="px-11 h-svh flex items-center justify-center">
      <div className="w-full md:w-3/4 lg:w-1/2   flex flex-col gap-2">
        <p className=" font-bold text-2xl">Log in</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-full border-1 shadow-sm border-content3 p-8 lg:p-11 rounded-md"
        >
          <div className="flex flex-col gap-8">
            <Input
              {...register("email")}
              type="Email"
              label="Opening Email"
              placeholder="Enter Email"
              isInvalid={errors.email && true}
              errorMessage={errors.email && errors.email.message?.toString()}
              radius="sm"
            />
            <Input
              {...register("password")}
              type="password"
              label="Password"
              placeholder="Enter Password"
              isInvalid={errors.password && true}
              errorMessage={
                errors.password && errors.password.message?.toString()
              }
              radius="sm"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="rouded-md"
              color="primary"
              isDisabled={isSubmitting}
              radius="sm"
            >
              Log in
            </Button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default LoginForm;
