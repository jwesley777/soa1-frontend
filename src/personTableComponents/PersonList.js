import PersonTableRow from "./PersonTableRow";

function PersonList(props) {
    const personList = props.personList;
    // console.log("SCREENWRITER LIST = " + screenwriterList)
    let listItems;
    if (personList === undefined) {
        return (
            <div className="table-row base id-div">
                <div className="id-div">No data.</div>
            </div>
        );
    }
    if (!Array.isArray(personList)) {
        console.log("NOT ARRAY")
        listItems = <PersonTableRow person={personList} key={personList.id}/>
    } else {
        listItems = personList.map((person) =>
            <PersonTableRow person={person} key={person.id}/>
        );
    }
    return (
        <div>{listItems}</div>
    );
}

export default PersonList;