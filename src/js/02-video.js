import vimeoPlayer from '@vimeo/player';
import throttle from "lodash.throttle";
import { saveToClientStorage, getFromClientStorage,removeFromClientStorage } from './client-storage';

const iframeRef = document.querySelector('iframe');
const player = new vimeoPlayer(iframeRef);
const LOCAL_STORAGE_VIDEO_TIME_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(playerCurrentTime, 1000));
setVideoTime();



function playerCurrentTime(event) {
  if (event.seconds >= event.duration) {
    player.off('timeupdate');
    removeFromClientStorage(LOCAL_STORAGE_VIDEO_TIME_KEY);
  }
  else {
    saveToClientStorage(LOCAL_STORAGE_VIDEO_TIME_KEY, event.seconds);
  }
}

function setVideoTime() {
    const savedTime = getFromClientStorage(LOCAL_STORAGE_VIDEO_TIME_KEY);
    if (savedTime) {
        player.setCurrentTime(savedTime);
    }
}