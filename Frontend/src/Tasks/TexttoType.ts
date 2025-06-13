export default function TexttoType(text: string) {
  return text.split(" ").join("_").toLowerCase()
}
