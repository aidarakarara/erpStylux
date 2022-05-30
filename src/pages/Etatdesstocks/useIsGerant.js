export default function ispompiste() {
  const role = localStorage.getItem("user-role");
  if (role === "gerant") {
    return true;
  }
  return false;
}
