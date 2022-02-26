$(document).ready(function () {
  loadingWait()

  const textList = ['Wang Yi Ching', 'Front-End Developer']

  function loadingWait() {
    setTimeout(() => {
      $('#preloader').fadeOut()
      $('BODY').css('overflow', 'auto')
      typing(textList, $('#featureText'))
    }, 1300)
  }

  const burger = document.querySelector('.burger')
  const navLinks = document.querySelector('ul.nav-links')
  const nav = document.querySelector('.nav')
  burger.addEventListener('click', function () {
    navLinks.classList.toggle('active')
  })

  window.addEventListener('scroll', function () {
    if (document.documentElement.scrollTop > 200) {
      nav.classList.add('active')
    } else {
      nav.classList.remove('active')
    }
  })

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
      $('ul.nav-links').removeClass('active')
    }
  })

  $('.goTop').on('click', function (e) {
    e.preventDefault()
    $('html, body').animate({ scrollTop: 0 }, 800)
  })

  const moreBtns = document.querySelectorAll('.more')

  moreBtns.forEach((more) => {
    more.addEventListener('click', function () {
      let id = this.getAttribute('data-id')
      let carousel = document.getElementById(id)
      let backdrop = document.querySelector('.backdrop')
      let imgs = carousel.querySelector('#imgs')
      let close = carousel.querySelector('#close')
      let leftBtn = carousel.querySelector('#left')
      let rightBtn = carousel.querySelector('#right')

      let img = carousel.querySelectorAll('#imgs img')

      let idx = 0
      let interval = setInterval(run, 5000)

      carousel.classList.add('show')
      backdrop.classList.add('show')

      close.addEventListener('click', () => {
        carousel.classList.remove('show')
        backdrop.classList.remove('show')
        clearInterval(interval)
      })

      rightBtn.addEventListener('click', () => {
        idx++
        changeImage()
        resetInterval()
      })

      leftBtn.addEventListener('click', () => {
        idx--
        changeImage()
        resetInterval()
      })

      function run() {
        idx++
        changeImage()
      }

      function changeImage() {
        if (idx > img.length - 1) {
          idx = 0
        } else if (idx < 0) {
          idx = img.length - 1
        }

        imgs.style.transform = `translateX(${-idx * carousel.offsetWidth}px)`
      }

      function resetInterval() {
        clearInterval(interval)
        interval = setInterval(run, 5000)
      }
    })
  })
})
