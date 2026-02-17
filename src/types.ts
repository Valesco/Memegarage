export interface MemeImage {
  src: string
  alt: string
}

export interface MemeCategory {
  id: string
  label: string
  images: MemeImage[]
}
