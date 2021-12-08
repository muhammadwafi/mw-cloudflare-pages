export const getBase64 = (file) => {
  return new Promise(resolve => {
    let baseURL = ""
    // Make new FileReader
    let reader = new FileReader()

    // Convert the file to base64 text
    reader.readAsDataURL(file)

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result
      resolve(baseURL)
    }
  })
}

export const trimText = (text, maxLength) => {
  if (text.length > maxLength) {
    //trim the string to the maximum length
    let cutString = text.substr(0, maxLength);
    //re-trim if we are in the middle of a word
    cutString = cutString.substr(0, Math.min(cutString.length, cutString.lastIndexOf(" ")))
    return cutString + '...'
  }
  return text
}
