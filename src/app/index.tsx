import { StatusBar, View } from "react-native"
import { router } from "expo-router"
import { HomeHeader } from "@/components/home-header"
import { Target } from "@/components/target"
import { List } from "@/components/list"
import { Button } from "@/components/button"

const summary = {
  total: "R$ 2.680,00",
  input: {
    label: "Entradas",
    value: "R$ 6.184,90",
  },
  output: {
    label: "Saídas",
    value: "-R$ 883,65",
  },
}

const targets = [
  {
    id: "1",
    name: "Meta 1",
    percentage: "50%",
    current: "R$ 500,00",
    target: "R$ 1.000,00",
  },
  {
    id: "2",
    name: "Meta 2",
    percentage: "60%",
    current: "R$ 600,00",
    target: "R$ 1.000,00",
  },
  {
    id: "3",
    name: "Meta 3",
    percentage: "40%",
    current: "R$ 400,00",
    target: "R$ 1.000,00",
  },
]

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />
      <List
        data={targets}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        keyExtractor={({ id }) => id}
        containerStyle={{ paddingHorizontal: 24 }}
        title="Metas"
        emptyMessage="Nenhuma meta. Toque em uma nova meta para criar."
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  )
}
