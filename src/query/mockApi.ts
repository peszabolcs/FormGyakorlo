import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 500));
      return [
        { code: "BP", name: "Budapest" },
        { code: "DEB", name: "Debrecen" },
        { code: "SZEG", name: "Szeged" },
        { code: "GYOR", name: "Győr" },
      ];
    },
  });
};

export const useDamageTypes = () => {
  return useQuery({
    queryKey: ["damageTypes"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 500));
      return [
        { code: "SCREEN", name: "Képernyő törés" },
        { code: "WATER", name: "Beázás" },
        { code: "BATTERY", name: "Tönkrement akkumulátor" },
        { code: "THEFT", name: "Lopás" },
        { code: "OTHER", name: "Egyéb" },
      ];
    },
  });
};
