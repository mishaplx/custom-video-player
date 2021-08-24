//Плеер
var videoPlayer = document.getElementById("video-player");
//Время
var progressBar = document.getElementById("video-hud__progress-bar");
var currTime = document.getElementById("video-hud__curr-time");
var durationTime = document.getElementById("video-hud__duration");
//Кнопки
var leftButton = document.getElementById("video-hud__action_play_left");
var rightButton = document.getElementById("video-hud__action_play_right");
var playButton = document.getElementById("video-hud__action");
var bigPlayButton = document.getElementById("bigplay");
var muteButton = document.getElementById("video-hud__mute");
var volumeScale = document.getElementById("video-hud__volume");
var speedSelect = document.getElementById("video-hud__speed");
var fullScreen = document.getElementById("video-hud__action_full_screen");

///// скорость воспроизведениея
function slowDown() {
  videoPlayer.play();
  videoPlayer.playbackRate = 0.5;
}
function speedUp() {
  videoPlayer.play();
  videoPlayer.playbackRate = 1.5;
}

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
    durationTime.innerHTML = videoTime(videoPlayer.duration);
  }
}
rightButton.addEventListener("click", nextVideo);
leftButton.addEventListener("click", previuosVideo);
playButton.addEventListener("click", videoAct);
videoPlayer.addEventListener("click", videoAct);
let counter = 0;
function nextVideo() {
  if (counter == 5) {
    counter = 0;
  }
  videoPlayer.setAttribute("src", ` ./video/video${counter++}.mp4`);
  videoPlayer.play();
  console.log(counter,' counter++')
}
function previuosVideo() {
  if (counter == -1) {
    counter = 4;
  }
  videoPlayer.setAttribute("src", ` ./video/video${counter--}.mp4`);
  videoPlayer.play();
  console.log(counter,' counter--')
}


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
  let wProgBar = progressBar.offsetWidth;
    let wClick = e.offsetX;
    progressBar.value = (wClick / wProgBar) * 100;
    videoPlayer.pause();
    videoPlayer.currentTime = videoPlayer.duration * (wClick / wProgBar);
    videoPlayer.play();

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
  }
   else {
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
let flag = 0;


document.addEventListener("keydown", (event) => {
  if (event.code == "KeyJ") {
    videoPlayer.currentTime -= 10;
  } else if (event.code == "KeyL") {
    videoPlayer.currentTime += 10;
  }
  if (event.code == "Period") {
    speedUp();
  } else if (event.code == "Comma") {
    slowDown();
  }
  if (event.code == "Space") {
    videoAct();
  }
  if (event.code == "KeyF" && flag === 0) {
    launchFullScreen();
    flag++;
  } else if (event.code == "KeyF" && flag === 1) {
    cancelFullscreen();
    flag = 0;
  }
  if (event.code == "KeyM" && flagSound === 0) {
    videoPlayer.volume = 0
    volumeScale.value = 0
    muteButton.setAttribute(
      "class",
      "video-hud__element video-hud__mute video-hud__mute_false"
    );
    flagSound++;
  } else if (event.code == "KeyM" && flagSound === 1) {
    
    videoPlayer.volume = 1
    volumeScale.value = 100
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
