import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'short_urls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('original_url').notNullable()
      table.string('code', 20).notNullable().unique()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['code'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
