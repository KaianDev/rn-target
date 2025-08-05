import { StatusBar, View } from "react-native"
import { useLocalSearchParams } from "expo-router"

import { Button } from "@/components/button"
import { PageHeader } from "@/components/page-header"
import { CurrencyInput } from "@/components/currency-input"
import { Input } from "@/components/input"
import { TransactionType } from "@/components/transaction-type"
import { TransactionTypes } from "@/enum/transaction-type"
import { useState } from "react"

export default function Transaction() {
  const { id } = useLocalSearchParams()
  const [type, setType] = useState(TransactionTypes.Input)
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo de sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType onChange={setType} selected={type} />
        <CurrencyInput label="Valor" value={0} />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
        />
        <Button title="Salvar" onPress={() => {}} />
      </View>
    </View>
  )
}
