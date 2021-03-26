import React from 'react';

interface Props {
  text: string;
}

function Deploy(props: Props) {
  const { text } = props;

  return (
    <>
      <div>{text}</div>
    </>
  );
}

export default Deploy;
