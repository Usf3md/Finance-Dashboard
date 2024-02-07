import React from "react";

interface Props {
  params: { id: string };
}

const Page = ({ params }: Props) => {
  return <div>edit opening {params.id}</div>;
};

export default Page;
