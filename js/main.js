const posts = [
  {
    id: 1,
    content:
      "1Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
  },
  {
    id: 2,
    content:
      "2Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
  },
  {
    id: 3,
    content:
      "3Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
  },
  {
    id: 4,
    content:
      "4Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
  },
  {
    id: 5,
    content:
      "5Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 95,
    created: "2021-03-05",
  },
];

/*-----------
  FUNZIONI
-----------*/
// Formatta data se la prima parte della stringa è l'anno(4cifre)
function formatDate(string) {
  if (string.indexOf("-") === 4 || string.indexOf("/") === 4) {
    let formattedString;
    let year = string.substr(0, 4);
    let day = string.substr(8, 2);
    formattedString = string.replace(day, year);
    formattedString = formattedString.replace(year, day);
    formattedString = formattedString.replace("-", "/");
    formattedString = formattedString.replace("-", "/");
    return formattedString;
  }
}
// Riempie i post già creati con i dati dell'array oggetti, chiama formattazione date
function fillPost(target, postArray, index) {
  const element = postArray[index];
  let authorName = element.author.name;
  target.querySelector(".post-meta__author").innerHTML = authorName;

  target.querySelector(".post-meta__time").innerHTML = formatDate(
    element.created
  );
  // Se trova un elemento mancante nelle immagini, sostituisce con iniziali Nome
  if (element.author.image === null || element.author.image === undefined) {
    let authorInitials = authorName.substr(0, 1);
    authorInitials += authorName.substr(authorName.indexOf(" ") + 1, 1);
    target.querySelector(".post-meta__icon").innerHTML = `<div
      class="profile-pic">
      ${authorInitials}</div>`;
  } // Altrimenti setta l'innerHTML come da template
  else {
    target.querySelector(".post-meta__icon").innerHTML = `<img
      class="profile-pic"
      src=${element.author.image}
      alt=${authorName}
    />`;
  }

  target.querySelector(".post__image img").src = element.media;
  target.querySelector(".post__text").innerHTML = element.content;
  target.querySelector(".js-likes-counter").innerHTML = element.likes;
  target
    .querySelector(".js-like-button")
    .setAttribute(`data-postid`, element.id);
  target.querySelector(".js-likes-counter").id = `like-counter-${element.id}`;
}
// Aggiunge event listener sui bottoni della pagina
function addLikeCounter(postArray, index, likeArray) {
  const element = postArray[index];
  const likeBtn = document.querySelectorAll(".js-like-button")[index];
  likeBtn.addEventListener("click", function () {
    if (!likeBtn.classList.contains("like-button--liked")) {
      likeBtn.classList.add("like-button--liked");
      document.querySelectorAll(".js-likes-counter")[index].innerHTML =
        ++element.likes;
      likeArray.push(element);
    } else {
      likeBtn.classList.remove("like-button--liked");
      document.querySelectorAll(".js-likes-counter")[index].innerHTML =
        --element.likes;
      likeArray.splice(likeArray.indexOf(element), 1);
    }
  });
}
// Crea post nella pagina clonando il template, chiama le funzioni per aggiornarne dati
function postPosts(postArray, destination, template, likeArray) {
  for (let i = 0; i < postArray.length; i++) {
    const post = template.cloneNode(true);
    fillPost(post, postArray, i);
    destination.append(post);
    addLikeCounter(postArray, i, likeArray);
  }
}

/*-----------
  MAIN
-----------*/
// Inizializzazione target e counter, invocazione funzioni
const postsList = document.querySelector(".posts-list");
const postTemplate = document.getElementsByTagName("template")[0].content;
const likedPosts = [];
postPosts(posts, postsList, postTemplate, likedPosts);
