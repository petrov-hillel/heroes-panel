import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { fetchNewHero } from "../../store/actions";
import { useFormik } from 'formik';
import {filtersSelector} from "../../store/selectors";
import {selectAll} from "../../store/slices/FiltersSlice";

const HeroesAddForm = () => {
  const filters = useSelector(selectAll)
  const {filtersLoadingStatus} = useSelector(filtersSelector);
  const dispatch = useDispatch();
  const {request} = useHttp();

  const formik = useFormik({
    initialValues: {
      heroName: '',
      heroDescription: '',
      heroElement: '',
    },
    onSubmit
  });

  function onSubmit (values) {
    const newHero = {
      id: nanoid(),
      name: values.heroName,
      description: values.heroDescription,
      element: values.heroElement,
    }

    dispatch(fetchNewHero(request, newHero))

    formik.resetForm();
  }

  const renderFilters = (filters, filtersLoadingStatus) => {
    if (filtersLoadingStatus === "loading") {
      return <option>Загрузка элементов</option>
    } else if (filtersLoadingStatus === "error") {
      return <option>Ошибка загрузки</option>
    }

    if(filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        return name === 'all'
          ? <option key={name}>Я владею элементом...</option>
          : <option key={name} value={name}>{label}</option>
      })
    }
  }

  return (
      <form className="border p-4 shadow-lg rounded" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
              <input
                  required
                  onChange={formik.handleChange}
                  value={formik.values.heroName}
                  type="text"
                  name="heroName"
                  className="form-control"
                  id="heroName"
                  placeholder="Как меня зовут?"/>
          </div>

          <div className="mb-3">
              <label htmlFor="text" className="form-label fs-4">Описание</label>
              <textarea
                  required
                  onChange={formik.handleChange}
                  value={formik.values.heroDescription}
                  name="heroDescription"
                  className="form-control"
                  id="heroDescription"
                  placeholder="Что я умею?"
                  style={{"height": '130px'}}/>
          </div>

          <div className="mb-3">
              <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
              <select
                  required
                  onChange={formik.handleChange}
                  value={formik.values.heroElement}
                  className="form-select"
                  id="heroElement"
                  name="heroElement">
                  {renderFilters(filters,filtersLoadingStatus)}
              </select>
          </div>

          <button type="submit" className="btn btn-primary me-2">Создать</button>
          <button type="submit" className="btn btn-primary" onClick={() => formik.resetForm()}>Очистить</button>
      </form>
  )
}

export default HeroesAddForm;