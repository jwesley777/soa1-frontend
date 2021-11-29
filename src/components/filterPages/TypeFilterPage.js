import '../../css/table-layout.css';
import {useDispatch} from "react-redux";
import {TYPE} from "../../constants/filterConstants";
import TypeFilterForm from "../filterForms/TypeFilterForm";


function TypeFilterPage() {
    const dispatch = useDispatch();

    const onSubmit = (formData) => {
        let element = document.getElementById("filter-type");
        let filter = {};
        filter.name = TYPE;
        filter.like = formData.compare;
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
            <TypeFilterForm onSubmit={onSubmit}/>
        </div>
    );
}

export default TypeFilterPage;
