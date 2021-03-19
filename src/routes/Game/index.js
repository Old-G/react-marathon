import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PokemonCard from '../../components/PokemonCard'
import s from './style.module.css'

import database from '../../service/firebase'

// const POKEMONS = [
//   {
//     abilities: ['keen-eye', 'tangled-feet', 'big-pecks'],
//     stats: {
//       hp: 63,
//       attack: 60,
//       defense: 55,
//       'special-attack': 50,
//       'special-defense': 50,
//       speed: 71,
//     },
//     type: 'flying',
//     img:
//       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png',
//     name: 'pidgeotto',
//     base_experience: 122,
//     height: 11,
//     id: 17,
//     values: {
//       top: 'A',
//       right: 2,
//       bottom: 7,
//       left: 5,
//     },
//   },
//   {
//     abilities: ['intimidate', 'shed-skin', 'unnerve'],
//     stats: {
//       hp: 60,
//       attack: 95,
//       defense: 69,
//       'special-attack': 65,
//       'special-defense': 79,
//       speed: 80,
//     },
//     type: 'poison',
//     img:
//       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png',
//     name: 'arbok',
//     base_experience: 157,
//     height: 35,
//     id: 24,
//     values: {
//       top: 5,
//       right: 9,
//       bottom: 'A',
//       left: 'A',
//     },
//   },
//   {
//     abilities: ['static', 'lightning-rod'],
//     stats: {
//       hp: 35,
//       attack: 55,
//       defense: 40,
//       'special-attack': 50,
//       'special-defense': 50,
//       speed: 90,
//     },
//     type: 'electric',
//     img:
//       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
//     name: 'pikachu',
//     base_experience: 112,
//     height: 4,
//     id: 25,
//     values: {
//       top: 8,
//       right: 'A',
//       bottom: 9,
//       left: 6,
//     },
//   },
//   {
//     abilities: ['overgrow', 'chlorophyll'],
//     stats: {
//       hp: 45,
//       attack: 49,
//       defense: 49,
//       'special-attack': 65,
//       'special-defense': 65,
//       speed: 45,
//     },
//     type: 'grass',
//     img:
//       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
//     name: 'bulbasaur',
//     base_experience: 64,
//     height: 7,
//     id: 1,
//     values: {
//       top: 8,
//       right: 4,
//       bottom: 2,
//       left: 7,
//     },
//   },
//   {
//     abilities: ['blaze', 'solar-power'],
//     stats: {
//       hp: 39,
//       attack: 52,
//       defense: 43,
//       'special-attack': 60,
//       'special-defense': 50,
//       speed: 65,
//     },
//     type: 'fire',
//     img:
//       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
//     name: 'charmander',
//     base_experience: 62,
//     height: 6,
//     id: 4,
//     values: {
//       top: 7,
//       right: 6,
//       bottom: 1,
//       left: 4,
//     },
//   },
// ]

function GamePage() {
  // const history = useHistory()
  const [pokemons, setPokemons] = useState({})

  useEffect(() => {
    database.ref('pokemons').once('value', (snapshot) => {
      setPokemons(snapshot.val())
    })
  }, [])

  const onClickAdd = (objID, id, name, img, type, values, active) => {
    database.ref('pokemons/' + objID).set({
      id: id,
      name: name,
      img: img,
      type: type,
      values: values,
      isActive: active,
    })
    console.log(onClickAdd)
  }

  // const newKey = database.ref().child('pokemons').push().key
  // database.ref('pokemons/' + newKey).set(data)

  const onClickCard = (id) => {
    setPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] }
        if (pokemon.id === id) {
          pokemon.active = true
        }

        acc[item[0]] = pokemon

        return acc
      }, {})
    })
  }

  return (
    <div className={s.container}>
      <button onClick={onClickAdd}>ADD NEW POKEMON</button>
      <div className={s.flex}>
        {Object.entries(pokemons).map(
          ([key, { id, name, img, type, values, active }]) => (
            <PokemonCard
              key={key}
              id={id}
              name={name}
              img={img}
              type={type}
              values={values}
              onClickCard={onClickCard}
              isActive={active}
            />
          )
        )}
      </div>
    </div>
  )
}

export default GamePage