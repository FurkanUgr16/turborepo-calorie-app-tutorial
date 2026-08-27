import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { getProfile, saveProfile } from "@/lib/api-client";
import type { ProfileFormValues } from "@calorie-ai-app/auth/schemas/index";

export function useUser() {
  const { data: session } = authClient.useSession();

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const result = await getProfile();
      return result.profile;
    },
    enabled: !!session?.user,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      return saveProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
