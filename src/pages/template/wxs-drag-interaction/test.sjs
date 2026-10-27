var startX = 0;
var startY = 0;
var lastLeft = 50;
var lastTop = 50;

function touchstart(event, ins) {
  console.log("touchstart");
  var touch = event.touches[0] || event.changedTouches[0];
  startX = touch.pageX;
  startY = touch.pageY;
}

function touchmove(event, ins) {
  console.log("touchmove");
  var touch = event.touches[0] || event.changedTouches[0];
  var pageX = touch.pageX;
  var pageY = touch.pageY;
  var left = pageX - startX + lastLeft;
  var top = pageY - startY + lastTop;
  startX = pageX;
  startY = pageY;
  lastLeft = left;
  lastTop = top;
  ins.selectComponent(".movable").setStyle({
    left: left + "px",
    top: top + "px",
  });
  return false;
}

export default {
  msg: "Hello",
  touchstart: touchstart,
  touchmove: touchmove,
  setColor: function (event) {
    event.instance.setStyle({
      color: "red"
    });
  },
};
