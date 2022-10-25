export interface IPeople {
  birth_year: string
  eye_color: string
  films: string[]
  gender: string
  hair_color: string
  height: string
  homeworld: string
  mass: string
  name: string
  skin_color: string
  created: string
  edited: string
  species: string[]
  starships: string[]
  url: string
  vehicles: string[]
}

export interface IPeopleImage {
  id: number
  name: string
  height: number
  mass: number
  gender: string
  homeworld: string
  wiki: string
  image: string
  born: number
  bornLocation: string
  died: number
  diedLocation: string
  species: string
  hairColor: string
  eyeColor: string
  skinColor: string
  cybernetics: string
  affiliations: string[]
  masters: string[]
  apprentices: string[]
  formerAffiliations: any[]
}

