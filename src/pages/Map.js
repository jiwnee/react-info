import React from 'react';
import axios from 'axios';
import Gnb from 'pages/Gnb';

const Map = ({match}) => {
  const type = match.params.type;
  console.log(type)

  if(type === 'modify') {
    axios.get('/api/my/cart')
      .then(res => {
        console.log('res..', res)
      })
      .catch(err => {console.log('err..', err)});
  }

  return (
    <div>
      <h2>
        지도 페이지
      </h2>
      <Gnb />
    </div>
  )
}

export default Map;