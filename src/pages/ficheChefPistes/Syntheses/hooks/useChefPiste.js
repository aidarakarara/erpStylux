export  function isApprouved(approuve) {

    if (approuve == 1) {
      return true;
    }
    return false;
  }
  

  export  function isChefPiste() {
    const role = localStorage.getItem("user-role");
    if (role === "chefpiste") {
      return true;
    }
    return false;
  }
  