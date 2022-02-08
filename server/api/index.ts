import { IncomingMessage, ServerResponse } from 'http'
import { products } from '../resources/phone_feed.json'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/allPhones') {
    try {
      return {
        phones: products,
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