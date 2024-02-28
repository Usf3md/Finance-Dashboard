import AddTransactionForm from "../../components/AddTransactionForm";

interface Props {
  searchParams: { openingId: string };
}

const Page = ({ searchParams: { openingId } }: Props) => {
  return (
    <article>
      <AddTransactionForm openingId={openingId} />
    </article>
  );
};

export default Page;
