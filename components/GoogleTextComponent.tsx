import 'react-native-get-random-values';
import { GoogleInputProps } from "@/types/type";
import { Image, View , Text} from "react-native"
import { GooglePlacesAutocomplete} from "react-native-google-places-autocomplete"
import { icons } from "@/constants";
import { useRef } from 'react';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
    icon, initialLocation, containerStyle, textInputBackgroundColor, handlePress,
}: GoogleInputProps) => {
  const ref = useRef<any>(null);

  return (
    <View className={`h-13 flex-1 flex-row items-center justify-center relative z-50 rounded-3xl ${containerStyle} mb-1 mx-3`}>
        <GooglePlacesAutocomplete
        ref={ref}
        fetchDetails={true}
        placeholder="Search"
        debounce={200}
        enablePoweredByContainer={false}
        minLength={2}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          if (details?.geometry?.location) {
            handlePress({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: data.description,
            });
          }
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        onFail={(error) => console.error("Google Places Error:", error)}
        onNotFound={() => console.log("No results found")}
        listEmptyComponent={() => (
          <View className="flex-1">
            <Text>No results</Text>
          </View>
        )}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "where do you want to go?",
        }}
      />
    </View>
  );
}

export default GoogleTextInput;