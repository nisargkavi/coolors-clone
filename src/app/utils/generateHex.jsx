function generateHex() {
  let s = ""
  for (let i = 0; i < 5; i++) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16)
    s += (randomColor + "-")
  }
  s = s.substring(0, s.length - 1)
  return s;
}

export default generateHex;