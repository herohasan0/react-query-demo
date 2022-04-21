import React from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroes";
import { Link } from "react-router-dom";

export default function RQHeroes() {
  const onSuccess = (data) => {
    console.log("Perform side effects after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effects after encountering error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  if (isLoading || isFetching) {
    return <div>LOADING</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <h2>Super Heroes</h2>
      <button onClick={refetch}>fetch again</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))} */}
      {/* {data?.data.map((hero) => (
        <div>{hero}</div>
        // <div>{hero.name}</div>  you don't need .name anymore. Bc you already return just names.
      ))} */}
    </>
  );
}
