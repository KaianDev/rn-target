import { useCallback, useState, useTransition } from "react"
import { Alert, StatusBar, View } from "react-native"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"

import { List } from "@/components/list"
import { PageHeader } from "@/components/page-header"
import { Progress } from "@/components/progress"
import { Transaction } from "@/components/transaction"
import { TransactionTypes } from "@/enum/transaction-type"
import { Button } from "@/components/button"
import { useTargetDatabase } from "@/database/use-target-database"
import { numberToCurrency } from "@/utils/number-helper"
import { Loading } from "@/components/loading"

const transactions = [
  {
    id: "1",
    value: "R$ 120,00",
    date: "12/04/25",
    type: TransactionTypes.Input,
  },
  {
    id: "2",
    value: "R$ 40,00",
    date: "12/04/25",
    description: "CDB de 100% no banco XPTO",
    type: TransactionTypes.Output,
  },
]

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [isFetching, startTransition] = useTransition()

  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  })
  const targetDatabase = useTargetDatabase()

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(id))
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        percentage: response.percentage,
        target: numberToCurrency(response.amount),
      })
    } catch (error) {
      console.error(error)
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
    }
  }

  function fetchData() {
    startTransition(async () => {
      const fetchDetailsPromise = fetchDetails()
      await Promise.all([fetchDetailsPromise])
    })
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  function handleNavigateToUpdateTarget() {
    router.navigate({
      pathname: "/target",
      params: { id },
    })
  }

  if (isFetching) {
    return <Loading />
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        gap: 32,
      }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          onPress: handleNavigateToUpdateTarget,
        }}
      />
      <Progress data={details} />
      <List
        title="Transações"
        data={transactions}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
      />
      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${id}`)}
      />
    </View>
  )
}
