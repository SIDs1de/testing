document.addEventListener('DOMContentLoaded', () => {
  const fixOwlPadding = (value) => {
    const owlStage = document.querySelector('.tarifs__slider .owl-stage')
    if (owlStage) {
      owlStage.style.left = `-${value}px`
    }
  }
  const activateSlider = () => {
    const slider = $('.owl-carousel')
    if (slider) {
      slider.owlCarousel({
        dots: false,
        onChanged: (e) => {
          if (window.innerWidth < 1200) {
            const value = e.property.value.stagePadding
            fixOwlPadding(value)
          }
        },
        onInitialized: (e) => {
          if (window.innerWidth < 1200) {
            const value = e.relatedTarget.settings.stagePadding
            fixOwlPadding(value)
          }
        },
        responsive: {
          0: {
            items: 1,
            margin: 10,
            stagePadding: 40,
          },
          420: {
            items: 1,
            margin: 14,
            stagePadding: 60,
          },
          500: {
            items: 1,
            margin: 28,
            stagePadding: 80,
          },
          700: {
            items: 2,
            margin: 28,
            stagePadding: 40,
          },
          1200: {
            items: 2,
            margin: 28,
          },
        },
      })
      let countPxScrolled = 0
      slider.on('mousewheel', function (e) {
        const deltaX = e.originalEvent.deltaX
        countPxScrolled += deltaX
        if (countPxScrolled > 50) {
          slider.trigger('next.owl')
          countPxScrolled = 0
        } else if (countPxScrolled < -50) {
          slider.trigger('prev.owl')
          countPxScrolled = 0
        }
        if (deltaX !== 0) {
          e.preventDefault()
        }
      })
    }
  }

  const setGapFromHeader = () => {
    const firstSection = document.querySelector('main > section:first-of-type')
    const header = document.querySelector('.header')
    const phoneMenu = document.querySelector('.phone-nav')
    let headerHeight
    if (header) {
      headerHeight = header.offsetHeight
    }
    if (firstSection) {
      firstSection.style.paddingTop = `${headerHeight}px`
    }
    if (phoneMenu && header) {
      phoneMenu.style.paddingTop = `${headerHeight + 50}px`
    }
  }

  const setParallax = () => {
    const img = document.querySelector('.economy__big-img')
    const scrolledPx = window.scrollY
    const infoBlock = document.querySelector('.economy__info')
    if (img && infoBlock) {
      img.style.transform = `translateY(${scrolledPx / 4}px)`
      infoBlock.style.transform = `translateY(-${scrolledPx / 7}px)`
    }

    if (window.innerWidth > 1100) {
      const sliderBlock = document.querySelector('.tarifs__slider')
      const sliderBlockOffset = scrolledPx - 300
      let ratio = 2
      if (sliderBlock) {
        sliderBlock.style.transform = `translateX(${sliderBlockOffset < 0 ? sliderBlockOffset / ratio : 0}px)`
      }
    }
  }

  const wowInit = () => {
    new WOW().init()
  }

  const activateCheckboxes = () => {
    const checkboxes = document.querySelectorAll('.checkbox')
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', () => {
        const fakeCheckbox = checkbox.parentNode.querySelector('.fake-checkbox')
        fakeCheckbox.classList.toggle('_active')
        fakeCheckbox.classList.remove('_focused')
      })

      checkbox.addEventListener('focus', () => {
        const fakeCheckbox = checkbox.parentNode.querySelector('.fake-checkbox')
        fakeCheckbox.classList.add('_focused')
      })

      checkbox.addEventListener('blur', () => {
        const fakeCheckbox = checkbox.parentNode.querySelector('.fake-checkbox')
        fakeCheckbox.classList.remove('_focused')
      })
    })
  }

  const chooseInputs = () => {
    const tarifs = document.querySelectorAll('.tarifs__card')
    if (tarifs) {
      tarifs.forEach((tarif) => {
        const btn = tarif.querySelector('.card__btn')
        btn.addEventListener('click', () => {
          if (tarif.classList.contains('_added')) {
            tarif.classList.remove('_added')
            btn.innerText = 'Выбрать тариф'
          } else {
            tarif.classList.add('_added')
            btn.innerText = 'Тариф выбран'
          }
        })
      })
    }

    const optionBtns = document.querySelectorAll('.connect__item-btn')
    if (optionBtns) {
      optionBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          btn.classList.toggle('_checked')
        })
      })
    }
  }

  const closeMenu = () => {
    const body = document.querySelector('body')
    body.classList.remove('_menu-opened')
  }

  const activateScrollLinks = () => {
    const links = document.querySelectorAll('[data-scroll-link]')
    if (links) {
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          closeMenu()
          const scrollTo = document.querySelector(link.getAttribute('href'))
          const pxFromTop = scrollTo.getBoundingClientRect().top
          const pxScrolled = window.scrollY
          const headerHeight = document.querySelector('.header').offsetHeight
          const pxToScroll = pxScrolled + pxFromTop - headerHeight
          window.scrollTo({
            behavior: 'smooth',
            top: pxToScroll,
          })
        })
      })
    }
  }

  const activateMaskInput = () => {
    const currentInputs = document.querySelectorAll('[data-phone-mask]')
    if (currentInputs) {
      currentInputs.forEach((input) => {
        var cleave = new Cleave(input, {
          phone: true,
          phoneRegionCode: 'RU',
        })
      })
    }
  }

  const createInlineSvgs = () => {
    inlineSVG.init({
      svgSelector: 'img.svg',
      initClass: 'js-inlinesvg',
    })
  }

  const activateBurgerMenu = () => {
    const burger = document.querySelector('.burger')
    const body = document.querySelector('body')
    if (burger) {
      burger.addEventListener('click', () => {
        body.classList.toggle('_menu-opened')
      })
    }
  }

  const init = () => {
    activateSlider()
    activateCheckboxes()
    activateScrollLinks()
    activateMaskInput()
    activateBurgerMenu()
    setGapFromHeader()
    setParallax()
    wowInit()
    chooseInputs()
    createInlineSvgs()
  }

  window.addEventListener('resize', () => {
    setGapFromHeader()
  })

  window.addEventListener('scroll', () => {
    setParallax()
  })

  init()
})
