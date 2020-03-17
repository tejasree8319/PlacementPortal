function A(C) {
  console.log('1');
  setTimeout(function() {
    C();
  }, 1000);
}
function B() {
  console.log('2');
}
function C() {
  console.log('3');
}
A(C);
B();
