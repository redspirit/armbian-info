
const CronJob = require('cron').CronJob;
const getInfo = require('./info');

let updateInfo = () => {

    getInfo().then((info) => {


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
