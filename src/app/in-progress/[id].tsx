import { useCallback, useState, useTransition } from "react"
import { Alert, StatusBar, View } from "react-native"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import dayjs from "dayjs"

import { List } from "@/components/list"
import { PageHeader } from "@/components/page-header"
import { Progress } from "@/components/progress"
import { Transaction, TransactionProps } from "@/components/transaction"
import { TransactionTypes } from "@/enum/transaction-type"
import { Button } from "@/components/button"
import { Loading } from "@/components/loading"
import { useTargetDatabase } from "@/database/use-target-database"
import { useTransactionsDatabase } from "@/database/use-transactions-database"
import { numberToCurrency } from "@/utils/number-helper"

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [isFetching, startTransition] = useTransition()

  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  })
  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  const targetDatabase = useTargetDatabase()
  const transactionsDatabase = useTransactionsDatabase()

  async function fetchTargetDetails() {
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

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(Number(id))
      setTransactions(
        response.map((item) => ({
          id: item.id.toString(),
          date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:mm"),
          type:
            item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
          value: numberToCurrency(Math.abs(item.amount)),
          description: item.observation,
        }))
      )
    } catch (error) {
      console.error(error)
      Alert.alert("Erro", "Não foi possível carregar as transações da meta.")
    }
  }

  function fetchData() {
    startTransition(async () => {
      const fetchTargetDetailsPromise = fetchTargetDetails()
      const fetchTransactionsPromise = fetchTransactions()
      await Promise.all([fetchTargetDetailsPromise, fetchTransactionsPromise])
    })
  }

  async function transactionRemove(id: string) {
    try {
      await transactionsDatabase.remove(Number(id))
      fetchData()
      Alert.alert("Sucesso", "Transação removida com sucesso.")
    } catch (error) {
      console.error(error)
      Alert.alert("Erro", "Erro ao remover transação.")
    }
  }

  function handleTransactionRemove(id: string) {
    Alert.alert("Remover", "Tem certeza que deseja remover a transação?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => transactionRemove(id) },
    ])
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
          <Transaction
            data={item}
            onRemove={() => handleTransactionRemove(item.id)}
          />
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
