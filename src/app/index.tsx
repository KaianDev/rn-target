import { useCallback, useState, useTransition } from "react"
import { Alert, StatusBar, View } from "react-native"
import { router, useFocusEffect } from "expo-router"

import { List } from "@/components/list"
import { Button } from "@/components/button"
import { Target, TargetProps } from "@/components/target"
import { HomeHeader } from "@/components/home-header"
import { useTargetDatabase } from "@/database/use-target-database"
import { Loading } from "@/components/loading"

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

export default function Index() {
  const targetDatabase = useTargetDatabase()
  const [isFetching, startTransition] = useTransition()
  const [targets, setTargets] = useState<TargetProps[]>([])

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue()
      return response.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        percentage: item.percentage.toFixed(0).concat("%"),
        target: item.amount.toString(),
        current: item.current.toString(),
      }))
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas")
      console.error(error)
    }
  }

  function fetchData() {
    startTransition(async () => {
      const targetDataPromise = fetchTargets()

      const [targetData] = await Promise.all([targetDataPromise])

      setTargets(targetData)
    })
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  if (isFetching) {
    return <Loading />
  }

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
