export function loadFile(e) {
  return new Promise(resolve => {
    var file = e.target.files[0]
    const type = file.type
    var reader = new FileReader()
    reader.onload = function() {
      var parsed = new DOMParser().parseFromString(this.result, type)
      resolve(parsed)
    }
    reader.readAsText(file)
  })
}
