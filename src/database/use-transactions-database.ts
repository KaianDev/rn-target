import { useSQLiteContext } from "expo-sqlite"

export type CreateTransaction = {
  target_id: number
  amount: number
  observation?: string
}

export function useTransactionsDatabase() {
  const db = useSQLiteContext()

  async function create(data: CreateTransaction) {
    const statement = await db.prepareAsync(`
        INSERT INTO transactions 
          (target_id, amount, observation) 
        VALUES 
          ($target_id, $amount, $observation)
      `)
    statement.executeAsync({
      $target_id: data.target_id,
      $amount: data.amount,
      $observation: data.observation,
    })
  }
  return {
    create,
  }
}
