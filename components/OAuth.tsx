/* eslint-disable prettier/prettier */
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
  };

  return (
    <View style={{ alignItems: "center", marginTop: 8 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginTop: 5,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "#E2E8F0" }} />
        <Text style={{ marginHorizontal: 8, fontSize: 18 }}>Or</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#E2E8F0" }} />
      </View>
      <CustomButton
        title="Log in with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={()=> (
          <Image
            source={icons.google} 
            resizeMode="contain"
            style={{ width: 20, height: 20, marginHorizontal: 8 }} 
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
