import React, { useState } from "react";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroes";
import { Link } from "react-router-dom";

export default function RQHeroes() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const { mutate: addHero } = useAddSuperHeroData();

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

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };
  return (
    <>
      <h2>Super Heroes</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
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
