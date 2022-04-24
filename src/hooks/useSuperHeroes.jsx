import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios-utils";

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes",
    () => {
      // return axios.get("http://localhost:4000/superheroes"); //try to change to url to see error case
      return request({ url: "/superheroes" });
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

const addSuperHero = (hero) => {
  // return axios.post('http://localhost:4000/superheroes', hero)
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: data => {
    //   /** Query Invalidation Start */
    //   // queryClient.invalidateQueries('super-heroes')
    //   /** Query Invalidation End */

    //   /** Handling Mutation Response Start */
    // queryClient.setQueryData('super-heroes', oldQueryData => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data]
    //   }
    // })
    //   /** Handling Mutation Response Start */
    // },
    /**Optimistic Update Start */
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return { previousHeroData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
    /**Optimistic Update End */
  });
};
