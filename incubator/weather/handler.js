'use strict';

const rq = require('request-promise-native');

module.exports = {
    weather: async function (event, context) {
        const location = event.data.location;

        if (!location) {
            throw new Error('You must provide a location.');
        }
        const response = await rq(`https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="${location}") and u="c"&format=json`);
        const condition = JSON.parse(response).query.results.channel.item.condition;
        const text = condition.text;
        const temperature = condition.temp;
        return `It is ${temperature} celsius degrees in ${location} and ${text}`;
    }
}