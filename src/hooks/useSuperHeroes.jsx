import { useQuery } from "react-query";
import axios from "axios";

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes",
    () => {
      return axios.get("http://localhost:4000/superheroes"); //try to change to url to see error case
    },
    {
      // cacheTime: 5000, // how many mseconds after cached will be deleted. default 5min
      // staleTime: 30000, //default 0
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // enabled: false,
      onSuccess: onSuccess, // or just use onSuccess
      onError: onError, // or just use onError
      //   select: (data) => {
      //     const justHeroNames = data.data.map((hero) => hero.name);
      //     return justHeroNames;
      //   },
    }
  );
};
