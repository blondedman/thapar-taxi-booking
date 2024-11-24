import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import RideCard from "@/components/RideCard"

export default function Page() {
  const { user } = useUser()

  return (
    <SafeAreaView>
      <FlatList
        data = {recentRides?.slice(0,5)}
        renderItem={({item}) => <RideCard ride={item} /> }
      />
      <SignedIn>
        <Text>hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </SafeAreaView>
  )
}