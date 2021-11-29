import '../../css/table-layout.css';
import {useDispatch} from "react-redux";
import {PRICE} from "../../constants/filterConstants";
import PriceFilterForm from "../filterForms/PriceFilterForm";


function PriceFilterPage() {
    const dispatch = useDispatch();

    const onSubmit = (formData) => {
        let element = document.getElementById("filter-price");
        let filter = {};
        filter.name = PRICE;
        filter.from = formData.from;
        filter.to = formData.to;
        dispatch({
            type: 'SET_FILTER',
            payload: filter
        });
        element.style.color = "rgb(255,255,255)";
        dispatch({
            type: 'SHOW_MODAL',
            payload: false
        });
    };

    return (
        <div className="table-layout">
            <PriceFilterForm onSubmit={onSubmit}/>
        </div>
    );
}

export default PriceFilterPage;
