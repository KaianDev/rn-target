import { router, useLocalSearchParams } from "expo-router"
import { Button, Text, View } from "react-native"

export default function InProgress() {
  const { id } = useLocalSearchParams()
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>In Progress Page</Text>
      <Text>ID: {id}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  )
}
