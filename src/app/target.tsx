import { Button } from "@/components/button"
import { CurrencyInput } from "@/components/currency-input"
import { Input } from "@/components/input"
import { PageHeader } from "@/components/page-header"
import { StatusBar, Text, View } from "react-native"

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira"
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
        />
        <CurrencyInput
          label="Valor alvo"
          value={0}
          placeholder="Ex: Viagem para praia, Apple Watch"
        />
        <Button title="Salvar" />
      </View>
    </View>
  )
}
