import '../css/movie-table.css';
import PersonTableHeader from "./PersonTableHeader";
import PersonList from "./PersonList";
import {useSelector} from "react-redux";

function PersonTable() {
    const personList = useSelector(state => state.additional.ticketList);

    return (
        <div className="movie-table">
            <PersonTableHeader/>
            <PersonList personList={personList}/>
        </div>
    );
}

export default PersonTable;