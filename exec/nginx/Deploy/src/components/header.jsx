import playStoreBadge from '../assets/google-play-badge.png';
import anime from 'animejs';
import { useEffect } from 'react';
export const Header = (props) => {
  useEffect(() => {
    var textWrapper = document.querySelector('.ml6 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
  }, []);

  anime.timeline({ loop: true }).add({
    targets: '.ml6 .letter',
    translateY: ['1.5em', 0],
    translateZ: 0,
    duration: 2000,
    delay: (el, i) => 100 * i,
  });
  // .add({
  //   targets: '.ml6',
  //   opacity: 0,
  //   duration: 1000,
  //   easing: 'easeOutExpo',
  //   delay: 1000,
  // });
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1 class='ml6'>
                  SSAFY 4th PROJECT
                  <span class='text-wrapper'>
                    <span class='letters'>play with Dinory</span>
                  </span>
                </h1>
                <p>Compatible with Android 10+ Tablet</p>
                <a
                  href='#features'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Learn More
                </a>
                {/* eslint-disable-next-line */}
                <a
                  href='https://play.google.com/store/apps/details?id=com.DINORY'
                  target='_blank'
                >
                  <img src={playStoreBadge} alt='' style={{ width: 190 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
