export type Category = {
  id: number
  name: string
  icon: string//typeof import("C:/Users/25472/Desktop/TUBIDY/finder-ui/node_modules/@mui/icons-material/index")
}


export type Location  = {
  id: number
  name: string
  category: Category
  latitude: number
  longitude: number
}
