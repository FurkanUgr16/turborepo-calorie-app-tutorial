import { useMutation } from "@tanstack/react-query";
import { analyzeMeal, uriToBase64 } from "@/lib/api-client";

export const useAnalyzeMeal = () => {
  return useMutation({
    mutationFn: async (data: { uri: string }) => {
      const base64 = await uriToBase64(data.uri);
      const result = await analyzeMeal({
        image_base64: base64,
        media_type: "image/jpeg",
      });
      return result;
    },
  });
};
