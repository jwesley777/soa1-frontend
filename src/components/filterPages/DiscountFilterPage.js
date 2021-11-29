import '../../css/table-layout.css';
import {useDispatch} from "react-redux";
import DiscountFilterForm from "../filterForms/DiscountFilterForm";
import {DISCOUNT} from "../../constants/filterConstants";


function DiscountFilterPage() {
    const dispatch = useDispatch();

    const onSubmit = (formData) => {
        let element = document.getElementById("filter-discount");
        let filter = {};
        filter.name = DISCOUNT;
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
            <DiscountFilterForm onSubmit={onSubmit}/>
        </div>
    );
}

export default DiscountFilterPage;
