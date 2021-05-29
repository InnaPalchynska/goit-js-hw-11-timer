class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timeFields = this.getFieldsBySelector(selector);
    this.targetDate = targetDate;
    this.start();
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const time = this.targetDate - currentTime;
      const { days, hours, mins, secs } = this.getTimeComponents(time);
      this.updateTimeFields({ days, hours, mins, secs });
    }, 1000);
  }

  getFieldsBySelector(selector) {
    const refs = {
      daysField: document.querySelector(`${selector} [data-value="days"]`),
      hoursField: document.querySelector(`${selector} [data-value="hours"]`),
      minsField: document.querySelector(`${selector} [data-value="mins"]`),
      secsField: document.querySelector(`${selector} [data-value="secs"]`),
    };

    return refs;
  }

  updateTimeFields({ days, hours, mins, secs }) {
    this.timeFields.daysField.textContent = days;
    this.timeFields.hoursField.textContent = hours;
    this.timeFields.minsField.textContent = mins;
    this.timeFields.secsField.textContent = secs;
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2019'),
});
