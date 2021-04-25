(function () {
  version.extensions["soundMacros"] = {
    major: 1,
    minor: 1,
    revision: 1,
  };
  var p = (macros["playsound"] = {
    soundtracks: {},
    handler: function (a, b, c, d) {
      var loop = function (m) {
        if (m.loop == undefined) {
          m.loopfn = function () {
            this.play();
          };
          m.addEventListener("ended", m.loopfn, 0);
        } else m.loop = true;
        m.play();
      };
      var s = eval(d.fullArgs());
      if (s) {
        s = s.toString();
        var m = this.soundtracks[s.slice(0, s.lastIndexOf("."))];
        if (m) {
          if (b == "playsound") {
            m.play();
          } else if (b == "loopsound") {
            loop(m);
            m.volume = 0;
          } else if (b == "pausesound") {
            m.pause();
          } else if (b == "unloopsound") {
            if (m.loop != undefined) {
              m.loop = false;
            } else if (m.loopfn) {
              m.removeEventListener("ended", m.loopfn);
              delete m.loopfn;
            }
          } else if (b == "stopsound") {
            m.pause();
          } else if (b == "stopsound") {
            m.pause();
            m.currentTime = 0;
          } else if (b == "fadeoutsound" || b == "fadeinsound") {
            if (m.interval) clearInterval(m.interval);
            if (b == "fadeinsound") {
              m.play();
            }
            var v = m.volume;
            m.interval = setInterval(function () {
              v = Math.min(
                1,
                Math.max(0, v + 0.005 * (b == "fadeinsound" ? 1 : -1))
              );
              m.volume = Math.easeInOut(v);
              if (v == 0 || v == 1) clearInterval(m.interval);
              if (v == 0) {
                m.play();

                m.volume = 0;
              }
            }, 10);
          }
        }
      }
    },
  });
  macros["fadeinsound"] = p;
  macros["fadeoutsound"] = p;
  macros["unloopsound"] = p;
  macros["loopsound"] = p;
  macros["pausesound"] = p;
  macros["stopsound"] = p;
  macros["stopallsound"] = {
    handler: function () {
      var s = macros.playsound.soundtracks;
      for (var j in s) {
        var i = s[j];
        i.pause();
        i.currentTime = 0;
      }
    },
  };
  var div = $("storeArea").firstChild;
  var fe = ["ogg", "mp3", "wav", "webm"];
  while (div) {
    var b = String.fromCharCode(92);
    var q = '"';
    var re =
      "['" + q + "]([^" + q + "']*?)" + b + ".(ogg|mp3|wav|webm)['" + q + "]";
    k(new RegExp(re, "gi"));
    div = div.nextSibling;
  }

  function k(c, e) {
    do {
      d = c.exec(div.innerHTML);
      if (d) {
        var a = new Audio();
        if (a.canPlayType) {
          for (var i = -1; i < fe.length; i += 1) {
            if (i >= 0) d[2] = fe[i];
            if (a.canPlayType("audio/" + d[2])) break;
          }
          if (i < fe.length) {
            a.setAttribute("src", d[1] + "." + d[2]);
            a.interval = null;
            macros.playsound.soundtracks[d[1]] = a;
          } else console.log("Browser can't play '" + d[1] + "'");
        }
      }
    } while (d);
  }
})();
