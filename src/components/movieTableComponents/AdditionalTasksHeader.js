import '../../css/filter-header.css';
import '../../css/app.css';
import {useHistory} from "react-router-dom";

function AdditionalTasksHeader() {
    const history = useHistory();

    function handleDiscountClick(evt) {
        evt.preventDefault();
        history.push("/soa-lab1/additional/discount");
    }

    function handleTypeClick(evt) {
        evt.preventDefault();
        history.push("/soa-lab1/additional/type");
    }

    function handlePersonClick(evt) {
        evt.preventDefault();
        history.push("/soa-lab1/additional/person");
    }

    return (
        <div className="filter-header base">
            <div className={"tasks-div"}>
                <button id="new-ticket-but" onClick={handleTypeClick}>
                    TYPES TASK
                </button>
                <button id="new-ticket-but" onClick={handleDiscountClick}>
                    DISCOUNT TASK
                </button>
                <button id="new-ticket-but" onClick={handlePersonClick}>
                    PERSON TASK
                </button>
            </div>
        </div>
    );
}

export default AdditionalTasksHeader;
