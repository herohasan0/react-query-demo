import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SuperHeroes() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/superheroes").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <>
      <h2>Super Heroes</h2>
      {data.map((hero) => (
        <div>{hero.name}</div>
      ))}
    </>
  );
}
