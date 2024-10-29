/* eslint-disable prettier/prettier */
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    const trimmedEmail = form.email.trim();
    if (!isValidEmail(trimmedEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    console.log("Valid Email:", trimmedEmail);

    try {
      const signUpResponse = await signUp.create({
        emailAddress: trimmedEmail,
        password: form.password,
      });
      console.log("Sign up response:", JSON.stringify(signUpResponse, null, 2));

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      console.log("Prepared email verification for:", trimmedEmail);
      setVerification({ ...verification, state: "pending" });
    } catch (err) {
      console.error("Sign-up error:", JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0]?.longMessage || "An error occurred");
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded || verification.state !== "pending") return;

    console.log("Attempting to verify code:", verification.code);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      console.log(
        "Verification response:",
        JSON.stringify(completeSignUp, null, 2)
      );

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
        console.log("Verification successful, user activated.");
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
        console.warn("Verification not complete:", completeSignUp.status);
      }
    } catch (err) {
      console.error("Verification error:", JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        error: err.errors[0]?.longMessage || "An error occurred",
        state: "failed",
      });
      console.error("Detailed error:", JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        error: err.message || "An error occurred",
        state: "failed",
      });
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <View style={{ position: "relative", width: "100%", height: 250 }}>
          <Image
            source={images.signUpCar}
            style={{ width: "100%", height: 250, zIndex: 0 }}
          />
          <Text
            style={{
              fontSize: 24,
              color: "black",
              fontFamily: "JakartaSemiBold",
              position: "absolute",
              bottom: 5,
              left: 5,
            }}
          >
            Create Your Account
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            style={{ marginTop: 24 }}
          />
          <OAuth />
          <Link
            href="/sign-in"
            style={{ textAlign: "center", marginTop: 40, fontSize: 18 }}
          >
            Already have an account?{" "}
            <Text style={{ color: "#007bff" }}>Log In</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 28,
              borderRadius: 16,
              minHeight: 300,
            }}
          >
            <Text
              style={{
                fontFamily: "JakartaExtraBold",
                fontSize: 24,
                marginBottom: 8,
              }}
            >
              Verification
            </Text>
            <Text style={{ fontFamily: "Jakarta", marginBottom: 20 }}>
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              style={{ marginTop: 20, backgroundColor: "#28a745" }} // Success color
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View
            style={{
              backgroundColor: "white",
              padding: 28,
              borderRadius: 16,
              minHeight: 300,
            }}
          >
            <Image
              source={images.check}
              style={{
                width: 110,
                height: 110,
                alignSelf: "center",
                marginVertical: 20,
              }}
            />
            <Text
              style={{
                fontSize: 30,
                fontFamily: "JakartaBold",
                textAlign: "center",
              }}
            >
              Verified
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#a9a9a9",
                fontFamily: "Jakarta",
                textAlign: "center",
                marginTop: 8,
              }}
            >
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => router.push(`/(root)/(tabs)/home`)}
              style={{ marginTop: 20 }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
