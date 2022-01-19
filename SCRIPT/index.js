$(document).ready(function () {
  loadingWait()

  function loadingWait() {
    setTimeout(() => {
      $('#preloader').fadeOut()
      $('BODY').css('overflow', 'auto')
    }, 1300)
  }

  const textList = ['Wang Yi Ching', 'Front-End Developer']

  typing(textList, $('#featureText'))

  async function typing(textList, eleRef) {
    let i = 0
    while (true) {
      await typeSentence(textList[i], eleRef)
      await sleep(1500)
      await deleteSentence(eleRef)
      await sleep(500)
      i++
      if (i >= textList.length) {
        i = 0
      }
    }
  }

  async function typeSentence(text, eleRef) {
    const letters = text.split('')
    for (let letter of letters) {
      await sleep(100)
      eleRef.append(letter)
    }
    return
  }

  async function deleteSentence(eleRef) {
    let text = eleRef.html()
    let textLength = text.length
    while (textLength > 0) {
      await sleep(100)
      text = text.slice(0, -1)
      eleRef.html(text)
      textLength -= 1
    }
  }

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const types = document.querySelectorAll('.type')

  window.addEventListener('scroll', () => {
    if ($(window).scrollTop() == '0') {
      $('.bgImg').css('transform', 'translate(0px, 0px)')
      $('.slideDown').css('display', 'block')
    } else if ($(window).scrollTop() < $(window).height()) {
      $('.bgImg').css(
        'transform',
        'translate(0px, -' + ($(window).scrollTop() - 150) + 'px)'
      )
      $('.goTop').css('display', 'none')
      $('.slideDown').css('display', 'none')
    } else {
      $('.goTop').css('display', 'flex')
    }
    checkTypes()
  })

  checkTypes()

  function checkTypes() {
    types.forEach((type) => {
      if (type.getBoundingClientRect().top < (window.innerHeight / 5) * 4) {
        type.classList.add('show')
      } else {
        type.classList.remove('show')
      }
    })
  }

  $('a').on('click', function (e) {
    if (this.hash != '') {
      e.preventDefault()
      const hash = this.hash
      $('html, body').animate({ scrollTop: $(hash).offset().top }, 800)
    }
  })

  $('.goTop').on('click', function (e) {
    e.preventDefault()
    $('html, body').animate({ scrollTop: 0 }, 800)
  })
})
