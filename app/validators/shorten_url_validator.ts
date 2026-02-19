import vine from '@vinejs/vine'

export const shortenUrlValidator = vine.compile(
  vine.object({
    originalUrl: vine.string().trim().url(),
  })
)
