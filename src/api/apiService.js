/* Project Import will lives here */
import { ApiUrls } from '../api/apiUrls';
import axios from 'axios';
/* Project Import will lives here */
export default function (url, method, data, isformdata, token, sucessCallback, errorCallback) {
    axios({
            method: method,
            url: `${ApiUrls.apiEnvironment}` + url,
            headers: {                
                'content-type': isformdata ? 'multipart/form-data' : 'application/json',
                // accept: 'application/json',
                'Authorization':'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
                'Access-Control-Allow-Headers': '*'
            },

            data: data || undefined
            // data: data ? data :  undefined
        }).then((payload) => {
            // console.log(payload);
            if (typeof sucessCallback === "function") {
                sucessCallback(payload);
            }
        })
        .catch(function (error) {
            if (typeof errorCallback === "function") {
                errorCallback(error);
            }
            console.log(error);
        });
}