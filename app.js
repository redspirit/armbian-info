
const CronJob = require('cron').CronJob;
const getInfo = require('./info');

let updateInfo = () => {

    getInfo((info) => {



    });

    console.log('Update');

};

new CronJob({
    cronTime: '0 */10 * * * *',    // every 10 min
    onTick: updateInfo,
    start: true,
    timeZone: 'Europe/Moscow'
});

updateInfo();
