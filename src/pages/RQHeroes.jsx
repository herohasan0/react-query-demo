import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export default function RQHeroes() {
  const { isLoading, data } = useQuery("super-heroes", () => {
    return axios.get("http://localhost:4000/superheroes");
  });

  if (isLoading) {
    return <div>LOADING</div>;
  }
  return (
    <>
      <h2>Super Heroes</h2>
      {data?.data.map((hero) => (
        <div>{hero.name}</div>
      ))}
    </>
  );
}
