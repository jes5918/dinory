import { useState } from 'react';
export const Navigation = (props) => {
  // 스크롤 이벤트
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset < 500) {
      setScrolled(false);
    } else {
      setScrolled(true);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <nav
      id='menu'
      className={
        scrolled
          ? 'navbar navbar-default navbar-fixed-top'
          : 'navbar navbar-default navbar-fixed-top deactive'
      }
    >
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='page-scroll navbar-left' href='#page-top'>
            <img className='logo' src='img/logo1.png' alt='' />
          </a>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#header' className='page-scroll'>
                Download
              </a>
            </li>
            <li>
              <a href='#features' className='page-scroll'>
                UCC
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                services
              </a>
            </li>
            <li>
              <a href='#portfolio' className='page-scroll'>
                Gallery
              </a>
            </li>
            <li>
              <a href='#team' className='page-scroll'>
                Team
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
