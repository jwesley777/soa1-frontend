import '../../css/table-header.css';
import '../../css/app.css';
import {FaFilter, FaSortAmountDown} from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import {COORDINATE, DATE, PRICE, TYPE, ID, NAME, DISCOUNT, PERSON} from '../../constants/filterConstants';
import {REMOVE_FILTER, REMOVE_SORT, SET_CUR_CRITERION, SET_SORT, SHOW_MODAL} from "../../constants/pageActionsConsts";


function TableHeader() {
    const dispatch = useDispatch();
    const sort = useSelector(state => state.page.sortBy);
    const filters = useSelector(state => state.page.filters);
    const currentCriterion = useSelector(state => state.page.curCriterion);

    function sortHandler(criterion) {
        let element = document.getElementById("sort-" + criterion);
        if (!sort.includes(criterion)) {
            dispatch({
                type: SET_SORT,
                payload: criterion
            });
            element.style.color = "rgb(255,255,255)";
        } else {
            dispatch({
                type: REMOVE_SORT,
                payload: criterion
            });
            element.style.color = "rgba(255,255,255,0.5)";
        }
    }

    function setActive(value, criterion) {
        console.log("CUR = " + currentCriterion);
        let element = document.getElementById("filter-" + criterion);
        for (const filter of filters) {
            if (filter.name === criterion) {
                dispatch({
                    type: REMOVE_FILTER,
                    payload: criterion
                });
                element.style.color = "rgba(255,255,255,0.5)";
                return;
            }
        }
        if (value) {
            dispatch({
                type: SET_CUR_CRITERION,
                payload: criterion
            });
        }
        dispatch({
            type: SHOW_MODAL,
            payload: value
        });
    }

    return (
        <div className="table-header base" id="table-header">

            <div className="id-div">
                <span>Id</span>
                <FaSortAmountDown color="rgba(255,255,255,0.5)" className="pointer" id="sort-id"
                                  onClick={() => sortHandler(ID)}/>
                <FaFilter color="rgba(255,255,255,0.5)" className="pointer" id="filter-id"
                          onClick={() => setActive(true, ID)}/>
            </div>
            <div>
                <span>Name</span>
                <FaSortAmountDown className="pointer" color="rgba(255,255,255,0.5)" id="sort-name"
                                  onClick={() => sortHandler(NAME)}/>
                <FaFilter className="pointer" color="rgba(255,255,255,0.5)" id="filter-name"
                          onClick={() => setActive(true, NAME)}/>
            </div>
            <div>
                <span>Coordinates</span>
                <FaSortAmountDown className="pointer" color="rgba(255,255,255,0.5)" id="sort-coordinate"
                                  onClick={() => sortHandler(COORDINATE)}/>
                <FaFilter className="pointer" color="rgba(255,255,255,0.5)" id="filter-coordinate"
                          onClick={() => setActive(true, COORDINATE)}/>
            </div>
            <div>
                <span>Creation Date</span>
                <FaSortAmountDown className="pointer" color="rgba(255,255,255,0.5)" id="sort-date"
                                  onClick={() => sortHandler(DATE)}/>
                <FaFilter className="pointer" color="rgba(255,255,255,0.5)" id="filter-date"
                          onClick={() => setActive(true, DATE)}/>
            </div>
            <div>
                <span>Discount</span>
                <FaSortAmountDown className="pointer" color="rgba(255,255,255,0.5)" id="sort-discount"
                                  onClick={() => sortHandler(DISCOUNT)}/>
                <FaFilter className="pointer" color="rgba(255,255,255,0.5)" id="filter-discount"
                          onClick={() => setActive(true, DISCOUNT)}/>
            </div>
            <div>
                <span>Price</span>
                <FaSortAmountDown className="pointer" color="rgba(255,255,255,0.5)" id="sort-price"
                                  onClick={() => sortHandler(PRICE)}/>
                <FaFilter className="pointer" color="rgba(255,255,255,0.5)" id="filter-price"
                          onClick={() => setActive(true, PRICE)}/>
            </div>
            <div>
                <span>Type</span>
                <FaSortAmountDown className="pointer" color="rgba(255,255,255,0.5)" id="sort-type"
                                  onClick={() => sortHandler(TYPE)}/>
                <FaFilter className="pointer" color="rgba(255,255,255,0.5)" id="filter-type"
                          onClick={() => setActive(true, TYPE)}/>
            </div>
            <div>
                <span>Person id</span>
                <FaSortAmountDown className="pointer" color="rgba(255,255,255,0.5)" id="sort-person"
                                  onClick={() => sortHandler(PERSON)}/>
                <FaFilter className="pointer" color="rgba(255,255,255,0.5)" id="filter-person"
                          onClick={() => setActive(true, PERSON)}/>
            </div>
            <div>
                <span>Action</span>
            </div>
        </div>
    );
}

export default TableHeader;
