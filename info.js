const { exec } = require("child_process");

module.exports = () => {


    exec("ifconfig tun0", (error, stdout, stderr) => {

        let lines = stdout.split('\n');
        let values = lines[1].split(' ');

        console.log(values);

    });



};
