/* eslint-disable prettier/prettier */
import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 20,
        }}
      >
        <Text
          style={{ color: "black", fontSize: 16, fontFamily: "Jakarta-Bold" }}
        >
          Skip
        </Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={(index) => {
          setActiveIndex(index);
        }}
        dot={
          <View
            style={{
              width: 32,
              height: 4,
              marginHorizontal: 4,
              backgroundColor: "#E2E8F0",
              borderRadius: 2,
            }}
          />
        }
        activeDot={
          <View
            style={{
              width: 32,
              height: 4,
              marginHorizontal: 4,
              backgroundColor: "#0286FF",
              borderRadius: 2,
            }}
          />
        }
      >
        {onboarding.map((item, index) => (
          <View
            key={index}
            style={{flex: 1,justifyContent: "center",alignItems: "center",}}
          >
            <Image
              source={item.image}
              style={{ width: "100%", height: 300 }}
              resizeMode="contain"
            />
            <Text
              style={{color: "black",fontSize: 24,fontFamily: "Jakarta-ExtraBold", textAlign: "center",}}
            >
              {item.title}
            </Text>
            <Text
              style={{fontSize: 18, fontFamily: "Jakarta-SemiBold", 
                textAlign: "center",color: "#858585",marginHorizontal: 40,marginTop: 12,}}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>isLastSlide? router.replace("/(auth)/sign-up"): swiperRef.current?.scrollBy(1)}
        style={{width: "91.67%",marginTop: 20,}}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
