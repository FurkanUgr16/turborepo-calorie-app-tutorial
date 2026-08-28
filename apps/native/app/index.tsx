import { View, ActivityIndicator } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Redirect } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { getProfile } from "@/lib/api-client";

const Page = () => {
  const session = authClient.useSession();
  const [profileStatus, setProfileStatus] = useState<
    "loading" | "has-profile" | "no-profile" | "no-session"
  >("loading");
  const retryCount = useRef(0);
  const hasStoredSession = useRef(!!authClient.getCookie());

  useEffect(() => {
    if (session.isPending) return;

    if (!session.data?.user) {
      // On real devices, the server can briefly become unreachable after a restart
      // while the local auth cookie is still valid. In that case we keep trying
      // session restoration longer instead of treating it as a logout.
      const maxRetries = hasStoredSession.current ? 8 : 3;

      if (retryCount.current < maxRetries) {
        retryCount.current += 1;
        const timer = setTimeout(
          () => {
            session.refetch();
          },
          hasStoredSession.current
            ? 1500 * retryCount.current
            : 1000 * retryCount.current,
        );
        return () => clearTimeout(timer);
      }

      setProfileStatus("no-session");
      return;
    }

    retryCount.current = 0;
    hasStoredSession.current = true;

    getProfile()
      .then((result) => {
        setProfileStatus(result.profile ? "has-profile" : "no-profile");
      })
      .catch(() => {
        setProfileStatus("no-profile");
      });
  }, [session.data, session.isPending, session.error]);

  if (session.isPending || profileStatus === "loading") {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#2ab3b1" />
      </View>
    );
  }

  if (profileStatus === "no-session") {
    return <Redirect href="/onboarding-one" />;
  }

  if (profileStatus === "no-profile") {
    return <Redirect href="/onboarding-profile" />;
  }

  return <Redirect href="/(tabs)" />;
};

export default Page;
