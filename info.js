const { exec } = require("child_process");

module.exports = () => {


    exec("ifconfig tun0", (error, stdout, stderr) => {

        console.log(stdout);

    });



};
