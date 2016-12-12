export default function (bytes, decimals) {
  var k = 1000;
  var dm = decimals + 1 || 3;
  var sizes = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(dm) + sizes[i];
}
