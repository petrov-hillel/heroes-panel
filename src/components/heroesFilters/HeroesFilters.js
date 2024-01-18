import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {filtersHero, fetchFilters, selectAll} from "../../store/slices/FiltersSlice";
import Spinner from "../spinner/Spinner";
import {filtersSelector} from "../../store/selectors";

const HeroesFilters = () => {
    const filters = useSelector(selectAll)
    const {filtersLoadingStatus, activeFilter} = useSelector(filtersSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters())
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.length > 0 ? (
                      filters.map(({name, className, label}) => {
                          const classes = `${className} ${activeFilter === name && 'active'}`
                          return (
                            <button key={name} onClick={() => dispatch(filtersHero(name))} name={name} className={classes}>{label}</button>
                          )
                      })
                    ) : (
                      <h6 className="text-center mt-5">Фильтров нет</h6>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;