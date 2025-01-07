import type { HeroData } from '@/components/HeroCard.types'

interface BasicProperty {
  id: string
  value: string | number | boolean | boolean[]
}

interface PropertyWithMaxValue {
  id: string
  value: number
  maxValue: number
}

interface BasedProperty {
  id: string
  basis: string
  modifier: number
}

const getBasicProperty = ({ id, value }: HeroData): BasicProperty => {
  return {
    id,
    value
  }
}

const getPropertyWithMaxValue = ({ id, value, maxValue }: HeroData): PropertyWithMaxValue => {
  return {
    id,
    value: typeof value === 'number' ? value : 0,
    maxValue: maxValue!
  }
}

export class HeroDataModel {
  name: BasicProperty
  race: BasicProperty
  archetype: BasicProperty
  level: BasicProperty
  experience: BasicProperty
  strength: BasicProperty
  dexterity: BasicProperty
  speed: BasicProperty
  magic: BasicProperty
  armour: PropertyWithMaxValue
  wound: BasicProperty
  gold: BasicProperty
  ammunition: BasicProperty
  torch: BasicProperty
  mana: PropertyWithMaxValue
  hp: PropertyWithMaxValue
  resources: BasicProperty
  tools: BasicProperty
  components: BasicProperty
  backpack: BasicProperty
  knife: BasicProperty
  proficiency: BasicProperty
  proficiency_to_be_learned: BasicProperty
  expertise: BasicProperty
  expertise_to_be_learned: BasicProperty
  notes: BasicProperty
  user_id: string

  constructor(heroData: Record<string, HeroData>, userId: string) {
    this.name = getBasicProperty(heroData.name)
    this.race = getBasicProperty(heroData.race)
    this.archetype = getBasicProperty(heroData.archetype)
    this.level = getBasicProperty(heroData.level)
    this.experience = getBasicProperty(heroData.experience)
    this.strength = getBasicProperty(heroData.strength)
    this.dexterity = getBasicProperty(heroData.dexterity)
    this.speed = getBasicProperty(heroData.speed)
    this.magic = getBasicProperty(heroData.magic)
    this.armour = getPropertyWithMaxValue(heroData.armour)
    this.wound = getBasicProperty(heroData.wound)
    this.gold = getBasicProperty(heroData.gold)
    this.ammunition = getBasicProperty(heroData.ammunition)
    this.torch = getBasicProperty(heroData.torch)
    this.mana = getPropertyWithMaxValue(heroData.mana)
    this.hp = getPropertyWithMaxValue(heroData.hp)
    this.resources = getBasicProperty(heroData.resources)
    this.tools = getBasicProperty(heroData.tools)
    this.components = getBasicProperty(heroData.components)
    this.backpack = getBasicProperty(heroData.backpack)
    this.knife = getBasicProperty(heroData.knife)
    this.proficiency = getBasicProperty(heroData.proficiency)
    this.proficiency_to_be_learned = getBasicProperty(heroData.proficiency_to_be_learned)
    this.expertise = getBasicProperty(heroData.expertise)
    this.expertise_to_be_learned = getBasicProperty(heroData.expertise_to_be_learned)
    this.notes = getBasicProperty(heroData.notes)
    this.user_id = userId
  }
}
