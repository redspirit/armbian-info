
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

    // need install gawk
    let mac = await execlCommand("ifconfig -a | grep ether | gawk '{print $2}'").then(stdout => {
        let lines = stdout.split('\n').map(item => item.trim()).filter(item => !!item);
        return lines[lines.length - 1];
    });

    let modelVersion = await execlCommand("cat /etc/os-release").then(stdout => {
        let lines = stdout.split('\n').map(item => item.trim()).filter(item => !!item);
        let result = '';
        lines.forEach(line => {
            let values = line.split('=');
            if(values[0] === 'PRETTY_NAME')
                result = values[1].replace('"', '');
        });
        return result;
    });

    let mqttTopic = await execlCommand("cat /etc/mosquitto/mosquitto.conf").then(stdout => {
        let lines = stdout.split('\n').map(item => item.trim()).filter(item => !!item);
        let values = lines[lines.length-1].split(' ');
        return values[5].replace('/', '');
    });

    let freeSpace = await execlCommand("df -h").then(stdout => {
        let lines = stdout.split('\n').map(item => item.trim()).filter(item => !!item);
        let values = lines[3].split(' ').filter(item => !!item);
        return values[4];
    });

    let temp = await execlCommand("cat /sys/devices/virtual/thermal/thermal_zone0/temp").then(stdout => {
        return Math.round(parseInt(stdout.trim()) / 10000) * 10
    });

    return {
        ip: vpnId,
        mac: mac,
        model: modelVersion,
        topic: mqttTopic,
        space: parseInt(freeSpace),
        cpuTemp: temp,
    }

};

