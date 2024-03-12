import PageContent from "./components/PageContent";

interface Props {
  searchParams: { min_date: string; max_date: string };
}

const Page = ({ searchParams }: Props) => {
  return (
    <PageContent
      min_date={searchParams.min_date}
      max_date={searchParams.max_date}
    />
  );
};

export default Page;
