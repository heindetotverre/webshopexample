import { IncomingMessage, ServerResponse } from 'http'
import { send, sendError } from 'h3'
import phonesJson from '../resources/phone_feed.json'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/allPhones') {
    try {
      return {
        phones: phonesJson.products,
        message: 'AllPhonesFetched'
      }
    } catch (error) {
      return {
        error: error,
        message: 'NoPhonesFetched'
      }
    }
  }
}