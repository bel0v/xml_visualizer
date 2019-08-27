export function loadFile(e) {
  return new Promise(resolve => {
    var file = e.target.files[0]
    const type = file.type
    console.log(file)
    var reader = new FileReader()
    reader.onload = function() {
      var parsed = new DOMParser().parseFromString(this.result, type)
      resolve({doc: parsed, name: file.name, type: file.type})
    }
    reader.readAsText(file)
  })
}
