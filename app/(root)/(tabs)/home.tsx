import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState} from "react"
import { useLocationStore } from '@/store'
import * as Location from "expo-location"
import { fetchAPI } from '@/lib/fetch'
import { icons, images } from "@/constants";
import { router } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

import GoogleTextInput from '@/components/GoogleTextComponent'
import RideCard from "@/components/RideCard"
import Map from "@/components/Map"

export default function Page() {

  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { user } = useUser()

  const loading = false;
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in")
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  const [hasPermissions, setHasPermissions] = useState<boolean>(false);

  useEffect( ()=> {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        setHasPermissions(false)
      }
    
      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        //latitude: 37.78825,
        //longitude: -122.4324,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };

    requestLocation();

  } , [])

  return (
    <SafeAreaView>
      <FlatList
        data = {[]}
        renderItem={({item}) => <RideCard ride={item} /> }

        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No Recent Rides Found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}




        ListHeaderComponent={
          <>

            <View className="flex flex-row items-center justify-between my-5">
              <Text className="mx-3 text-2xl font-JakartaExtraBold">
                Welcome {user?.firstName || user?.emailAddresses[0].emailAddress}
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white -translate-x-3"
              >
                <Image source={icons.out} className="w-4 h-4 " />
              </TouchableOpacity>
              
            </View>

            

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white"
              handlePress={handleDestinationPress}
            />

            <Link href="../find-ride" className="text-lg text-center text-general-200 mt-5">
              <Text className="text-primary-500">find-ride</Text>
            </Link>

            <>
              <Text className="mx-3 text-xl font-JakartaBold mt-5 mb-3">Your Current Location</Text>
              <View className="flex flex-row items-center bg-transparent h-[300px] border border-white rounded-lg p-3">
                <Map/>
              </View>
            </>
            <Text className="mx-3 text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        }
      />
    </SafeAreaView>
  )
}