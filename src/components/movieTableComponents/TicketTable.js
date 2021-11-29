import '../../css/movie-table.css';
import AdditionalTasksHeader from "./AdditionalTasksHeader";
import TableHeader from "./TableHeader";
import PageFooter from "./PageFooter";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTickets} from "../../actions/ticketActions";
import TicketList from "./TicketList";
import {getCoordinates} from "../../actions/coordinatesActions";
import LinksForAdding from "./LinksForAdding";

function TicketTable() {
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);
    const tickets = useSelector(state => state.tickets.ticketList);


    useEffect(() => {
        //dispatch(getMovies(page.perPage, page.currentPage));
        dispatch(getTickets(page));
        dispatch(getCoordinates());
    }, [page.currentPage, page.perPage, page.deleteItem, page.sortBy, page.filters]);


    return (
        <div className="movie-table">
            <LinksForAdding/>
            <AdditionalTasksHeader/>
            <TableHeader/>
            <TicketList tickets={tickets}/>
            <PageFooter/>
        </div>
    );
}

export default TicketTable;