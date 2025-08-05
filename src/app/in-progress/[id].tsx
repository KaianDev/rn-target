import { StatusBar, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"

import { List } from "@/components/list"
import { PageHeader } from "@/components/page-header"
import { Progress } from "@/components/progress"
import { Transaction } from "@/components/transaction"
import { TransactionTypes } from "@/enum/transaction-type"
import { Button } from "@/components/button"

const details = {
  current: "R$ 580,00",
  target: "R$ 1.790,00",
  percentage: 25,
}

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
  const { id } = useLocalSearchParams()
  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        gap: 32,
      }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Apple Watch"
        rightButton={{
          icon: "edit",
          onPress: () => {},
        }}
      />
      <Progress data={details} />
      <List
        title="Transações"
        data={[]}
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
