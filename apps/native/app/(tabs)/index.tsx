import { View, Text } from "react-native";
import { BUTTON_LABEL_CLASSNAME, Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const HomePage = () => {
  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <View>
      <Text>HomePage</Text>
      <Button onPress={handleLogout}>
        <Text className={BUTTON_LABEL_CLASSNAME}>Logout</Text>
      </Button>
    </View>
  );
};

export default HomePage;
