"use strict";
class Timer {
    constructor(startTime = 0, endTime = 3, intervalInSeconds = 1, autoStart = true, tickTask, finishTask) {
        this.time = startTime;
        this.startTime = startTime;
        this.endTime = endTime;
        this.intervalInSeconds = intervalInSeconds;
        if (autoStart) {
            this.start();
        }
        this.tickTask = tickTask;
        if (this.tickTask == undefined) {
            this.tickTask = () => { };
        }
        this.finishTask = finishTask;
        if (this.finishTask == undefined) {
            this.finishTask = () => { };
        }
    }
    start() {
        this.time = 0;
        this.interval = setInterval(this.tick.bind(this), this.intervalInSeconds * 1000);
    }
    tick() {
        this.time += this.intervalInSeconds;
        this.tickTask();
        if (this.time >= this.endTime) {
            this.stop();
            this.finishTask();
        }
    }
    stop() {
        clearInterval(this.interval);
    }
    getTime() {
        return this.time;
    }
}
//# sourceMappingURL=Timer.js.map