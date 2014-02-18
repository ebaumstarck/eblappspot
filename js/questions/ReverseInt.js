
function reverse_int(num0) {
  var num = num0;
  if (num == 0) {
    return num;
  } else {
    var num_list;
    if (num > 0) {
      var num_list = ('' + num).split('');
      num_list.reverse()
    } else {
      num_list = ('' + num).substring(1).split('');
      num_list.reverse();
      num_list.unshift('-');
    }
    result = parseInt(num_list.join(''));
    return result;
  }
}

// print reverse_int(-123)
