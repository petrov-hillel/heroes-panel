export const filteredBySearchTerm = ( heroes = [], searchTerm = '', activeFilter  ) => {
  if(!activeFilter) {
    return heroes.filter(({name}) => name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
  return heroes.filter(({name, element}) => element === activeFilter && name.toLowerCase().includes(searchTerm.toLowerCase()))
}