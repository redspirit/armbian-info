
const axios = require('axios');
const CronJob = require('cron').CronJob;
const getInfo = require('./info');

let updateInfo = () => {

    getInfo().then((info) => {

        axios.post('http://130.193.56.67:8094/pc/register', info);
        console.log('Update', info);

    });

};

new CronJob({
    cronTime: '0 */10 * * * *',    // every 10 min
    onTick: updateInfo,
    start: true,
    timeZone: 'Europe/Moscow'
});

updateInfo();
