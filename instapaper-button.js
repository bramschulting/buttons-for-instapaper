var NAMESPACE = 'instapaper-buttons';

function createElement (className, tagName) {
  var element = document.createElement(tagName || 'div');
  var classNames = (NAMESPACE + ' ' + className).split(' ');
  element.classList.add.apply(element.classList, classNames);

  return element;
}


function createArchiveButton () {
  var archiveButton = createElement('btn btn-archive', 'a');
  archiveButton.href = 'javascript:void(0);';
  archiveButton.innerText = 'Archive';
  archiveButton.setAttribute('title', 'Archive');
  archiveButton.setAttribute('aria-label', 'Archive');

  var orgArchiveButton = document.querySelector('nav a[href^="/skip/"]');
  archiveButton.addEventListener('click', function () {
    orgArchiveButton.click();
  });


  return archiveButton;
}


function createLikeButton () {
  var likeButton = createElement('btn btn-like', 'a');
  likeButton.href = 'javascript:void(0);';
  likeButton.innerText = 'Like';
  likeButton.setAttribute('title', 'Like');
  likeButton.setAttribute('aria-label', 'Like');

  var orgLikeButton = document.querySelector('nav a[href^="/star_toggle/"]');
  var isLiked = orgLikeButton.classList.contains('starred');
  likeButton.classList.toggle('liked', isLiked);

  likeButton.addEventListener('click', function () {
    orgLikeButton.click();
  });

  // The original favorite button class doesn't wait for a response before toggling the class, so
  // we don't have to wait either. ¯\_(ツ)_/¯
  orgLikeButton.addEventListener('click', function () {
    isLiked = !isLiked;
    likeButton.classList.toggle('liked', isLiked);
  });

  return likeButton;
}

// Create buttons
var archiveButton = createArchiveButton();
var likeButton = createLikeButton();

// Create buttons container
var buttonsContainer = createElement('buttons-container');
buttonsContainer.appendChild(archiveButton);
buttonsContainer.appendChild(likeButton);


// Insert buttons container
var itemContainer = document.querySelector('.container main');
var itemFooter = itemContainer.querySelector('footer');

itemContainer.insertBefore(buttonsContainer, itemFooter.nextSibiling);


// TODO
// - Aria
