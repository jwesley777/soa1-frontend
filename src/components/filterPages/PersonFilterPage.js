import '../../css/table-layout.css';
import {useDispatch} from "react-redux";
import PersonFilterForm from "../filterForms/PersonFilterForm";
import {PERSON} from "../../constants/filterConstants";


function PersonFilterPage() {
    const dispatch = useDispatch();

    const onSubmit = (formData) => {
        let element = document.getElementById("filter-person");
        let filter = {};
        filter.name = PERSON;
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
            <PersonFilterForm onSubmit={onSubmit}/>
        </div>
    );
}

export default PersonFilterPage;
