export default function onInvokeApi ({
  data: {
    method,
    args
  }
}) {
  uni[method] && uni[method](args)
}
