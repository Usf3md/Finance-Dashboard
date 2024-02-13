"use client";
import {
  Button,
  Chip,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
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

const runners = ["Ahmed Sayed", "Abdelrahman", "Yara", "Fatma", "Attia", "Ali"];
const detials = [
  "DIRECT MATERIAL PAYMENT",
  "INDIRECT MATERIAL PAYMENT",
  "OFFICE RENT PAYMENT",
  "KITCHEN RENT  PAYMENT",
  "Utility PAYMENT",
  "Salaries & wages PAYMENT",
  "Other expenses PAYMENT",
  "B2C REVENUE (SYSTEM ORDERS) - CASH IN",
  "B2B REVENUE- CASH IN",
  "SHORTENING RESALE- CASHIN",
  "OTHER CASH IN",
];
const Page = ({ searchParams: { openingId } }: Props) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
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
          setIsSubmitting(false);
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
          <Select
            label="Runner Name"
            placeholder="Select runner name"
            {...register("name")}
            isRequired
          >
            {runners.map((runner) => (
              <SelectItem key={runner} value={runner}>
                {runner}
              </SelectItem>
            ))}
          </Select>
          <Input
            {...register("email")}
            type="email"
            label="Runner Email"
            placeholder="Enter runner email"
            isInvalid={errors.email && true}
            errorMessage={errors.email && errors.email.message?.toString()}
          />
        </div>
        <div className="flex gap-8">
          <Input
            {...register("amount")}
            type="number"
            label="Tranasaction Amount"
            placeholder="Enter transaction amount"
            isInvalid={errors.amount && true}
            errorMessage={errors.amount && errors.amount.message?.toString()}
          />
          <Select
            label="Transaction Details"
            placeholder="Select Detail"
            {...register("detail")}
            isRequired
          >
            {detials.map((detail) => (
              <SelectItem key={detail} value={detail}>
                {detail}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Input
          {...register("date")}
          type="date"
          label="Transaction Date"
          placeholder="Enter Transaction date"
          isInvalid={errors.date && true}
          errorMessage={errors.date && errors.date.message?.toString()}
        />
        <Textarea
          {...register("note")}
          type="textarea"
          label="Transaction Notes"
          placeholder="Enter transaction notes"
          isInvalid={errors.note && true}
          errorMessage={errors.note && errors.note.message?.toString()}
        />
        <RadioGroup
          {...register("type")}
          defaultValue="cash-out"
          label="Transaction Type"
        >
          <Radio value="cash-in" color="success">
            <Chip className=" text-xs" variant="bordered" color="success">
              CASH IN
            </Chip>
          </Radio>
          <Radio value="cash-out" color="danger">
            <Chip className=" text-xs" variant="bordered" color="danger">
              CASH OUT
            </Chip>
          </Radio>
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
          <Button
            type="submit"
            className="rouded-md"
            color="primary"
            isDisabled={isSubmitting}
          >
            Add
          </Button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </article>
  );
};

export default Page;
