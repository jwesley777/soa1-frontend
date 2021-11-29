import '../../css/table-layout.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateCoordinates} from "../../actions/coordinatesActions";
import EditCoordinatesForm from "../editForms/EditCoordinatesForm";


function EditCoordinatesPage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const coordinatesId = useSelector(state => state.coordinates.editedCoordinates.id);

    const onSubmit = (formData) => {
        dispatch(updateCoordinates(formData, coordinatesId));
    };

    return (
        <div className="table-layout">
            <h2>Edit Coordinates (ID: {id})</h2>
            <hr/>
            <EditCoordinatesForm id={id} onSubmit={onSubmit}/>
        </div>
    );
}

export default EditCoordinatesPage;
