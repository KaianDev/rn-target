import { useCallback, useState, useTransition } from "react"
import { Alert, StatusBar, View } from "react-native"
import { router, useFocusEffect } from "expo-router"

import { List } from "@/components/list"
import { Button } from "@/components/button"
import { Target, TargetProps } from "@/components/target"
import { HomeHeader, HomeHeaderProps } from "@/components/home-header"
import { Loading } from "@/components/loading"
import { useTargetDatabase } from "@/database/use-target-database"
import { useTransactionsDatabase } from "@/database/use-transactions-database"
import { numberToCurrency } from "@/utils/number-helper"

export default function Index() {
  const targetDatabase = useTargetDatabase()
  const transactionsDatabase = useTransactionsDatabase()
  const [isFetching, startTransition] = useTransition()
  const [targets, setTargets] = useState<TargetProps[]>([])
  const [summary, setSummary] = useState<HomeHeaderProps>({
    total: "R$ 0,00",
    input: {
      label: "Entradas",
      value: "R$ 0,00",
    },
    output: {
      label: "Saídas",
      value: "R$ 0,00",
    },
  })

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listByClosestTarget()
      return response.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        percentage: item.percentage.toFixed(0).concat("%"),
        target: numberToCurrency(item.amount),
        current: numberToCurrency(item.current),
      }))
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas")
      console.error(error)
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps> {
    try {
      const response = await transactionsDatabase.summary()
      return {
        total: numberToCurrency(response.input + response.output),
        input: {
          label: "Entradas",
          value: numberToCurrency(response.input),
        },
        output: {
          label: "Entradas",
          value: numberToCurrency(response.output),
        },
      }
    } catch (error) {
      console.error(error)
      Alert.alert("Erro", "Não foi possível carregar o resumo")
    }
  }

  function fetchData() {
    startTransition(async () => {
      const targetDataPromise = fetchTargets()
      const summaryDataPromise = fetchSummary()
      const [targetData, summaryData] = await Promise.all([
        targetDataPromise,
        summaryDataPromise,
      ])

      setTargets(targetData)
      setSummary(summaryData)
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
