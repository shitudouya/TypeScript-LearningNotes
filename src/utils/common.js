//防抖
const throttle = function (fn, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function () {
        fn();
        timer = null;
      }, delay);
    }
  };
};

export {
  throttle
}