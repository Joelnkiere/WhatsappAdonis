import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ShortUrl extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'original_url' })
  declare originalUrl: string

  @column()
  declare code: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
