/* eslint-disable prettier/prettier */
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";
import React from "react";
import { View, Text, Image } from "react-native";

const RideCard = ({
  ride: {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 12,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_latitude},${destination_longitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            style={{
              width: 80,
              height: 90,
              borderRadius: 10,
            }}
          />
          <View
            style={{
              marginHorizontal: 20,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image source={icons.to} style={{ width: 20, height: 20 }} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "JakartaMedium",
                }}
                numberOfLines={1}
              >
                {origin_address}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image source={icons.point} style={{ width: 20, height: 20 }} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "JakartaMedium",
                }}
                numberOfLines={1}
              >
                {destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 20,
            backgroundColor: "#E0E0E0", // Adjust to your general color
            borderRadius: 10,
            padding: 12,
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "JakartaMedium",
                color: "#A0A0A0",
              }}
            >
              Date & Time
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "JakartaMedium",
                color: "#A0A0A0",
              }}
            >
              {formatDate(created_at)}, {formatTime(ride_time)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "JakartaMedium",
                color: "#A0A0A0",
              }}
            >
              Driver
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "JakartaMedium",
                color: "#A0A0A0",
              }}
            >
              {driver.first_name}, {driver.last_name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "JakartaMedium",
                color: "#A0A0A0",
              }}
            >
              Car Seats
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "JakartaMedium",
                color: "#A0A0A0",
              }}
            >
              {driver.car_seats}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "JakartaMedium",
                color: "#A0A0A0",
              }}
            >
              Payment Status
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "JakartaMedium",
                color: payment_status === "paid" ? "green" : "red",
              }}
            >
              {payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
