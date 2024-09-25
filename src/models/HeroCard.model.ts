import type { HeroData } from '@/components/HeroCard.types'

interface BasicProperty {
  id: string,
  value: string | number | boolean
}

interface PropertyWithMaxValue {
  id: string,
  value: number,
  maxValue: number
}


interface BasedProperty {
  id: string,
  basis: string,
  modifier: number
}

const getBasicProperty = ({id, value}: HeroData): BasicProperty => {
  return {
    id,
    value
  }
}

const getPropertyWithMaxValue = ({id, value, maxValue}: HeroData): PropertyWithMaxValue => {
  return {
    id,
    value: typeof value === 'number' ? value : 0,
    maxValue: maxValue!
  }
}

const getBasedMovement = ({id, modifier}: HeroData): BasedProperty => {
  return {
    id,
    basis: "speed",
    modifier: modifier!
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
  movement: BasedProperty
  mana: PropertyWithMaxValue
  hp: PropertyWithMaxValue
  resources: PropertyWithMaxValue
  tools: PropertyWithMaxValue
  components: PropertyWithMaxValue
  backpack: PropertyWithMaxValue
  knife: BasicProperty

  constructor(heroData: Record<string, HeroData>) {
      this.name = getBasicProperty(heroData.name);
      this.race = getBasicProperty(heroData.race);
      this.archetype = getBasicProperty(heroData.archetype);
      this.level = getBasicProperty(heroData.level);
      this.experience = getBasicProperty(heroData.experience);
      this.strength = getBasicProperty(heroData.strength);
      this.dexterity = getBasicProperty(heroData.dexterity);
      this.speed = getBasicProperty(heroData.speed);
      this.magic = getBasicProperty(heroData.magic);
      this.armour = getPropertyWithMaxValue(heroData.armour);
      this.wound = getBasicProperty(heroData.wound);
      this.gold = getBasicProperty(heroData.gold);
      this.ammunition = getBasicProperty(heroData.ammunition);
      this.torch = getBasicProperty(heroData.torch);
      this.movement = getBasedMovement(heroData.movement);
      this.mana = getPropertyWithMaxValue(heroData.mana);
      this.hp = getPropertyWithMaxValue(heroData.hp);
      this.resources = getPropertyWithMaxValue(heroData.resources);
      this.tools = getPropertyWithMaxValue(heroData.tools);
      this.components = getPropertyWithMaxValue(heroData.components);
      this.backpack = getPropertyWithMaxValue(heroData.backpack);
      this.knife = getBasicProperty(heroData.knife);
    }
}
