var sounds = {};

macros["loopsound"] = {
  handler: function (place, macroName, params) {
    sounds[params[0]] = new Howl({
      src: params,
      loop: true,
      volume: 0,
    });
    sounds[params[0]].play();
  },
};

macros["fadeinsound"] = {
  handler: function (place, macroName, params) {
    sounds[params[0]].fade(0, 1, 1000);
  },
};
