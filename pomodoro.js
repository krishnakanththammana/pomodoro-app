#!/usr/bin/env node

const notifier = require('node-notifier');
const pckg = require('./package.json');
const program = require('commander');

program.version(pckg.version);

program
  .option('-t, --time <mins>', 'start timer', 25)
  .description('start timer')
  .action((mins) => {
    pomodoro(mins.time);
  })

program.parse(process.argv)

function pomodoro(minutes) {
  let seconds = minutes * 60 || 0;
  if(seconds === 0) {
    console.log("\x1b[32m", `oops.. something went wrong..`);
    program.help();
  }
  notifier.notify({
    title: 'Pomodoro: Timer Start',
    message: `be focused for the next ${minutes} min(s)`
  });
  console.log("\x1b[32m", `starting timer for ${minutes} mins`);
  let pomodoroTimer = setInterval(function () {
    seconds--;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(seconds.toString() + " seconds left");
    if (!seconds) {
      clearInterval(pomodoroTimer);
      notifier.notify({
        title: 'Pomodoro: Timer End',
        message: `you've made it through`
      });
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      console.log("\x1b[32m", "Timer end...");
    }
  }, 1000)
}