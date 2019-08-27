import { saveAs } from 'file-saver'

export const saveFile = file => {
  const { doc, attrs } = file
  console.log(file)
  const blob = new Blob([new XMLSerializer().serializeToString(doc)], {type: attrs.type});
  saveAs(blob, attrs.name);
}