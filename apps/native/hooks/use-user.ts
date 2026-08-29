import {
  useQuery,
  useMutation,
  useQueryClient,
  skipToken,
} from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { getProfile, saveProfile } from "@/lib/api-client";
import type { ProfileFormValues } from "@calorie-ai-app/auth/schemas/index";
import { useRouter } from "expo-router";
import { useToast } from "heroui-native";

export const useUser = () => {
  const { data: session } = authClient.useSession();

  return useQuery({
    queryKey: ["profile"],
    queryFn: session?.user
      ? async () => {
          const result = await getProfile();
          return result.profile;
        }
      : skipToken,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      return saveProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            queryClient.clear();
            router.replace("/");
          },
          onError: ({ error }) => {
            toast.show({
              label: error.name,
              description: error.message,
              actionLabel: "X",
              onActionPress: ({ hide }) => {
                hide();
              },
            });
          },
        },
      });
    },
  });
}
