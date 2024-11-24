import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState} from "react"
import { useLocationStore } from '@/store'
import RideCard from "@/components/RideCard"
import Map from "@/components/Map"
import { fetchAPI } from '@/lib/fetch'
import { icons, images } from "@/constants";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

export default function Page() {

  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { user } = useUser()

  const loading = false;

  const handleSignOut = () => {};

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  /*
  useEffect(effect:()=> {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionAsync();
    }
  } , deps : [])
  */
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