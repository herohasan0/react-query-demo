import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const fetchSuperHero2 = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

// export const useSuperHeroData = (heroId) => {
//   return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
// };

///// OR

export const useSuperHeroData = (heroId) => {
  console.log("heroid", heroId);
  const queryClient = useQueryClient();
  console.log("queryClient", queryClient);

  return useQuery(["super-hero", heroId], fetchSuperHero2, {
    initialData: () => {
      console.log("heroid***2", heroId);

      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      console.log("we already have", hero);
      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};
