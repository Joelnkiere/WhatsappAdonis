import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'

import ShortUrl from '#models/short_url'
import { shortenUrlValidator } from '#validators/shorten_url_validator'

function generateCode(length: number = 6) {
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let out = ''
  for (let i = 0; i < length; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return out
}

export default class UrlShortenersController {
  async index({ view }: HttpContext) {
    return view.render('pages/shortener', {
      result: null,
      errors: null,
    })
  }

  async store({ request, view }: HttpContext) {
    try {
      const payload = await request.validateUsing(shortenUrlValidator)

      let code: string | null = null
      for (let attempt = 0; attempt < 8; attempt++) {
        const candidate = generateCode(7)
        const exists = await ShortUrl.findBy('code', candidate)
        if (!exists) {
          code = candidate
          break
        }
      }

      if (!code) {
        return view.render('pages/shortener', {
          result: null,
          errors: [{ field: 'originalUrl', message: "Impossible de générer un code unique. Réessaie." }],
        })
      }

      const short = await ShortUrl.create({
        originalUrl: payload.originalUrl,
        code,
      })

      const shortUrl = `${request.protocol()}://${request.host()}/${short.code}`
      const qrCodeDataUrl = await QRCode.toDataURL(shortUrl)

      return view.render('pages/shortener', {
        result: {
          originalUrl: short.originalUrl,
          shortUrl,
          code: short.code,
          qrCodeDataUrl,
        },
        errors: null,
      })
    } catch (error: any) {
      const errors = error?.messages
        ? error.messages.map((m: any) => ({ field: m.field, message: m.message }))
        : [{ field: 'originalUrl', message: 'Erreur de validation' }]

      return view.render('pages/shortener', {
        result: null,
        errors,
      })
    }
  }

  async redirect({ params, response }: HttpContext) {
    const short = await ShortUrl.findBy('code', params.code)
    if (!short) {
      return response.notFound('Lien raccourci introuvable')
    }

    return response.redirect(short.originalUrl)
  }
}
