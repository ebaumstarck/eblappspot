
// function SqrtState(num, eps) {
//   this.num = num;
//   this.eps = eps;
//   this.i = 0.0;
//   this.j = num / 2.0 + 1.0;
//   this.done = false;
//   this.answer = NaN;
// }

// SqrtState.prototype.calculate = function() {
//   if (this.done) {
//     return this.answer;
//   }
//   if (this.i < this.j) {
//     var mid = (this.i + this.j) / 2.0;
//     var square = mid * mid;
//     if (Math.abs(square - this.num) < this.eps) {
//       this.done = true;
//       this.answer = mid;
//     } else if (square < this.num) {
//       this.i = mid;
//     } else {
//       this.j = mid;
//     }
//   } else {
//     this.done = true;
//     this.answer = this.j;
//   }
//   return this.answer;
// };

// SqrtState.prototype.getBounds = function() {
//   return {
//     'min': this.i,
//     'max': this.j
//   }
// };

// for (var i = 2.0; i <= 25.0; i += 1.0) {
//   var state = new SqrtState(i, 0.000001);
//   var answer = NaN;
//   while (isNaN(answer)) {
//     // console.log('  ' + state.i + '-' + state.j);
//     answer = state.calculate();
//   }
//   console.log('root(' + i + ') = ' + answer + '; squared = ' + (answer * answer));
// }

function Sqrt(num, eps) {
  var states = [];
  var i = 0.0;
  var j = num / 2.0 + 1.0;
  while (i < j) {
    states.push({
      'min': i,
      'max': j
    });
    var mid = (i + j) / 2.0;
    var square = mid * mid;
    if (Math.abs(square - num) <= eps) {
      return {
        'states': states,
        'square': mid
      };
    } else if (square < num) {
      i = mid;
    } else {
      j = mid;
    }
  }
  return {
    'states': states,
    'square': j
  };
}

