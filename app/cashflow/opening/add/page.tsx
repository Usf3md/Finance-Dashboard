"use client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import schema, { Opening } from "@/app/api/cashflow/opening/schema";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTodaysDate } from "@/services/utils";

const Page = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Opening>({ resolver: zodResolver(schema) });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = (data: FieldValues) => {
    setIsSubmitting(true);
    if (isValid) {
      fetch("/api/cashflow/opening/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type for your request
        },
        body: JSON.stringify(data), // Convert your data to JSON format
      })
        .then((response) => response.json())
        .then((data) => {
          router.push(`/cashflow?openingId=${data.id}`);
        })
        .catch((err) => {
          setError(err.message);
          setIsSubmitting(false);
        });
    }
  };
  return (
    <article>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Input
            {...register("date")}
            type="date"
            label="Opening Date"
            placeholder="Enter opening date"
            isInvalid={errors.date && true}
            errorMessage={errors.date && errors.date.message?.toString()}
            radius="sm"
            defaultValue={getTodaysDate()}
          />
          <Input
            {...register("balance")}
            type="number"
            label="Opening Balance"
            placeholder="Enter opening balance"
            isInvalid={errors.balance && true}
            errorMessage={errors.balance && errors.balance.message?.toString()}
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
            Add
          </Button>
        </div>
      </form>
      {error && <p className=" text-danger">{error}</p>}
    </article>
  );
};

export default Page;
