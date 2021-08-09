//Плеер
var videoPlayer = document.getElementById("video-player");
//Время
var progressBar = document.getElementById("video-hud__progress-bar");
var currTime = document.getElementById("video-hud__curr-time");
var durationTime = document.getElementById("video-hud__duration");
//Кнопки
var leftButton = document.getElementById("video-hud__action_play_left")
var rightButton = document.getElementById("video-hud__action_play_right")
var playButton = document.getElementById("video-hud__action");
var bigPlayButton = document.getElementById("bigplay");
var muteButton = document.getElementById("video-hud__mute");
var volumeScale = document.getElementById("video-hud__volume");
var speedSelect = document.getElementById("video-hud__speed");
var fullScreen = document.getElementById("video-hud__action_full_screen");


function speedUp() {
    videoPlayer.play();
    videoPlayer.playbackRate = 2;
}

function slowDown() {
    videoPlayer.play();
    videoPlayer.playbackRate = 0.5;
}
videoPlayer.addEventListener('keydown', (event) => {
    if (event.code == "keyE") {
        speedUp()
    }
    else if (event.code == "KeyQ") {
        slowDown()
    }
})
function videoAct() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    bigPlayButton.style.display = "none";
    playButton.setAttribute(
      "class",
      "video-hud__element video-hud__action video-hud__action_play"
    );
  } else {
    videoPlayer.pause();
    bigPlayButton.style.display = "block";
    playButton.setAttribute(
      "class",
      "video-hud__element video-hud__action video-hud__action_pause"
    );
  }
  if (durationTime.innerHTML == "00:00") {
    durationTime.innerHTML = videoTime(videoPlayer.duration); //Об этой функции чуть ниже
  }
}
document.addEventListener('keydown', (event) => {
    if (event.code == "Space") {
        videoAct()
    }
})
playButton.addEventListener("click", videoAct);

videoPlayer.addEventListener("click", videoAct);

function videoTime(time) {
  //Рассчитываем время в секундах и минутах

  time = Math.floor(time);

  var minutes = Math.floor(time / 60);

  var seconds = Math.floor(time - minutes * 60);

  var minutesVal = minutes;

  var secondsVal = seconds;

  if (minutes < 10) {
    minutesVal = "0" + minutes;
  }

  if (seconds < 10) {
    secondsVal = "0" + seconds;
  }

  return minutesVal + ":" + secondsVal;
}

function videoProgress() {
  //Отображаем время воспроизведения

  progress =
    Math.floor(videoPlayer.currentTime) /
    (Math.floor(videoPlayer.duration) / 100);

  progressBar.value = progress;

  currTime.innerHTML = videoTime(videoPlayer.currentTime);
}

function videoChangeTime(e) {
  //Перематываем

  var mouseX = Math.floor(e.pageX - progressBar.offsetLeft);

  var progress = mouseX / (progressBar.offsetWidth / 100);

  videoPlayer.currentTime = videoPlayer.duration * (progress / 100);
}
//Отображение времени
videoPlayer.addEventListener("timeupdate", videoProgress);
//Перемотка
progressBar.addEventListener("click", videoChangeTime);

function videoChangeVolume() {
  //Меняем громкость

  var volume = volumeScale.value / 100;

  videoPlayer.volume = volume;

  if (videoPlayer.volume == 0) {
    muteButton.setAttribute(
      "class",
      "video-hud__element video-hud__mute video-hud__mute_false"
    );
  } else if (videoPlayer.value > 50) {
    muteButton.setAttribute("class", "video-hud__mute video-hud__mute");
  } else if (videoPlayer.value < 50 || videoPlayer.value != 0) {
    muteButton.setAttribute("class", "video-hud__mute video-hud__mute_50");
  } else {
    muteButton.setAttribute("class", "video-hud__element video-hud__mute");
  }
}

function videoMute() {
  //Убираем звук

  if (videoPlayer.volume == 0) {
    videoPlayer.volume = volumeScale.value / 100;

    muteButton.setAttribute(
      "class",
      "video-hud__element video-hud__mute video-hud__mute_false"
    );
  } else {
    videoPlayer.volume = 0;

    muteButton.setAttribute("class", "video-hud__element video-hud__mute");
  }
}

let flagSound = 0;
document.addEventListener("keydown", (event) => {
  if (event.code == "KeyM" && flagSound === 0) {
    muteButton.setAttribute(
      "class",
      "video-hud__element video-hud__mute video-hud__mute_false"
    );
    flagSound++;
  } else if (event.code == "KeyM" && flagSound === 1) {
    muteButton.setAttribute("class", "video-hud__element video-hud__mute");
    flagSound = 0;
  }
});
//Звук
muteButton.addEventListener("click", videoMute);

volumeScale.addEventListener("change", videoChangeVolume);

fullScreen.addEventListener("click", () => {
  videoPlayer.requestFullscreen();
});
// элемент который в данный момент находится в полноэкранним режиме
let flag = 0;
document.addEventListener("keydown", (event) => {
  if (event.code == "KeyF" && flag === 0) {
    launchFullScreen();
    flag++;
  } else if (event.code == "KeyF" && flag === 1) {
    cancelFullscreen();
    flag = 0;
  }
});
//Запустить отображение в полноэкранном режиме
function launchFullScreen() {
  if (videoPlayer.requestFullScreen) {
    videoPlayer.requestFullScreen();
  } else if (videoPlayer.mozRequestFullScreen) {
    videoPlayer.mozRequestFullScreen();
  } else if (videoPlayer.webkitRequestFullScreen) {
    videoPlayer.webkitRequestFullScreen();
  }
}
// Выход из полноэкранного режима
function cancelFullscreen() {
  if (document.cancelFullScreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.exitFullscreen();
  } else if (document.webkitCancelFullScreen) {
    document.exitFullscreen();
  }
}
