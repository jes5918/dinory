import playStoreBadge from '../assets/google-play-badge.png';

export const Header = (props) => {
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  SSAFY 4th PROJECT
                  <br />
                  <span>play with Dinory</span>
                </h1>
                <p>Compatible with Android Devices</p>
                {/* <br /> */}
                {/* <p>DAEJEON B105</p> */}
                <a
                  href='#features'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Learn More
                </a>
                {/* eslint-disable-next-line */}
                <a href='https://j4b105.p.ssafy.io/' target='_blank'>
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
