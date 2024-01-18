import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';
// import {filtersFetched, filtersFetching, filtersFetchingError} from "./FiltersSlice";

// import {createNewHero, heroesFetchingError} from "../../store/actions";

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: 'idle',
//   searchTerm: '',
// }

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  () => {
    const { request } = useHttp()
    return request("http://localhost:3001/heroes")
  }
)



//
// export const fetchFilters = (request) => (dispatch) => {
//   dispatch(filtersFetching());
//   request("http://localhost:3001/filters")
//     .then(data => dispatch(filtersFetched(data)))
//     .catch(() => dispatch(filtersFetchingError()))
// }

const heroesAdapter = createEntityAdapter()

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
  searchTerm: '',
})

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    // heroesFetching: state => {
    //   state.heroesLoadingStatus = 'loading'
    // },
    // heroesFetched: (state, action) => {
    //   state.heroes = action.payload
    //   state.heroesLoadingStatus = 'idle'
    // },
    // heroesFetchingError: state => {
    //   state.heroesLoadingStatus = 'error'
    // },
    heroDelete: (state, action) => {
      heroesAdapter.removeOne(state, action.payload)
      // state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
    },
    createNewHero: (state, action) => {
      // state.heroes.push(action.payload)
      heroesAdapter.addOne(state, action.payload)
    },
    searchHero: (state, action) => {
      state.searchTerm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, state => {
        state.heroesLoadingStatus = 'loading'
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        // state.heroes = action.payload
        heroesAdapter.setAll(state, action.payload)
        state.heroesLoadingStatus = 'idle'
      })
      .addCase(fetchHeroes.rejected, state => {
        state.heroesLoadingStatus = 'error'
      })
      // .addCase(fetchHeroDelete.fulfilled, (state, action) => {
      //   console.log(action.payload)
      //   console.log(state.heroes)
      //   console.log(state.heroes.filter(hero => hero.id !== action.payload))
      //   state.heroes.filter(hero => hero.id !== action.payload)
      // })
      .addDefaultCase(() => { })
  }
})



const { actions, reducer } = heroesSlice
export default reducer
export const { selectAll } = heroesAdapter.getSelectors(state => state.heroes)
export const {
  heroDelete,
  // heroesFetching,
  // heroesFetched,
  // heroesFetchingError,
  createNewHero,
  searchHero,
} = actions