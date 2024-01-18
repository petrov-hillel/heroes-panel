const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  searchTerm: '',
}

const heroesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading'
      }
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle'
      }
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error'
      }
    case 'HERO_DELETE':
      return {
        ...state,
        heroes: state.heroes.filter(hero => hero.id !== action.payload),
      }
    case 'NEW_HERO':
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      }
    case 'SEARCH_HERO':
      return {
        ...state,
        searchTerm: action.payload,
      }
    default: return state
  }
}

export default heroesReducer;