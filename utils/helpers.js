module.exports = {
  //format date as MM/DD/YYY
  formatDate: function (date) {
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return [month, day, date.getFullYear().toString().substr(2)].join("/");
  },
};
