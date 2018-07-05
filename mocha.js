function hello() {
  return 'hello';
}

function add(ints) {
  let sum = 0;
  ints.forEach( (int) => {
    sum += int;
  })
  return sum;
}

module.exports = {
  'hello': hello,
  'add': add,
  };