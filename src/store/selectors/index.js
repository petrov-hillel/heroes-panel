import {createSelector} from "@reduxjs/toolkit";
import {filteredBySearchTerm} from "../../helpres/filteredHeroesBySearchTerm";
import {selectAll} from "../slices/HeroSlice";
import {selectAll as filtersSelectAll} from "../slices/FiltersSlice";

export const filteredHeroesSelector = createSelector(
  [state => state.filters.activeFilter,
      selectAll,
      state => state.heroes.searchTerm
  ],
  (filter, heroes, searchTerm) => {
    console.log(heroes)
    return filter === 'all'
      ? filteredBySearchTerm(heroes, searchTerm)
      : filteredBySearchTerm(heroes, searchTerm, filter)
  }
)

export const heroesLoadingStatusSelector = state => state.heroes.heroesLoadingStatus

export const filtersSelector = state => state.filters

// const filteredHeroes = useSelector(state => {
//     return state.filters.activeFilter === 'all'
//       ? filteredBySearchTerm(state.heroes.heroes, state.heroes.searchTerm)
//       : filteredBySearchTerm(state.heroes.heroes, state.heroes.searchTerm, state.filters.activeFilter)
// })