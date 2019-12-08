import React from 'react';
import queryString from 'query-string';
import Gnb from 'pages/Gnb';

const Review = ({location, match}) => {
  const query = queryString.parse(location.search);
  return (
    <div>
      <h2>리뷰 페이지 :: {match.params.name}</h2>
      {/** 조건부 렌더링 */
        Object.keys(query).length > 0 && (<div>params : {JSON.stringify(query)}</div>)
      }
      <Gnb />
    </div>
  )
}

export default Review;