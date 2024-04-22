function menu() {
    var x = document.getElementById("navLinks");
    x.classList.toggle('show');
    if (x.style.visibility === "visible") {
    setTimeout(() => {
      x.style.visibility = "hidden";
      x.style.display = "none";
      }, 200);
    } else {
      x.style.display = "initial";
      x.style.visibility = "visible";
    }
  }