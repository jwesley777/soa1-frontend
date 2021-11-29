import {ADDITIONAL_SERVLET, BASE} from "../constants/backendConstants";
import {convert, options} from "../utils/xmlUtils";
import {SET_TYPE_LIST, SET_TICKET_COUNT, SET_TICKET_LIST} from "../constants/additionalActionsConsts";
import Notifications from "react-notification-system-redux";
import {serverException} from "../notifications/sendNotification";

export function getTypeList() {
    return (dispatch) => {
        const url = BASE + ADDITIONAL_SERVLET;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            },
        })
            .then(response => {
                if (!response.ok)
                    throw response;
                return response.text();
            })
            .then(response => {
                console.log(response);
                const result = convert.xml2js(response, options);
                dispatch({
                    type: SET_TYPE_LIST,
                    payload: result.ticketTypeDTOList.ticketTypes.ticketType
                });
            })
            .catch(error => {
                console.log(error)
                error.text().then(errorMessage => {
                    const convert = require('xml-js');
                    const result = convert.xml2js(errorMessage, options);
                    const msg = result.exceptionDTO.message;
                    dispatch(Notifications.error(serverException(msg)));
                })
            });
    }
}

export function getTicketList(discount) {
    console.log("DISCOUNT = " + discount);
    return (dispatch) => {
        const url = BASE + ADDITIONAL_SERVLET + "?discount=" + discount;
        console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            },
        })
            .then(response => {
                if (!response.ok)
                    throw response;
                return response.text();
            })
            .then(response => {
                console.log(response);
                const result = convert.xml2js(response, options);
                console.log(result);
                dispatch({
                    type: SET_TICKET_LIST,
                    payload: result.ticketDTOList.tickets.ticket
                });
            })
            .catch(error => {
                console.log(error)
                error.text().then(errorMessage => {
                    const convert = require('xml-js');
                    const result = convert.xml2js(errorMessage, options);
                    const msg = result.exceptionDTO.message;
                    dispatch(Notifications.error(serverException(msg)));
                })
            });
    }
}

export function getTicketCount(id) {
    return (dispatch) => {
        const url = BASE + ADDITIONAL_SERVLET + "?person=" + id;
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
                const result = convert.xml2js(response, options);
                dispatch({
                    type: SET_TICKET_COUNT,
                    payload: result.countDTO.count
                });
            })
            .catch(error => {
                console.log(error)
                error.text().then(errorMessage => {
                    const convert = require('xml-js');
                    const result = convert.xml2js(errorMessage, options);
                    const msg = result.exceptionDTO.message;
                    dispatch(Notifications.error(serverException(msg)));
                })
            });
    }
}