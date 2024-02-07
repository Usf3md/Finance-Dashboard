import React from "react";

interface Props {
  params: { id: string };
}

const Page = ({ params }: Props) => {
  return <div>edit transaction {params.id}</div>;
};

export default Page;
