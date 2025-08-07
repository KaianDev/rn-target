import { useState, useTransition } from "react"
import { Alert, StatusBar, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"

import { Button } from "@/components/button"
import { PageHeader } from "@/components/page-header"
import { CurrencyInput } from "@/components/currency-input"
import { Input } from "@/components/input"
import { TransactionType } from "@/components/transaction-type"
import { TransactionTypes } from "@/enum/transaction-type"
import { useTransactionsDatabase } from "@/database/use-transactions-database"

export default function Transaction() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const transactionsDatabase = useTransactionsDatabase()
  const [type, setType] = useState(TransactionTypes.Input)
  const [isCreating, startTransition] = useTransition()
  const [amount, setAmount] = useState<null | number>(null)
  const [observation, setObservation] = useState("")

  function handleCreate() {
    startTransition(async () => {
      try {
        if (amount <= 0) {
          Alert.alert("Atenção", "Valor da transação inválido.")
        }
        await transactionsDatabase.create({
          target_id: Number(id),
          amount: type === TransactionTypes.Output ? amount * -1 : amount,
          observation,
        })
        Alert.alert("Sucesso", "Transação salva com sucesso.", [
          {
            text: "Ok",
            onPress: router.back,
          },
        ])
      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar a transação.")
        console.error(error)
      }
    })
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo de sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType onChange={setType} selected={type} />
        <CurrencyInput
          label="Valor"
          value={amount}
          onChangeValue={setAmount}
          placeholder="Valor da transação"
        />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          value={observation}
          onChangeText={setObservation}
        />
        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  )
}
