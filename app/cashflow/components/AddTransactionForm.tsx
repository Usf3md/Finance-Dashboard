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
import { useContext, useEffect, useState } from "react";
import schema, { Transaction } from "@/app/api/cashflow/transaction/schema";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionDetail } from "@/app/api/cashflow/transaction-detail/schema";
import { getTodaysDate } from "@/services/date";
import { TransactionDetailService } from "@/services/clients";
import RunnerContext from "@/app/contexts/RunnerContext";

interface Props {
  openingId: string;
}

const AddTransactionForm = ({ openingId }: Props) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<Transaction>({ resolver: zodResolver(schema) });

  const [details, setDetails] = useState<TransactionDetail[]>([]);
  const { runner, setRunner } = useContext(RunnerContext);
  useEffect(() => {
    TransactionDetailService.getAll(true).then((res) => {
      setDetails(res.data);
    });
  }, []);
  useEffect(() => {
    register("opening");
    setValue("opening", Number(openingId));
    register("runner");
    setValue("runner", runner?.id!);
  }, [openingId, runner?.id!]);

  const onSubmit = (data: FieldValues) => {
    if (data.transaction_detail)
      data.transaction_detail = Number.parseInt(data.transaction_detail);
    console.log(data);
    setIsSubmitting(true);
    if (isValid) {
      console.log("valid");
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
        .then((data: Transaction) => {
          schema.parse(data);
          router.push(`/cashflow?openingId=${data.opening}`);
        })
        .catch((err) => {
          setError(err.message);
          setIsSubmitting(false);
        });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <Input
          {...register("amount")}
          type="number"
          label="Tranasaction Amount"
          placeholder="Enter transaction amount"
          isInvalid={errors.amount && true}
          errorMessage={errors.amount && errors.amount.message?.toString()}
          radius="sm"
        />
        <Select
          label="Transaction Details"
          placeholder="Select Detail"
          {...register("transaction_detail")}
          isRequired
          radius="sm"
        >
          {details.map((detail) => (
            <SelectItem key={detail.id!} value={detail.id!}>
              {detail.detail}
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
        radius="sm"
        defaultValue={getTodaysDate()}
      />
      <Textarea
        {...register("note")}
        type="textarea"
        label="Transaction Notes"
        placeholder="برجاء كتابه المنتجات بالتفصيل"
        isInvalid={errors.note && true}
        errorMessage={errors.note && errors.note.message?.toString()}
        radius="sm"
      />
      <RadioGroup
        {...register("transaction_type")}
        defaultValue=""
        label="Transaction Type"
      >
        {/* <Radio value="true" color="success">
          <Chip className=" text-xs" variant="bordered" color="success">
            CASH IN
          </Chip>
        </Radio> */}
        <Radio value="" color="danger">
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
        radius="sm"
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          className="rouded-md"
          color="primary"
          isDisabled={isSubmitting}
          radius="sm"
          onClick={() => {
            console.log(getValues());
            console.log(openingId);
          }}
        >
          Add
        </Button>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </form>
  );
};

export default AddTransactionForm;
