import React from 'react';

var fetchedPlaylist = [];

// var selectedMood = 'h';

const PlaylistHappy = [
  {
    id: 0,
    title: 'Baila Nonstop',
    author: 'Srilanken artist',
    url: 'https://facedetectionappdataminning.000webhostapp.com/happybila.mp3',
    cover: 'https://gutta.lv/wp-content/uploads/2015/10/test-img.jpg',
  },
  {
    id: 1,
    title: 'Baila gamuda remix krla B&S',
    author: 'B & S',
    url: '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍https://facedetectionappdataminning.000webhostapp.com/happybailabns.mp3',
    cover: 'https://gutta.lv/wp-content/uploads/2015/10/test-img.jpg',
  },
];

const PlaylistSad = [
  {
    id: 1,
    title: 'Obe sina laga',
    author: 'miuru sangeeth',
    url: '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍https://facedetectionappdataminning.000webhostapp.com/sad2obesina.mp3',
    cover: 'https://gutta.lv/wp-content/uploads/2015/10/test-img.jpg',
  },
  {
    id: 0,
    title: 'Ma dase Wedna',
    author: 'miuru sangeeth',
    url: 'https://facedetectionappdataminning.000webhostapp.com/sad1madase.mp3',
    cover: 'https://gutta.lv/wp-content/uploads/2015/10/test-img.jpg',
  },
  {
    id: 1,
    title: 'Perawadanak',
    author: 'Sanuka wikramsinghe',
    url: '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍https://facedetectionappdataminning.000webhostapp.com/sad3peraw.mp3',
    cover: 'https://gutta.lv/wp-content/uploads/2015/10/test-img.jpg',
  },
];

const PlaylistNatural = [
  {
    id: 1,
    title: 'Oba apple malak wage',
    author: 'amarasiri peries',
    url: '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍https://facedetectionappdataminning.000webhostapp.com/natural1obaapple.mp3',
    cover: 'https://gutta.lv/wp-content/uploads/2015/10/test-img.jpg',
  },
  {
    id: 0,
    title: 'Depiya nagala',
    author: 'Lawan abhishek',
    url: 'https://facedetectionappdataminning.000webhostapp.com/natural1depiyanagala.mp3',
    cover: 'https://gutta.lv/wp-content/uploads/2015/10/test-img.jpg',
  },
  {
    id: 1,
    title: 'Denana thuru ma',
    author: 'sachintha lakshan',
    url: '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍https://facedetectionappdataminning.000webhostapp.com/natural1denanthuru.mp3',
    cover: 'https://gutta.lv/wp-content/uploads/2015/10/test-img.jpg',
  },
];

// mock api request
export const fetchPlaylist = (emotion) => {
  switch (emotion) {
    case 'neutral':
      fetchedPlaylist = PlaylistNatural;
      break;
    case 'happy':
      fetchedPlaylist = PlaylistHappy;
      break;
    case 'sad':
      fetchedPlaylist = PlaylistSad;
      break;
    default:
      fetchedPlaylist = PlaylistNatural;
      console.log("hiiiii");
  }

  // if (emotion==="s"){
  //   console.log("fuck fuck fuck");
  // }
  // else{
  //   console.log("fuck double");
  // }
  return new Promise((res, rej) => {
    setTimeout(() => res(fetchedPlaylist), 1000);
  });
};

export const PlaylistContext = React.createContext();
