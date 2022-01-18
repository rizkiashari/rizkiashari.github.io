let hours = 0;
let minutes = 0;
let seconds = 0;
let interval = null;
let timeInSeconds = 0;
let isPlaying = false;

document.getElementById("hours").addEventListener("change", (e) => {
  hours = +e.target.value;
});

document.getElementById("minutes").addEventListener("change", (e) => {
  minutes = +e.target.value;
});

document.getElementById("seconds").addEventListener("change", (e) => {
  seconds = +e.target.value;
});

document.getElementById("startTimer").addEventListener("click", () => {
  timeInSeconds = hours * 60 * 60 + minutes * 60 + seconds;
  document.getElementById("music_play").autoplay;
  document.getElementById("music_play").play();
  if (timeInSeconds === 0) {
    setTimeout(() => {
      document.getElementById("alert-error").style.display = "block";
      document.getElementById("alert-error").style.zIndex = "999";
      document.querySelector(".input-timer").style.display = "none";
    }, 300);
    setTimeout(() => {
      document.getElementById("alert-error").style.display = "none";
      document.querySelector(".backgrounds").style.display = "flex";
      document.querySelector(".input-timer").style.display = "flex";
      isPlaying = false;
    }, 1500);
  } else {
    document.querySelector(".backgrounds").style.display = "none";
    document.querySelector(".input-timer").style.display = "none";
    shuffle();
    isPlaying = true;
  }

  let displayTime = () => {
    let displayHours = Math.floor(timeInSeconds / (60 * 60));
    let remainder = timeInSeconds - displayHours * 60 * 60;
    let displayMinutes = Math.floor(remainder / 60);
    let displaySeconds = remainder - displayMinutes * 60;

    setTimeout(() => {
      document.getElementById("timer").innerHTML =
        displayHours + " : " + displayMinutes + " : " + displaySeconds;
      if (timeInSeconds <= 4) {
        document.getElementById("timer").style.color = "red";
      }
    }, 5000);
  };
  interval = setInterval(() => {
    displayTime();
    timeInSeconds -= 1;
    if (timeInSeconds < 0) {
      clearInterval(interval);
      setTimeout(() => {
        isPlaying = false;
        document.querySelector(".backgrounds").style.display = "flex";
        document.querySelector(".input-timer").style.display = "flex";
        document.getElementById("status").innerHTML = "Game Over";
        document.getElementById("timer").style.color = "white";
        document.getElementById("timer").innerHTML = "00 : 00 : 00";
        document.getElementById("music_play").muted = true;
        document.getElementById("music_play").autoplay = false;
      }, 5000);
    } else if (cube.checkGameStatus()) {
      clearInterval(interval);
      setTimeout(() => {
        isPlaying = false;
        document.querySelector(".backgrounds").style.display = "flex";
        document.querySelector(".input-timer").style.display = "flex";
        document.getElementById("status").innerHTML = "You Win";
        document.getElementById("timer").style.color = "white";
        document.getElementById("hasil").innerHTML = timeInSeconds;
        document.getElementById("timer").innerHTML = "00 : 00 : 00";
        document.getElementById("music_play").muted = true;
        document.getElementById("music_play").autoplay = false;
      }, 1000);
    }
  }, 1000);
});

const audioPlay = document.getElementById("music_play");

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38:
      e.preventDefault();
      audioVol = audioPlay.volume;
      console.log(audioVol);
      if (audioVol != 1) {
        try {
          audioPlay.volume = audioVol + 0.2;
        } catch (error) {
          audioPlay.volume = 1;
        }
      }
      break;
    case 40:
      e.preventDefault();
      audioVol = audioPlay.volume;
      if (audioVol != 0) {
        try {
          audioPlay.volume = audioVol - 0.2;
        } catch (error) {
          audioPlay.volume = 0;
        }
      }
      break;
  }
};
