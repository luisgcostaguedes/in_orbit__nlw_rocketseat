import { gte, lte, and, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()
  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalsCompletedInWeek = db.$with('goals_completed_in_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        completeAt: goalCompletions.createdAt, //aqui eu vou ter a data completa de quando foi completado
        completeAtDate: sql`
        DATE(${goalCompletions.createdAt})
        `.as('completeAtDate'), // aqui eu vou ter apenas a data de quando foi completado
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
  )

  return {
    summary: 'Test',
  }
}
