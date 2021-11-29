import '../css/app.css';
import TablePage from "./movieTableComponents/TablePage";
import Notifications from 'react-notification-system-redux';
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import TicketEditPage from "./editPages/TicketEditPage";
import CreateTicketPage from "./createPages/CreateTicketPage";
import createBrowserHistory from 'history/createBrowserHistory'
import {COORDINATE, DATE, PRICE, TYPE, ID, NAME, DISCOUNT, PERSON} from "../constants/filterConstants";
import IdFilterPage from "./filterPages/IdFilterPage";
import NameFilterPage from "./filterPages/NameFilterPage";
import CoordinateFilterPage from "./filterPages/CoordinateFilterPage";
import DateFilterPage from "./filterPages/DateFilterPage";
import DiscountFilterPage from "./filterPages/DiscountFilterPage";
import PriceFilterPage from "./filterPages/PriceFilterPage";
import TypeFilterPage from "./filterPages/TypeFilterPage";
//import RatingFilterPage from "./filterPages/RatingFilterPage";
import PersonFilterPage from "./filterPages/PersonFilterPage";
import Modal from "./modal/Modal";
import EditCoordinatesPage from "./editPages/EditCoordinatesPage";
import CreateCoordinatesPage from "./createPages/CreateCoordinatesPage";
import LocationEditPage from "./editPages/LocationEditPage";
import CreateLocationPage from "./createPages/CreateLocationPage";
import EditPersonPage from "./editPages/EditPersonPage";
import CreatePersonPage from "./createPages/CreatePersonPage";
import TypeTaskPage from "./additionalTasks/TypesTaskPage";
import DiscountTaskPage from "./additionalTasks/DiscountTaskPage";
import PersonTaskPage from "./additionalTasks/PersonTaskPage";

export const history = createBrowserHistory()

/*class DebugRouter extends Router {
    constructor(props){
        super(props);
        console.log('initial history is: ', JSON.stringify(this.history, null,2))
        this.history.listen((location, action)=>{
            console.log(
                `The current URL is ${location.pathname}${location.search}${location.hash}`
            )
            console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
        });
    }
}*/

function App() {
    const notifications = useSelector(state => state.notifications);
    const modalActive = useSelector(state => state.page.modalActive);
    const dispatch = useDispatch();
    const currentCriterion = useSelector(state => state.page.curCriterion);

    function setActive(value) {
        dispatch({
            type: 'SHOW_MODAL',
            payload: value
        });
    }

    return (
        <div className="app">
            <Modal active={modalActive} setActive={setActive} id="modal">
                {currentCriterion === ID && <IdFilterPage/>}
                {currentCriterion === NAME && <NameFilterPage/>}
                {currentCriterion === COORDINATE && <CoordinateFilterPage/>}
                {currentCriterion === DATE && <DateFilterPage/>}
                {currentCriterion === DISCOUNT && <DiscountFilterPage/>}
                {currentCriterion === PRICE && <PriceFilterPage/>}
                {currentCriterion === TYPE && <TypeFilterPage/>}
                {currentCriterion === PERSON && <PersonFilterPage/>}
            </Modal>
            <Router history={history}>
                <Switch>
                    <Route path="/soa-lab1/edit/:id">
                        <TicketEditPage/>
                    </Route>
                    <Route path="/soa-lab1/coordinates/edit/:id">
                        <EditCoordinatesPage/>
                    </Route>
                    <Route path="/soa-lab1/location/edit/:id">
                        <LocationEditPage/>
                    </Route>
                    <Route path="/soa-lab1/person/edit/:id">
                        <EditPersonPage/>
                    </Route>
                    <Route exact path="/soa-lab1/coordinates/new">
                        <CreateCoordinatesPage/>
                    </Route>
                    <Route exact path="/soa-lab1/location/new">
                        <CreateLocationPage/>
                    </Route>
                    <Route exact path="/soa-lab1/person/new">
                        <CreatePersonPage/>
                    </Route>
                    <Route exact path="/soa-lab1/additional/type">
                        <TypeTaskPage/>
                    </Route>
                    <Route exact path="/soa-lab1/additional/discount">
                        <DiscountTaskPage/>
                    </Route>
                    <Route exact path="/soa-lab1/additional/person">
                        <PersonTaskPage/>
                    </Route>
                    <Route path="/soa-lab1/new">
                        <CreateTicketPage/>
                    </Route>
                    <Route exact path="/soa-lab1">
                        <TablePage/>
                    </Route>
                </Switch>
            </Router>
            <Notifications notifications={notifications}/>
        </div>
    );
}

export default App;
