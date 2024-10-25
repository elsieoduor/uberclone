/* eslint-disable prettier/prettier */
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignupPress = async () => {
    // Handle sign-up logic here
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ position: "relative", width: "100%", height: 258 }}>
          <Image
            source={images.signUpCar}
            style={{ zIndex: 0, width: "100%", height: 250 }}
          />
          <Text
            style={{
              fontFamily: "Jakarta-SemiBold",
              fontSize: 24,
              color: "black",
              position: "absolute",
              bottom: 20,
              left: 20,
            }}
          >
            Create Your Account
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignupPress}
            className="mt-6"
          />
        </View>
      </View>

      {/* OAuth */}
      <OAuth />

      <Link
        href="/(auth)/sign-in"
        style={{ marginTop: 20, textAlign: "center" }}
      >
        <Text style={{ textDecorationLine: "underline", fontSize: 16 }}>
          Already have an account?{" "}
        </Text>
        <Text style={{ color: "#0286FF", fontSize: 16 }}>Login</Text>
      </Link>

      {/* Verification Modal */}
    </ScrollView>
  );
};

export default SignUp;
