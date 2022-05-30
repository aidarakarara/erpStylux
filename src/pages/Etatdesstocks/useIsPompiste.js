export default function ispompiste() {
  const role = localStorage.getItem("user-role");
  if (role === "gerant") {
    return false;
  }
  return true;
}
