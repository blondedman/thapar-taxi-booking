import { GoogleInputProps } from "@/types/type";
import { View , Text} from "react-native"
import { GooglePlacesAutocomplete} from "react-native-google-places-autocomplete"
import 'react-native-get-random-values';


const GoogleTextInput = ({
    icon, initialLocation, containerStyle, textInputBackgroundColor, handlePress,
}: GoogleInputProps) => (
    <View className={`h-8 flex-1 flex-row items-center justify-center relative z-50 rounded-3xl ${containerStyle} mb-1 mx-3`}>
        <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="where do you wanna go?"
            debounce={200}
            styles={{
                textInputContainer: {
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
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
        />
    </View>
)

export default GoogleTextInput;