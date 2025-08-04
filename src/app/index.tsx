import { router } from "expo-router"
import { Button, Text, View } from "react-native"

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello, world!</Text>

      <Button title="Nova meta" onPress={() => router.push("/target")} />
      <Button title="Transação" onPress={() => router.push("/transaction/1")} />
      <Button
        title="Progresso"
        onPress={() => router.push("/in-progress/12")}
      />
    </View>
  )
}
