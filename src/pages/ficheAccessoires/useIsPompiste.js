export default function ispompiste() {
  const role = localStorage.getItem("user-role");
  if (role === "pompiste") {
    return true;
  }
  return false;
}
