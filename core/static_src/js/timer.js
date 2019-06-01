/* Baby Buddy Timer
 *
 * Uses a supplied ID to run a timer. The element using the ID must have
 * three children with the following classes:
 *  * timer-seconds
 *  * timer-minutes
 *  * timer-hours
 */
BabyBuddy.Timer = function ($) {
    var lastUpdate = moment();
    var runIntervalId = null;
    var timerId = null;
    var timerElement = null;

    var Timer = {
        run: function(timer_id, element_id) {
            timerId = timer_id;
            timerElement = django.jQuery('#' + element_id);

            if (timerElement.length == 0) {
                console.error('Baby Buddy: Timer element not found.');
                return false;
            }

            if (timerElement.find('.timer-seconds').length == 0
                || timerElement.find('.timer-minutes').length == 0
                || timerElement.find('.timer-hours').length == 0) {
                console.error('BBTimer: Element does not contain expected children.');
                return false;
            }

            runIntervalId = setInterval(this.tick, 1000);

            // If the page just came in to view, update the timer data with the
            // current actual duration. This will (potentially) help mobile
            // phones that lock with the timer page open.
            Timer.watch(element_id);
        },

        tick: function() {
            var s = timerElement.find('.timer-seconds');
            var seconds = Number(s.text());
            if (seconds < 59) {
                s.text(seconds + 1);
                return;
            }
            else {
                s.text(0);
            }

            var m = timerElement.find('.timer-minutes');
            var minutes = Number(m.text());
            if (minutes < 59) {
                m.text(minutes + 1);
                return;
            }
            else {
                m.text(0);
            }

            var h = timerElement.find('.timer-hours');
            var hours = Number(h.text());
            h.text(hours + 1);
        },

        watch: function(element_id) {
            if (typeof window.addEventListener != "undefined") {
                timerElement = django.jQuery('#' + element_id);
                if (timerElement.length == 0) {
                    console.error('Baby Buddy: Timer element not found.');
                    return false;
                }
                window.addEventListener('focus', Timer.handleVisibilityChange, false);
            }
        },

        handleVisibilityChange: function() {
            if (moment().diff(lastUpdate) > 2000) {
                Timer.update();
            }
        },

        update: function() {
            $.get('/api/timers/' + timerId + '/', function(data) {
                if (data && 'duration' in data) {
                    clearInterval(runIntervalId);
                    var duration = moment.duration(data.duration);
                    timerElement.find('.timer-hours').text(duration.hours());
                    timerElement.find('.timer-minutes').text(duration.minutes());
                    timerElement.find('.timer-seconds').text(duration.seconds());
                    lastUpdate = moment();

                    if (data['active']) {
                        runIntervalId = setInterval(Timer.tick, 1000);
                    }
                    else {
                        timerElement.addClass('timer-stopped');
                    }
                }
            });
        }
    };

    return Timer;
}(django.jQuery);
