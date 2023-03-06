/**
 * Essential code snippets
 *
 * Set today's date format
 * 
 * Days Between Two Dates
 *
 */   

// ================================================================='
// Set today's date format
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
// =================================================================
// Days Between Two Dates
const daysBetween = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / (1000 * 3600 * 24);

daysBetween(new Date('2022-11-12'), new Date('2023-01-11'));
// =================================================================