import '../../css/table-layout.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateLocation} from "../../actions/locationsActions";
import LocationEditForm from "../editForms/LocationEditForm";


function EditCoordinatesPage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const locationId = useSelector(state => state.location.editedLocation.id);

    const onSubmit = (formData) => {
        dispatch(updateLocation(formData, locationId));
    };

    return (
        <div className="table-layout">
            <h2>Edit Location (ID: {id})</h2>
            <hr/>
            <LocationEditForm id={id} onSubmit={onSubmit}/>
        </div>
    );
}

export default EditCoordinatesPage;
