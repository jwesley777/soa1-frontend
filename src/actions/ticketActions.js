import {history} from '../components/App.js';
import {DELETE_TICKET, SET_ITEM_COUNT} from "../constants/pageActionsConsts";
import {SET_EDITED_TICKET, SET_TICKETS} from "../constants/ticketActionsConsts";
import {COORDINATE, DATE, PRICE, TYPE, ID, NAME, DISCOUNT, PERSON} from "../constants/filterConstants";
import {BASE, TICKET_SERVLET} from "../constants/backendConstants";
import {convert, options, options1} from "../utils/xmlUtils";
import Notifications from 'react-notification-system-redux';
import {serverException} from "../notifications/sendNotification";


function parseSortByParameter(criteria) {
    if (criteria.length === 0) {
        return "";
    }
    let result = "&sortBy=";
    for (const criterion of criteria) {
        result = result + criterion + ";";
    }
    return result.substring(0, result.length - 1);
}

function parseFilters(filters) {
    if (filters.length === 0) {
        return "";
    }
    let result = "&filterBy=";
    for (const filter of filters) {
        switch (filter.name) {
            case ID:
                result = result + ID + "," + filter.from + "," + filter.to + ";"
                break;
            case NAME:
                result = result + NAME + "," + filter.like + ";"
                break;
            case DISCOUNT:
                result = result + DISCOUNT + "," + filter.from + "," + filter.to + ";"
                break;
            case PRICE:
                result = result + PRICE + "," + filter.from + "," + filter.to + ";"
                break;
            case TYPE:
                result = result + TYPE + "," + filter.like + ";"
                break;
            case DATE:
                result = result + DATE + "," + filter.from + "," + filter.to + ";"
                break;
            case PERSON:
                result = result + PERSON + "," + filter.from + "," + filter.to + ";"
                break;
            case COORDINATE:
                result = result + COORDINATE + "," + filter.xfrom + "," + filter.xto + "," + filter.yfrom + "," + filter.yto + ";"
                break;
            default:
                break;
        }
    }
    return result.substring(0, result.length - 1);
}

export function getTickets(page) {
    let perPage = page.perPage;
    let curPage = page.currentPage;
    let sortBy = parseSortByParameter(page.sortBy);
    let filterBy = parseFilters(page.filters)
    return (dispatch) => {
        const url = BASE + TICKET_SERVLET +
            "?perPage=" + perPage + "" +
            "&curPage=" + curPage +
            sortBy +
            filterBy;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                } else return response.text();
            })
            .then(response => {
                const convert = require('xml-js');
                const result = convert.xml2js(response, options);
                const count = result.ticketDTOList.count;
                const tickets = result.ticketDTOList.tickets.ticket;
                dispatch({
                    type: SET_TICKETS,
                    payload: tickets
                });
                dispatch({
                    type: SET_ITEM_COUNT,
                    payload: count
                });
            })
            .catch(error => {
                console.log(error)
                error.text()
                    .then(errorMessage => {
                        const convert = require('xml-js');
                        const result = convert.xml2js(errorMessage, options);
                        const msg = result.exceptionDTO.message;
                        dispatch(Notifications.error(serverException(msg)));
                    })
            });
    }
}


export function deleteTicket(id) {
    return (dispatch) => {
        const url = BASE + TICKET_SERVLET + "/" + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            },
        })
            .then(response => {
                if (!response.ok)
                    throw response;
                else {
                    dispatch({type: DELETE_TICKET});
                }
            })
            .catch(error => {
                error.text()
                    .then(errorMessage => {
                        const convert = require('xml-js');
                        const result = convert.xml2js(errorMessage, options);
                        const msg = result.exceptionDTO.message;
                        dispatch(Notifications.error(serverException(msg)));
                    })
            });
    }
}

export function updateTicket(ticket) {
    let xml = convert.js2xml(transferFormDataToTicketDTO(ticket), options1);
    console.log("XML = " + xml);
    return (dispatch) => {
        const url = BASE + TICKET_SERVLET;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            },
            body: "<ticketDTOList><tickets><ticket>" + xml + "</ticket></tickets></ticketDTOList>"
        })
            .then(response => {
                if (!response.ok)
                    throw response;
                history.push("/soa-lab1");
                window.location.reload(false);
            })
            .catch(error => {
                error.text()
                    .then(errorMessage => {
                        const convert = require('xml-js');
                        const result = convert.xml2js(errorMessage, options);
                        const msg = result.exceptionDTO.message;
                        dispatch(Notifications.error(serverException(msg)));
                    })
            });
    }
}

function transferFormDataToTicketDTO(form) {
    let result = {};
    result.id = form.id;
    result.name = form.name;
    result.creationDate = form.creationDate;
    if (form.price !== undefined)
        result.price = form.price;
    result.type = form.type;
    result.discount = form.discount;
    result.coordinates = {};
    result.coordinates.id = form.coordinates;
    result.person = {};
    result.person.id = form.person;
    result.person.location = {};
    result.person.location.id = form.locations;
    return result;
}

export function createTicket(ticket) {
    let xml = convert.js2xml(transferFormDataToTicketDTO(ticket), options1);
    console.log("XML = " + xml);
    return (dispatch) => {
        const url = BASE + TICKET_SERVLET;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            },
            body: "<ticketDTOList><tickets><ticket>" + xml + "</ticket></tickets></ticketDTOList>"
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                } else {
                    history.push("/soa-lab1");
                    window.location.reload(false);
                }
            })
            .catch(error => {
                error.text().then(errorMessage => {
                    const convert = require('xml-js');
                    const result = convert.xml2js(errorMessage, options);
                    const msg = result.exceptionDTO.message;
                    dispatch(Notifications.error(serverException(msg)));
                })
            });
    }
}

export function getSingleTicket(id) {
    return (dispatch) => {
        const url = BASE + TICKET_SERVLET + "/" + id;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            },
        })
            .then(response => {
                console.log("STATUS " + response.status)
                if (!response.ok)
                    throw response;
                return response.text();
            })
            .then(response => {
                console.log(response)
                const result = convert.xml2js(response, options);
                const ticket = result.ticketDTOList.tickets.ticket;
                dispatch({
                    type: SET_EDITED_TICKET,
                    payload: ticket
                });
            })
            .catch(error => {
                error.text().then(errorMessage => {
                    const convert = require('xml-js');
                    const result = convert.xml2js(errorMessage, options);
                    const msg = result.exceptionDTO.message;
                    dispatch(Notifications.error(serverException(msg)));
                })
            });
    }
}


