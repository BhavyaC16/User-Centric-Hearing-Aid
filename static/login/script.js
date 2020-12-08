function validateForm(event) {
  event.preventDefault();

  var form = document.getElementById('signIn');
  var valid = form.checkValidity();

  if (valid) {
    document.getElementById('submit').disabled = "true";
    var TimeIsAFlatCircle = anime.timeline({
      autoplay: true
    });
    TimeIsAFlatCircle
      .add({
        targets: '.card-body',
        duration: 1,
        opacity: 0.1
      })
      .add({
        targets: '.loader',
        duration: 1,
        backgroundColor: '#eff3fe',
        opacity: 1,
        complete: function () {
          document.querySelector('.dots').style.display = 'inline';
        }
      })
      .add({
        targets: '.dots',
        duration: 500,
        opacity: 1,
        complete: function () {
          dotTimeline.play();
        }
      })



    var dotTimeline = anime.timeline({
      autoplay: false,
      loop: 2,
      complete: function () {
        var undoTimeline = anime.timeline({
          autoplay: true
        });
        undoTimeline
          .add({
            targets: '.dots',
            duration: 500,
            opacity: 0,
          })
          .add({
            targets: '.loader',
            duration: 1,
            backgroundColor: '#fff',
            opacity: 1,
            begin: function () {
              document.querySelector('.dots').style.display = 'none';
            }
          })
          .add({
            targets: '.card-body',
            duration: 1,
            opacity: 1,
            complete: function () {
              document.getElementById('signIn').reset();
              document.getElementById('signIn').classList.remove('was-validated');
              document.getElementById('submit').disabled = false;
            }
          })
      }
    });
    dotTimeline.add({
      targets: '.bi-dot',
      duration: 300,
      translateY: -20,
      easing: 'easeInOutSine',
      delay: anime.stagger(100) // increase delay by 100ms for each elements.
    })
    dotTimeline.add({
      targets: '.bi-dot',
      duration: 500,
      easing: 'easeInOutSine',
      translateY: 0,
      delay: anime.stagger(100) // increase delay by 100ms for each elements.
    })


  }
  else {
    form.classList.add('was-validated');
    const xMax = 15;
    anime({
      targets: '.card',
      easing: 'easeInOutSine',
      duration: 550,
      translateX: [
        {
          value: xMax * -1,
        },
        {
          value: xMax,
        },
        {
          value: xMax / -2,
        },
        {
          value: xMax / 2,
        },
        {
          value: 0
        }
      ],
    });
  }
}