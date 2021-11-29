import '../../css/table-layout.css';
import {useDispatch, useSelector} from "react-redux";
import {createLocation} from "../../actions/locationsActions";
import LocationCreateForm from "../createForms/CreateLocationForm";


function CreateLocationPage() {

    const dispatch = useDispatch();
    const locationId = useSelector(state => state.location.editedLocation.id);

    const onSubmit = (formData) => {
        dispatch(createLocation(formData, locationId));
    };

    return (
        <div className="table-layout">
            <h2>Create Location</h2>
            <hr/>
            <LocationCreateForm onSubmit={onSubmit}/>
        </div>
    );
}

export default CreateLocationPage;
