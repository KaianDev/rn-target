import { useSQLiteContext } from "expo-sqlite"

export type CreateTarget = {
  name: string
  amount: number
}

export type UpdateTarget = CreateTarget & {
  id: number
}

export type TargetResponse = {
  id: number
  name: string
  amount: number
  current: number
  percentage: number
  created_at: Date
  updated_at: Date
}

export function useTargetDatabase() {
  const db = useSQLiteContext()

  async function create(data: CreateTarget) {
    const statement = await db.prepareAsync(
      `INSERT INTO targets (name, amount) VALUES ($name, $amount)`
    )

    statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
    })
  }

  async function listByClosestTarget() {
    return db.getAllAsync<TargetResponse>(`
      SELECT
        targets.id,
        targets.name,
        targets.amount,
        targets.created_at,
        targets.updated_at,
        COALESCE(SUM(transactions.amount),0) AS current,
        COALESCE((SUM(transactions.amount) / targets.amount) * 100,0) AS percentage
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      GROUP BY targets.id, targets.name, targets.amount
      ORDER BY percentage DESC
    `)
  }

  async function show(id: number) {
    return db.getFirstAsync<TargetResponse>(`
        SELECT
          targets.id,
          targets.name,
          targets.amount,
          targets.created_at,
          targets.updated_at,
          COALESCE(SUM(transactions.amount),0) AS current,
          COALESCE((SUM(transactions.amount)/targets.amount)*100,0) as percentage
        FROM targets
        LEFT JOIN transactions ON targets.id = transactions.target_id
        WHERE targets.id = ${id}  
      `)
  }

  async function update(data: UpdateTarget) {
    const statement = await db.prepareAsync(`
        UPDATE targets SET
          name = $name,
          amount = $amount,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $id`)
    statement.executeAsync({
      $id: data.id,
      $name: data.name,
      $amount: data.amount,
    })
  }

  async function remove(id: number) {
    await db.runAsync("DELETE FROM targets WHERE id = ?", id)
  }

  return {
    create,
    listByClosestTarget,
    show,
    update,
    remove,
  }
}
