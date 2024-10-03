export interface HeroData {
  id: string
  value: string | number | boolean | boolean[]
  maxValue?: number
  basis?: number
  modifier?: number
  label: string
  type: 'text' | 'number' | 'boolean',
  lengthy?: boolean
}
