setImmediate(() => {
  console.log('setImmediate - Makrotask');
});
//---------------------------------------
setTimeout(() => {
  console.log('setTimeout 0 - Makrotask');
}, 0);
//---------------------------------------
Promise.resolve().then(() => {
  console.log('Mikrotask 1');
});
//---------------------------------------
process.nextTick(() => {
  console.log('Next tick');
});
//---------------------------------------
Promise.resolve().then(() => {
  console.log('Mikrotask 2');
});
//---------------------------------------
function syncTask() {
  console.log('Sync func call');
}
syncTask();
//---------------------------------------
console.log('Sync code');