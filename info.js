
function execlCommand(cmd) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout? stdout : stderr);
        });
    });
}

module.exports = async () => {

    let vpnId = execlCommand("ifconfig tun0").then(stdout => {
        let lines = stdout.split('\n').map(item => item.trim());
        let values = lines[1].split(' ');
        return values[1];
    });

    console.log('vpnId', vpnId);


    return {
        ip: vpnId
    }

};
