import { skipToken, useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { getWeeklyInsights } from "@/lib/api-client";

export const useWeeklyInsights = () => {
  const { data: session } = authClient.useSession();

  return useQuery({
    queryKey: ["weekly-insights"],
    queryFn: session?.user.id ? getWeeklyInsights : skipToken,
  });
};
