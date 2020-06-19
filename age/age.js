var returnAgeDecimal = (birthday_string) => {
  var birthday, today;
  birthday = new Date(birthday_string);
  today = new Date();

  var difference_ms = (today-birthday);

  return ((((difference_ms/1000)/60)/60)/24)/365;
};

var ageDecimalYears = (ageDecimal) => {
  return Math.floor(ageDecimal);
};

var ageDecimalMonths = (ageDecimal) => {
  var remainder = ageDecimal % 1;

  return Math.floor(remainder * 12);
};

module.exports = {
  getAgeDecimal: returnAgeDecimal,
  getAgeYears: ageDecimalYears,
  getAgeMonths: ageDecimalMonths
};
