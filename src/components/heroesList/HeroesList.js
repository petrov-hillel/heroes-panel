import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHeroDelete} from '../../store/actions';
import {fetchHeroes} from '../../store/slices/HeroSlice'

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {filteredHeroesSelector, heroesLoadingStatusSelector} from "../../store/selectors";


const HeroesList = () => {
    const filteredHeroes = useSelector(filteredHeroesSelector)
    const heroesLoadingStatus = useSelector(heroesLoadingStatusSelector);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes())
    }, []);


    const deleteItem = useCallback((id) => {
        dispatch(fetchHeroDelete(request,id))
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет. Создайте своего героя !</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} deleteItem={() => deleteItem(id)} {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>

    )
}

export default HeroesList;