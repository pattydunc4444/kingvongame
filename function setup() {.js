function setup() {
  // ...your other setup code...
  if (bgSong && !bgSong.isPlaying()) {
    bgSong.setLoop(true);
    bgSong.play();
  }
}