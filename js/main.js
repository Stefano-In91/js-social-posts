const posts = [
  {
    id: 1,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
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
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
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
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
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
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
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
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
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
  let formattedString;
  if (string.indexOf("-") === 4 || string.indexOf("/") === 4) {
    let year = string.substr(0, 4);
    let day = string.substr(8, 2);
    formattedString = string.replace(day, year);
    formattedString = formattedString.replace(year, day);
  }
  return formattedString;
}
// Riempie i post già creati con i dati dell'array oggetti, chiama formattazione date
function fillPosts(array) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    let authorName = element.author.name;
    document.querySelectorAll(".post-meta__author")[i].innerHTML = authorName;

    document.querySelectorAll(".post-meta__time")[i].innerHTML = formatDate(
      element.created
    );
    // Se trova un elemento mancante nelle immagini, sostituisce con iniziali Nome
    if (element.author.image === null || element.author.image === undefined) {
      let authorInitials = authorName.substr(0, 1);
      authorInitials += authorName.substr(authorName.indexOf(" ") + 1, 1);
      let div = document.createElement("div");
      div.classList.add(".profile-pic");
      div.innerHTML = authorInitials;
      document.querySelectorAll(".post-meta__icon")[i].innerHTML = ``;
      document.querySelectorAll(".post-meta__icon")[i].append(div);
    } // Altrimenti setta l'innerHTML come da template
    else {
      document.querySelectorAll(".post-meta__icon")[i].innerHTML = `<img
      class="profile-pic"
      src=${element.author.image}
      alt=${authorName}
    />`;
    }

    document.querySelectorAll(".post__image img")[i].src = element.media;
    document.querySelectorAll(".post__text")[i].innerHTML = element.content;
    document.querySelectorAll(".js-likes-counter")[i].innerHTML = element.likes;
  }
}
// Crea post nella pagina clonando il template, chiama la funzione per aggiornarne i dati
function postPosts(array, destination, template) {
  for (let i = 0; i < array.length; i++) {
    const post = document.importNode(template, true);
    destination.append(post);
  }
  fillPosts(array);
}
// Aggiunge event listener sui bottoni della pagina
function likeCounter(postArray, likeArray) {
  for (let i = 0; i < postArray.length; i++) {
    const element = postArray[i];
    const likeBtn = document.querySelectorAll(".js-like-button")[i];
    likeBtn.addEventListener("click", function () {
      if (!likeBtn.classList.contains("like-button--liked")) {
        likeBtn.classList.add("like-button--liked");
        likeArray.push(element);
        document.querySelectorAll(".js-likes-counter")[i].innerHTML =
          ++element.likes;
      } else {
        likeBtn.classList.remove("like-button--liked");
        likeArray.splice(likeArray.indexOf(element), 1);
        document.querySelectorAll(".js-likes-counter")[i].innerHTML =
          --element.likes;
      }
    });
  }
  return likeArray;
}

/*-----------
  MAIN
-----------*/
// Inizializzazione target e counter, invocazione funzioni
const postsList = document.querySelector(".posts-list");
const postTemplate = document.getElementsByTagName("template")[0].content;
postPosts(posts, postsList, postTemplate);
const likedPosts = [];
likeCounter(posts, likedPosts);
