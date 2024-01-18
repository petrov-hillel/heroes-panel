import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";
// import {filtersFetched, filtersFetching} from "../../store/actions";

// const initialState = {
//   filtersLoadingStatus: 'idle',
//   filters: [],
//   activeFilter: 'all',
// }

const filtersAdapter = createEntityAdapter({
  selectId: filter => filter.name
})

const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
})

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  () => {
    const { request } = useHttp()
    return request("http://localhost:3001/filters")
  }
)

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // filtersFetching: state => {
    //   state.filtersLoadingStatus = 'loading'
    // },
    // filtersFetched: (state, action) => {
    //   state.filters = action.payload
    //   state.filtersLoadingStatus = 'idle'
    // },
    // filtersFetchingError: state => {
    //   state.filtersLoadingStatus = 'error'
    // },
    filtersHero: (state, action) => {
      state.activeFilter = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilters.pending, state => {
        state.filtersLoadingStatus = 'loading'
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        filtersAdapter.setAll(state, action.payload)
        state.filtersLoadingStatus = 'idle'
      })
      .addCase(fetchFilters.rejected, state => {
        state.filtersLoadingStatus = 'error'
      })
      .addDefaultCase(() => {
      })
  }
})

const { actions, reducer } = filtersSlice
export default reducer
export const { selectAll } = filtersAdapter.getSelectors(state => state.filters)
export const {
  filtersHero,
  // filtersFetched,
  // filtersFetching,
  // filtersFetchingError,
} = actions