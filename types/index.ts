interface Phone {
  attributes: Attributes,
  colors: Array<string>
  default: string,
  has_5g: boolean,
  has_esim: boolean,
  has_promotion: boolean,
  has_usp: boolean,
  id: number,
  manufacturer: string,
  model: string,
  name: string,
  operating_system: string,
  refurbished: false
  release_date: string,
  sim_card_capacity: string,
  slug: string,
  sort_order: number,
  variants: Array<Variants>
}

interface Attributes {
  handset_cat_promotion_sticker?: string,
  handset_cat_promotion_sticker_kz?: string,
  promotion_bg_color: string,
  promotion_bg_color_kz?: string,
  promotion_label: string,
  promotion_label_kz?: string
  promotion_slider_source: string
  promotion_slider_source_kz?: string
}

interface Variants {
  attributes: Phone['attributes'],
  id: Phone['id'],
  name: Phone['name'],
  next_ship_date: string,
  slug: Phone['slug'],
  ui_suggested_sort_order: number
}

interface ApiResponse {
  data?: any,
  message: string,
  error?: ErrorEvent
}

enum State {
  Closed,
  Open
}

enum Sort {
  Most,
  New,
  Action
}

enum Type {
  Mobile,
  Desktop
}

export {
  Phone,
  ApiResponse,
  State,
  Sort,
  Type
}