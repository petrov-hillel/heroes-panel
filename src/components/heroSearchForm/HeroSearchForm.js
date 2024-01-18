import {useState} from "react";
import {useDispatch} from "react-redux";
import {searchHero} from "../../store/slices/HeroSlice";

export default function HeroSearchForm() {
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()

  const searchHandler = (e) => {
    setSearchText(e.target.value)
    dispatch(searchHero(e.target.value))
  }

  const deleteSearchText = () => {
    setSearchText('')
    dispatch(searchHero(''))
  }

  return (
    <div className="mb-4">
      <form className="border p-4 shadow-lg rounded" onSubmit={e => e.preventDefault()}>
        <label htmlFor="search" className="form-label fs-4">Поиск героев</label>
        <div className="d-flex">
          <input
            onChange={searchHandler}
            value={searchText}
            type="text"
            name="search"
            className="form-control position-relative me-2"
            id="search"
            placeholder="Введите название героя"/>
          <button type="submit" className="btn btn-primary" onClick={deleteSearchText}>Очистить</button>
        </div>
      </form>
    </div>
  )
}