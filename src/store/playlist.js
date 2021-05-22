import React from 'react';

const fetchedPlaylist = [
  {
    id: 0,
    title: '01 Lazy beat',
    author: 'Before Coffee Drummer',
    url: 'https://facedetectionappdataminning.000webhostapp.com/1.mp3',
    cover: 'https://gutta.lv/wp-content/uploads/2015/10/test-img.jpg',
  },
  {
    id: 1,
    title: '02 Blasting beat',
    author: 'The ADHD Drummer',
    url: '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍https://facedetectionappdataminning.000webhostapp.com/3.mp3',
    cover: 'https://gutta.lv/wp-content/uploads/2015/10/test-img.jpg',
  },
  {
    id: 2,
    title: '03 Lazy beat',
    author: 'Before Coffee Drummer',
    url: 'https://facedetectionappdataminning.000webhostapp.com/2.mp3',
    cover: 'https://via.placeholder.com/300/B6A2EB',
  },
  // {
  //   id: 3,
  //   title: '04 Blasting beat',
  //   author: 'The ADHD Drummer',
  //   url: 'https://api.codebooyah.com/audio/track2.ogg',
  //   cover: 'https://via.placeholder.com/300/9A8CBE',
  // },
];

// mock api request
export const fetchPlaylist = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res(fetchedPlaylist), 1000);
  });
};

export const PlaylistContext = React.createContext();
