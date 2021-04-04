export const About = (props) => {
  return (
    <div id='about'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-8'>
            {' '}
            <img
              src='img/about/captioning.png'
              className='img-responsive about-img'
              alt=''
            />{' '}
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='about-text'>
              <h2>Image Captioning</h2>
              <p>
                사용자는 일상의 사진들을 업로드하고, AI가 업로드 된 이미지를
                기반으로 영어 단어를 캡셔닝 하여 유저에게 제공합니다. 또한 TTS를
                활용하여 사용자가 영어 단어의 발음을 들을 수 있으며, 카드를
                뒤집으면 단어의 뜻 또한 알 수 있습니다. 더 나아가 단어를
                체크하여 나만의 단어장에 추가하여, 단어 리스트 메뉴에서 확인할
                수 있습니다!
              </p>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <div className='about-text'>
              <h2>Grammar Check</h2>
              <p>
                이미지 캡셔닝 된 단어들을 기반으로 일상을 기록할 수 있는 일기
                작성 페이지 입니다. 사용자는 영어로 내용을 입력하고, 문법체크를
                통해서 문법적인 오류를 발견할 수 있습니다. 이를 통해 올바른
                문장을 작성하게 하여 영어 문장 구조를 학습할 수 있습니다.
              </p>
            </div>
          </div>
          <div className='col-xs-12 col-md-8'>
            {' '}
            <img
              src='img/about/writediary.png'
              className='img-responsive about-img'
              alt=''
            />{' '}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className='row'>
          <div className='col-xs-12 col-md-8'>
            {' '}
            <img
              src='img/about/wordlist.jpg'
              className='img-responsive about-img'
              alt=''
            />{' '}
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='about-text'>
              <h2>Word List</h2>
              <p>
                이미지 캡셔닝 된 단어를 기반으로 사용자가 원하는 단어들을
                저장하고, 단어 카드를 클릭하여 단어의 뜻, 품사, 예시문장을
                확인할 수 있습니다. 또한 플립카드 형식을 적용하고, 누르면 단어의
                발음 또한 들을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <div className='about-text'>
              <h2>Interactive Tutorial</h2>
              <p>
                앱 사용자의 초기 접근성을 향상하기 위해 인터렉티브 튜토리얼을
                적용하였습니다. DINORY를 처음 사용해보시나요? 그럼 Interactive
                Tutorial이 자세히 알려줄거에요 ^.^
              </p>
            </div>
          </div>
          <div className='col-xs-12 col-md-8'>
            {' '}
            <img
              src='img/about/interacitvetutorial.jpg'
              className='img-responsive about-img'
              alt=''
            />{' '}
          </div>
        </div>
      </div>
    </div>
  );
};
