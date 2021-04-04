import ReactPlayer from 'react-player';

const stylefull = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '760px',
  height: '480px',
  boxShadow: '8px 8px 16px 8px rgba(0, 0, 0, 0.4)',
};

// const stylemin = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   width: width * 0.7,
//   height: height * 0.25,
//   boxShadow: '8px 8px 16px 8px rgba(0, 0, 0, 0.4)',
// };

export const Features = (props) => {
  return (
    <div id='features' className='text-center'>
      <div
        className='container'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={stylefull}>
          <ReactPlayer
            url='https://youtu.be/_xLlMHapcX4'
            // playing='true'
            width='100%'
            height='100%'
            controls='true'
          />
        </div>

        {/* <div className='row'>
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-xs-6 col-md-3'>
                  {' '}
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : 'Loading...'}
        </div> */}
      </div>
    </div>
  );
};
