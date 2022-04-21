import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SuperHeroes() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes") //try to change to url to see error case
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
