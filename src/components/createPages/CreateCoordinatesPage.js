import '../../css/table-layout.css';
import {useDispatch, useSelector} from "react-redux";
import {createCoordinates} from "../../actions/coordinatesActions";
import CreateCoordinatesForm from "../createForms/CreateCoordinatesForm";


function CreateCoordinatesPage() {

    const dispatch = useDispatch();
    const coordId = useSelector(state => state.coordinates.editedCoordinates.id);

    const onSubmit = (formData) => {
        dispatch(createCoordinates(formData, coordId));
    };

    return (
        <div className="table-layout">
            <h2>Create Coordinates</h2>
            <hr/>
            <CreateCoordinatesForm onSubmit={onSubmit}/>
        </div>
    );
}

export default CreateCoordinatesPage;
