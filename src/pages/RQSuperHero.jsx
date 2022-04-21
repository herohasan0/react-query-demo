import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/userSuperHeroData";

export default function RQSuperHero() {
  const { heroId } = useParams();
  const { isLoading, data, isError, error, isFetching } =
    useSuperHeroData(heroId);

  if (isLoading || isFetching) {
    return <div>LOADING</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
}
