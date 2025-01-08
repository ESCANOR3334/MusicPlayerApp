document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const albumArt = document.querySelector("#player-album-art img");
  
  // Store the original static image and animated GIF URLs
  const staticImage = "cover11.jpg";
  const animatedGif = "cover.gif";
  
  // Add event listener for the play button
  playButton.addEventListener("click", () => {
    albumArt.src = animatedGif; // Start the GIF
  });

  // Add event listener for the pause button
  pauseButton.addEventListener("click", () => {
    albumArt.src = staticImage; // Show the static image
  });
  
  // Add event listener for the previous button
  previousButton.addEventListener("click", () => {
      albumArt.src = animatedGif; // Show the animated image
  });

  nextButton.addEventListener("click", () => {
      albumArt.src = animatedGif; // Show the animated image
  });

  audio.addEventListener("playing", () => {
    albumArt.src = animatedGif; // Show the animated image
  },false);

  audio.addEventListener("ended", () => {
    albumArt.src = staticImage; // Show the animated image
  },true);
});
