window.onload = function () {
  document.getElementById("music_relax").play();
};

const audioCube = document.getElementById("music_relax");

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38:
      e.preventDefault();
      audioVol = audioCube.volume;
      console.log(audioVol);
      if (audioVol != 1) {
        try {
          audioCube.volume = audioVol + 0.2;
        } catch (error) {
          audioCube.volume = 1;
        }
      }
      break;
    case 40:
      e.preventDefault();
      audioVol = audioCube.volume;
      if (audioVol != 0) {
        try {
          audioCube.volume = audioVol - 0.2;
        } catch (error) {
          audioCube.volume = 0;
        }
      }
      break;
  }
};
