export default function ispompiste() {
  const role = localStorage.getItem("user-role");
  if (role === "chefpiste") {
    return true;
  }
  return false;
}
