"use client";
import { Button, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import schema from "@/app/api/cashflow/transaction/schema";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof schema>;

interface Props {
  searchParams: { openingId: string };
}

const Page = ({ searchParams: { openingId } }: Props) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => {
    register("openingId");
    setValue("openingId", Number(openingId));
  }, []);
  const onSubmit = (data: FieldValues) => {
    if (isValid) {
      fetch("/api/cashflow/transaction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type for your request
        },
        body: JSON.stringify(data), // Convert your data to JSON format
      })
        .then((response) => {
          if (response.status == 404) throw Error("Opening Doesn't Exist");
          return response.json();
        })
        .then((data: FormData) => {
          schema.parse(data);
          router.push(`/cashflow?openingId=${data.openingId}`);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <article>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-11 flex flex-col gap-8"
      >
        <div className="flex gap-8">
          <Input
            {...register("name")}
            type="text"
            label="Runner Name"
            placeholder="Enter runner name"
            isInvalid={errors.name && true}
            errorMessage={errors.name && errors.name.message?.toString()}
          />
          <Input
            {...register("email")}
            type="email"
            label="Runner Email"
            placeholder="Enter runner email"
            isInvalid={errors.email && true}
            errorMessage={errors.email && errors.email.message?.toString()}
          />
        </div>
        <Input
          {...register("amount")}
          type="number"
          label="Tranasaction Amount"
          placeholder="Enter transaction amount"
          isInvalid={errors.amount && true}
          errorMessage={errors.amount && errors.amount.message?.toString()}
        />
        <Textarea
          {...register("description")}
          type="textarea"
          label="Transaction Description"
          placeholder="Enter transaction description"
          isInvalid={errors.description && true}
          errorMessage={
            errors.description && errors.description.message?.toString()
          }
        />
        <RadioGroup
          {...register("type")}
          defaultValue="cash-out"
          label="Transaction Type"
        >
          <Radio value="cash-in">Cash in</Radio>
          <Radio value="cash-out">Cash out</Radio>
        </RadioGroup>
        <Input
          {...register("image")}
          type="text"
          label="Image"
          placeholder="Enter transaction image"
          isInvalid={errors.image && true}
          errorMessage={errors.image && errors.image.message?.toString()}
        />

        <div className="flex justify-end">
          <Button type="submit" className="rouded-md" color="primary">
            Add
          </Button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </article>
  );
};

export default Page;
