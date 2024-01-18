import  { heroesFetched, heroDelete, heroesFetchingError, createNewHero, heroesFetching } from '../slices/HeroSlice'
import { filtersFetching, filtersFetchingError, filtersFetched} from "../slices/FiltersSlice";

// export const fetchHeroes = (request) => async (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//       .then(data => dispatch(heroesFetched(data)))
//       .catch(() => dispatch(heroesFetchingError()))
// }

export const fetchHeroDelete = (request, id) => (dispatch) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then(dispatch(heroDelete(id)))
      .catch(err => console.log(err));
}

export const fetchNewHero = (request,newHero) => (dispatch) => {
    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
      .then(dispatch(createNewHero(newHero)))
      .catch((err) => console.log(err))
}

// export const fetchFilters = (request) => (dispatch) => {
//     dispatch(filtersFetching());
//     request("http://localhost:3001/filters")
//       .then(data => dispatch(filtersFetched(data)))
//       .catch(() => dispatch(filtersFetchingError()))
// }

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }
//
// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }
//
// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (heroes) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: heroes
//     }
// }
//
// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }
//
// export const filterHero = (name) => {
//     return {
//         type: 'FILTERS_HERO',
//         payload: name,
//     }
// }

// export const heroDelete = (id) => {
//     return {
//         type: 'HERO_DELETE',
//         payload: id,
//     }
// }
//
// export const createNewHero = (hero) => {
//     return {
//         type: 'NEW_HERO',
//         payload: hero,
//     }
// }

// export const searchHero = (term) => {
//     return {
//         type: 'SEARCH_HERO',
//         payload: term,
//     }
// }