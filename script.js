document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("play");
    const pauseButton = document.getElementById("pause");
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const albumArt = document.querySelector("#player-album-art img");
    
    // Store the original static image and animated GIF URLs
    const staticImage = "cover11.jpg";
    const animatedGif = "cover.gif";
    
    // // Add event listener for the play button
    // playButton.addEventListener("click", () => {
    //   albumArt.src = animatedGif; // Start the GIF
    // });
  
    // Add event listener for the pause button
    pauseButton.addEventListener("click", () => {
      albumArt.src = staticImage; // Show the static image
    });
    
    // // Add event listener for the previous button
    // previousButton.addEventListener("click", () => {
    //     albumArt.src = animatedGif; // Show the animated image
    // });

    // nextButton.addEventListener("click", () => {
    //     albumArt.src = animatedGif; // Show the animated image
    // });

    audio.addEventListener("playing", () => {
      albumArt.src = animatedGif; // Show the animated image
    },false);

    audio.addEventListener("ended", () => {
      albumArt.src = staticImage; // Show the animated image
    },true);
  });

const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "SULTAN",
    artist: "ElGrandeToto",
    duration: "3:26",
    src: "./music/SULTAN.mp3",
  },
  {
    id: 1,
    title: "ALCOOLIQUE",
    artist: "ElGrandeToto",
    duration: "3:31",
    src: "./music/ALCOOLIQUE.mp3",
  },
  {
    id: 2,
    title: "WOWOW",
    artist: "Inkonnu",
    duration: "3:11",
    src: "./music/WOWOW.mp3",
  },
  {
    id: 3,
    title: "MARADONA",
    artist: "Stormy, ElGrandeToto",
    duration: "2:38",
    src: "./music/MARADONA.mp3",
  },
  {
    id: 4,
    title: "LOTSOFLOVE",
    artist: "Najm",
    duration: "2:17",
    src: "./music/LOTSOFLOVE.mp3",
  },
  {
    id: 5,
    title: "CHOPIN",
    artist: "ElGrandeToto",
    duration: "2:35",
    src: "./music/CHOPIN.mp3",
  },
  {
    id: 6,
    title: "Comforter",
    artist: "ElGrandeToto",
    duration: "3:36",
    src: "./music/Comforter.mp3",
  },
  {
    id: 7,
    title: "Corazon",
    artist: "ElGrandeToto",
    duration: "3:08",
    src: "./music/CORAZON.mp3",
  },
  {
    id: 8,
    title: "Santa fe",
    artist: "ElGrandeToto",
    duration: "4:16",
    src: "./music/Santa fe.mp3",
  },
  {
    id: 9,
    title: "Leo",
    artist: "ElGrandeToto",
    duration: "2:56",
    src: "./music/Leo.mp3",
  },
];

const audio = new Audio();

let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if(userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  }else{
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");
  audio.play();

  // Update the current song title color
  document.querySelectorAll(".playlist-song-title").forEach((title) => {
    title.classList.remove("playing-title");
  });

  const currentSongElement = document.getElementById(`song-${id}`);
  if (currentSongElement) {
    const titleElement = currentSongElement.querySelector(".playlist-song-title");
    titleElement.classList.add("playing-title");
  }

  highlightCurrentSong(); 
  setPlayerDisplay();

};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  }else{
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
  if (userData?.currentSong === null) {
    return;
  }else{
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById('player-song-title');
  const songArtist = document.getElementById('player-song-artist');
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll('.playlist-song');
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight){
    songToHighlight.setAttribute("aria-current", "true");
  };
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;

};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];
  
};

const getCurrentSongIndex = () => {
  return userData?.songs.indexOf(userData?.currentSong)
};

playButton.addEventListener("click", () => {
  if (userData?.currentSong === null){
    playSong(userData?.songs[0].id);
    
  }else{
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click",playNextSong);
previousButton.addEventListener("click",playPreviousSong);

const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if(a.title < b.title) return -1;
    if(a.title > b.title) return 1;
    return 0;
  });
  return userData?.songs;
};

renderSongs(sortSongs());
