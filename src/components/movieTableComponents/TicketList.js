import TableRow from "./TableRow";

function TicketList(props) {
    const numbers = props.tickets;
    let listItems;
    if (numbers === undefined) {
        return (
            <div className="table-row base id-div">
                <div className="id-div">No data.</div>
            </div>
        );
    }
    if (!Array.isArray(numbers)) {
        //const movie = numbers[0];
        listItems = <TableRow ticket={numbers} key={numbers.id}/>
    } else {
        listItems = numbers.map((ticket) =>
            <TableRow ticket={ticket} key={ticket.id}/>
        );
    }
    return (
        <
            div> {listItems}
        </div>
    );
}

export default TicketList;