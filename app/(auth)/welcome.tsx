import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

import "../../global.css"

const { width } = Dimensions.get("window");

const Home = () => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (isLastSlide) {
      router.replace("/(auth)/sign-up");
    } else {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">SKIP</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={onboarding}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ width }}
            className="flex items-center justify-center p-5"
          >
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        )}
      />

      <View className="flex flex-row justify-center items-center mb-5">
        {onboarding.map((_, index) => (
          <View
            key={index}
            className={`w-[32px] h-[4px] mx-1 rounded-full ${
              index === activeIndex ? "bg-[#0286FF]" : "bg-[#E2E8F0]"
            }`}
          />
        ))}
      </View>

      <CustomButton
        title={isLastSlide ? "GET STARTED" : "NEXT"}
        onPress={handleNext}
        className="w-80 mt-5 mb-5"
      />
    </SafeAreaView>
  );
};

export default Home;