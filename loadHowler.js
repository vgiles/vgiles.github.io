macros["loadHowler"] = {
  handler: function () {
    var se = document.createElement("script");
    se.type = "text/javascript";
    se.src =
      "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.1/howler.min.js";
    var hT = document.getElementsByTagName("HEAD")[0];
    hT.appendChild(se);
    if (se.innerText) {
      eval(se.innerText);
    } else {
      eval(se.textContent);
    }
  },
};
