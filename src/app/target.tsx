import { Alert, StatusBar, View } from "react-native"
import { useEffect, useState, useTransition } from "react"
import { router, useLocalSearchParams } from "expo-router"

import { useTargetDatabase } from "@/database/use-target-database"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { CurrencyInput } from "@/components/currency-input"
import { PageHeader } from "@/components/page-header"

export default function Target() {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const [isProcessing, startTransition] = useTransition()
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)

  const targetDatabase = useTargetDatabase()

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      Alert.alert(
        "Atenção",
        "Preencha nome e valor precisa ser maior do que zero"
      )
      return
    }

    startTransition(async () => {
      if (id) {
        update(Number(id))
      } else {
        create()
      }
    })
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount })
      Alert.alert("Nova Meta", "Meta criada com sucesso!", [
        {
          text: "Ok",
          onPress: router.back,
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta")
      console.error(error)
    }
  }

  async function update(id: number) {
    try {
      await targetDatabase.update({ id, name, amount })
      Alert.alert("Meta atualizada", "Meta atualizada com sucesso!", [
        {
          text: "Ok",
          onPress: router.back,
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a meta")
      console.error(error)
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id)
      setName(response.name)
      setAmount(response.amount)
    } catch (error) {
      console.error(error)
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
    }
  }

  useEffect(() => {
    if (id) {
      fetchDetails(Number(id))
    }
  }, [id])

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
          value={name}
          onChangeText={setName}
        />
        <CurrencyInput
          label="Valor alvo"
          value={amount}
          placeholder="Ex: Viagem para praia, Apple Watch"
          onChangeValue={setAmount}
        />
        <Button
          title="Salvar"
          isProcessing={isProcessing}
          onPress={handleSave}
        />
      </View>
    </View>
  )
}
