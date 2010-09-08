function TimeHack() {

    this.time = 0;
    this.mode = "";
    this.iterations = 0;
    this.work_len = 10;
    this.break_len = 2;
    this.iter_len = 5;
    this.interval = "";
    this.work_timer = "";
    this.break_timer = "";

    this.startBreak = function() {
        this.time = 0;
        this.mode = "Break";
        document.getElementById("break_bell").play();
        document.body.style.backgroundImage = "url(img/bg_break.png)";

        var self = this;
        this.break_timer = setTimeout(function () {
          self.startWork();
        }, this.break_len * 60000);
    }

    this.startWork = function() {
        this.iterations += 1;
        this.time = 0;
        this.mode = "Work";
        document.getElementById("work_bell").play();
        document.body.style.backgroundImage = "url(img/bg_work.png)";

        var self = this;
        this.work_timer = setTimeout(function () {
          self.startBreak();
        }, this.work_len * 60000); 
    }

    this.done = function() {
        clearInterval(this.interval);
        clearTimeout(this.break_timer);
        clearTimeout(this.work_timer);
        this.mode = "Done";
        this.time = 0;

        document.getElementById("timer").innerHTML = 'Woohoo!<br /><br /><a id="start" onclick="timehack.start();">Do it Again</a>';
        document.getElementById("mode").innerHTML = "Done";
        document.getElementById("iteration").innerHTML = "";
        document.body.style.backgroundImage = "url(img/bg.png)";
    }

    this.updateTimer = function() {
        var m = Math.floor(this.time / 60);
        var s = this.time % 60;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        var iter = "Iteration " + this.iterations;
        
        document.getElementById("timer").innerHTML = m + ":" + s;
        document.getElementById("mode").innerHTML = this.mode;
        document.getElementById("iteration").innerHTML = iter;

        if(this.iterations > this.iter_len) {
            this.done();
        }

        this.time += 1;
    }

    this.start = function() {
        this.time = 0;
        this.iterations = 0;

        var self = this;
        this.startWork();
        this.updateTimer();
        this.interval = setInterval(function () {
            self.updateTimer();
        }, 1000);
    }
}
