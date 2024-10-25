/* eslint-disable prettier/prettier */
import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return { backgroundColor: "gray", borderColor: "transparent" };
    case "danger":
      return { backgroundColor: "red", borderColor: "transparent" };
    case "success":
      return { backgroundColor: "green", borderColor: "transparent" };
    case "outline":
      return {
        backgroundColor: "transparent",
        borderColor: "#d1d5db",
        borderWidth: 0.5,
      };
    default:
      return { backgroundColor: "#0286FF", borderColor: "transparent" };
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return { color: "black" };
    case "secondary":
      return { color: "lightgray" };
    case "danger":
      return { color: "lightcoral" };
    case "success":
      return { color: "lightgreen" };
    default:
      return { color: "white" };
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  style,
  ...props
}: ButtonProps) => {
  const bgStyle = getBgVariantStyle(bgVariant);
  const textStyle = getTextVariantStyle(textVariant);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        borderRadius: 9999, 
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "rgba(0, 0, 0, 0.7)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        ...bgStyle,
        ...style,
      }}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          ...textStyle,
        }}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
