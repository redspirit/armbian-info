
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

    let vpnId = await execlCommand("ifconfig tun0").then(stdout => {
        let lines = stdout.split('\n').map(item => item.trim());
        let values = lines[1].split(' ');
        return values[1];
    });

    let mac = await execlCommand("ifconfig -a | grep ether | gawk '{print $2}'").then(stdout => {
        let lines = stdout.split('\n').map(item => item.trim());
        console.log(lines);
        return lines[lines.length - 1];
    });


    console.log('vpnId', vpnId);
    console.log('mac', mac);


    return {
        ip: vpnId,
        mac: mac
    }

};
