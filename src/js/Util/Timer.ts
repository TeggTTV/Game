class Timer {
    startTime: number;
    endTime: number;
    intervalInSeconds: number;
    time: number;
    interval: any;
    tickTask: any;
    finishTask: any;
    constructor(
        startTime: number = 0,
        endTime: number = 3,
        intervalInSeconds: number = 1,
        autoStart: boolean = true,
        tickTask: any,
        finishTask: any
    ) {
        this.time = startTime;
        this.startTime = startTime;
        this.endTime = endTime;
        this.intervalInSeconds = intervalInSeconds;
        if (autoStart) {
            this.start();
        }
        this.tickTask = tickTask;
        if (this.tickTask == undefined) {
            this.tickTask = () => {};
        }
        this.finishTask = finishTask;
        if (this.finishTask == undefined) {
            this.finishTask = () => {};
        }
    }

    start() {
        this.time = 0;
        this.interval = setInterval(
            this.tick.bind(this),
            this.intervalInSeconds * 1000
        );
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
