/* eslint-disable prettier/prettier */
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { InputFieldProps } from "@/types/type";
import React from "react";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ marginVertical: 8, width: "100%" }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Jakarta-SemiBold",
              marginBottom: 12,
              ...labelStyle,
            }}
          >
            {label}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F3F4F6", // Equivalent to bg-neutral-100
              borderRadius: 999, // Fully rounded
              borderWidth: 1,
              borderColor: "#F3F4F6", // Neutral border color
              ...containerStyle,
            }}
          >
            {icon && (
              <Image
                source={icon}
                style={{ width: 24, height: 24, marginLeft: 16, ...iconStyle }} // Adjusted sizes
              />
            )}
            <TextInput
              style={{
                borderRadius: 999, // Fully rounded
                padding: 16,
                fontFamily: "Jakarta-SemiBold",
                fontSize: 15,
                flex: 1,
                textAlign: "left",
                ...inputStyle,
              }}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
