import { useSQLiteContext } from "expo-sqlite"

export type CreateTransaction = {
  target_id: number
  amount: number
  observation?: string
}

export type TransactionResponse = {
  id: number
  target_id: number
  amount: number
  observation: string
  created_at: Date
  updated_at: Date
}

export type Summary = {
  input: number
  output: number
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

  function listByTargetId(id: number) {
    return db.getAllAsync<TransactionResponse>(`
        SELECT 
          id, 
          target_id, 
          amount, 
          observation, 
          created_at, 
          updated_at
        FROM transactions 
        WHERE target_id = ${id}
        ORDER BY created_at DESC
      `)
  }

  async function remove(id: number) {
    await db.runAsync("DELETE FROM transactions WHERE id = ?", id)
  }

  async function summary() {
    return db.getFirstAsync<Summary>(`
      SELECT 
        COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END),0) AS input,
        COALESCE(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END),0) AS output
      FROM transactions
    `)
  }

  return {
    create,
    listByTargetId,
    remove,
    summary,
  }
}
