import {
  useQueryClient,
  useQuery,
  useMutation,
  skipToken,
} from "@tanstack/react-query";
import { SaveMealRequest } from "@calorie-ai-app/auth/schemas/meal";
import {
  getMeals,
  saveMeal,
  getMealById,
  getMealsByDate,
  getMealsToday,
} from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { useToast } from "heroui-native";

export const useGetMeals = () => {
  const { data: session } = authClient.useSession();
  return useQuery({
    queryKey: ["meals"],
    queryFn: session?.user.id ? getMeals : skipToken,
  });
};

export const useGetMealById = (id: string) => {
  const { data: session } = authClient.useSession();
  return useQuery({
    queryKey: ["meal", id],
    queryFn:
      session?.user.id && id ? async () => await getMealById(id) : skipToken,
  });
};

export const useGetMealByDate = (date: string) => {
  const { data: session } = authClient.useSession();
  return useQuery({
    queryKey: ["meal", date],
    queryFn:
      session?.user.id && date
        ? async () => await getMealsByDate(date)
        : skipToken,
  });
};

export const useGetMealsToday = () => {
  const { data: session } = authClient.useSession();
  const today = new Date().toISOString().split("T")[0];
  return useQuery({
    queryKey: ["meals", "today"],
    queryFn: session?.user.id
      ? async () => await getMealsToday(today)
      : skipToken,
  });
};

export const useSaveMeal = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SaveMealRequest) => saveMeal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
    onError: (error) => {
      toast.show({
        label: error.name,
        description: error.message,
        variant: "danger",
        actionLabel: "X",
        onActionPress: ({ hide }) => hide(),
      });
    },
  });
};
