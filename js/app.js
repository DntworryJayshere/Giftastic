$('document').ready(function () {
  var topics = ['alligator', 'beaver', 'crocodile', 'duck', 'elephant', 'fox'];

  function displayAnimal() {
    $('#animal-Images').empty();

    var animalClicked = $(this).attr('data-name');
    console.log(animalClicked);
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      animalClicked +
      '&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=6&rating=g';
    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $('<div>');
        var T = $('<p>').text('Title: ' + results[i].title);
        var ID = $('<p>').text('ID: ' + results[i].id);
        var R = $('<p>').text('Rating: ' + results[i].rating);

        var animalImage = $('<img>');
        animalImage.attr('src', results[i].images.fixed_height_still.url);
        animalImage.attr(
          'data-still',
          results[i].images.fixed_height_still.url
        );
        animalImage.attr('data-animate', results[i].images.fixed_height.url);
        animalImage.attr('data-state', 'still');
        animalImage.addClass('gif');
        animalDiv.append(T, ID, R);
        animalDiv.append(animalImage);
        animalDiv.addClass('animalImgContainer');
        $('#animal-Images').prepend(animalDiv);
      }
    });
  }

  function stateChange() {
    var state = $(this).attr('data-state');
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  }

  function renderButtons() {
    $('#buttons-view').empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button>');
      a.addClass('animal btn btn-light btn-outline-dark');
      a.attr('data-name', topics[i]);
      a.attr('id', 'buttonTags');
      a.text(topics[i]);
      $('#buttons-view').append(a);
    }
  }

  function addAnimalButton(event) {
    event.preventDefault();
    var animal = $('#search-Animal').val().trim().toLowerCase();
    if ($.inArray(animal, topics) != -1) {
      alert('Animal button has already been added!');
    } else {
      topics.push(animal);
    }
    renderButtons();
  }

  $(document).on('click', '#add-Animal', addAnimalButton);
  $(document).on('click', '.animal', displayAnimal);
  $(document).on('click', '.gif', stateChange);

  renderButtons();
});
