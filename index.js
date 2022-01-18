window.onload = function () {
  document.getElementById("my_audio").play();
};

const audioElement = document.getElementById("my_audio");

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38:
      e.preventDefault();
      audioVol = audioElement.volume;
      console.log(audioVol);
      if (audioVol != 1) {
        try {
          audioElement.volume = audioVol + 0.2;
        } catch (error) {
          audioElement.volume = 1;
        }
      }
      break;
    case 40:
      e.preventDefault();
      audioVol = audioElement.volume;
      if (audioVol != 0) {
        try {
          audioElement.volume = audioVol - 0.2;
        } catch (error) {
          audioElement.volume = 0;
        }
      }
      break;
  }
};
