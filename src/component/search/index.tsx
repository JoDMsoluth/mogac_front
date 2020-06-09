import react, { useEffect, useState } from 'react';
import SearchFilterBox from './filterbox/SelectFilterBox';
import NaverAPIMap from './map/NaverAPIMap';
import SearchingUserList from './users/SearchingUserList';
import { useQuery } from '@apollo/react-hooks';
import UserGql from '../../lib/gql/userGql';
import RenderNearUserList from './map/RenderNearUserList';

export default function Search() {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.MAP_API_KEY}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.async = true;
    script2.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.MAP_API_KEY}&submodules=drawing`;
    document.head.appendChild(script2);
  });
  const [ableLocation, changeAbleLocation] = useState([]);
  const [ableSkillSet, changeAbleSkillSet] = useState([]);

  return (
    <>
      <section>
        <SearchFilterBox
          changeAbleLocation={changeAbleLocation}
          changeAbleSkillSet={changeAbleSkillSet}
        />
        <NaverAPIMap ableLocation={ableLocation} ableSkillSet={ableSkillSet} />
        <SearchingUserList
          ableLocation={ableLocation}
          ableSkillSet={ableSkillSet}
        />
      </section>
    </>
  );
}
