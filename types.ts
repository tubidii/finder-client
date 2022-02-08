export type Category = {
  id: number
  name: string
  icon: null | string
}


export type Location  = {
  id: number
  name: string
  category: Category
  latitude: number
  longitude: number
}
