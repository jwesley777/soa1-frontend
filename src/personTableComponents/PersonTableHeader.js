import '../css/table-header.css';
import '../css/app.css';
import {useDispatch} from "react-redux";


function PersonTableHeader() {
    const dispatch = useDispatch();

    return (
        <div className="table-header base" id="table-header">

            <div className="id-div">
                <span>Id</span>
            </div>
            <div>
                <span>Name</span>
            </div>
            <div>
                <span>Discount</span>
            </div>
        </div>
    );
}

export default PersonTableHeader;
