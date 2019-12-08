import React from 'react';

const Gnb = () => {
  return (
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/map">지도</a></li>
      <li><a href="/map/write">지도 작성</a></li>
      <li><a href="/map/modify">지도 수정 & API 호출</a></li>
      <li><a href="/review">리뷰</a></li>
      <li><a href="/review/write?test=111">리뷰 파라미터 Test</a></li>
      <li><a href="/game">틱택토 게임</a></li>
    </ul>
  )
}

export default Gnb;