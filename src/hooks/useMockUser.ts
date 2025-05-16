import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// useMockUser hook, amely egy felhasználó adatait lekéri a JSONPlaceholder API-ból
export function useMockUser(userId: number) {
  return useQuery({
    queryKey: ["mock-user", userId],
    queryFn: async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      return res.data;
    },
    placeholderData: { name: "Placeholde User" },
  });
}
