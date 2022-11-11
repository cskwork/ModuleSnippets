    /*

    SET TODAYS DATE FORMAT
    */
    Date.prototype.toDateInputValue = (function() {
       let local = new Date(this);
       local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
       let time = local.toJSON().slice(0,10) +' '+  local.toJSON().slice(11,16);
       return time;
    });
    Date.prototype.toDatePeriodInputValue = (function() {
        let inputTime;
        let local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        let timeStart = local.toJSON().slice(0,10); 
        inputTime =timeStart +' ~ '+timeStart;
        return inputTime;
     });
