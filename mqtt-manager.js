#!/usr/bin/env node

const commander = require('commander');
const fs = require('fs');
const exec = require('child_process').exec;

let confFilePath = '/etc/mosquitto/mosquitto.conf';

commander
    .version('1.0.0')
    .description('Mosquitto config manager');

commander.command('topic <name>')
    .alias('t')
    .description('Change mqtt topic')
    .action((topic, cmd) => {

        if(!topic)
            return console.log('Error! Empty topic');

        let confText = fs.readFileSync(confFilePath).toString();

        let lines = confText.split('\n').filter(item => !!item);

        lines[lines.length - 1] = `topic # both 0 house/ ${topic}/`;

        let newFileText = lines.join('\n');

        fs.writeFileSync(confFilePath, newFileText);

        exec('service mosquitto restart', (error, stdout, stderr) => {
            console.log('error', error);
            console.log('stdout', stdout);
            console.log('stderr', stderr);
        });

        console.log('Config updated');

    });

commander.parse(process.argv);
