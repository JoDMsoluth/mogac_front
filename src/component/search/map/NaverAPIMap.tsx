import React, { useEffect, useState, useRef } from 'react';
// react-naver-map : next js에서 사용하기 힘들어서 동적 스크립트와 쌩 js로 DOM을 이용해서 사용
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import UserGql from '../../../lib/gql/userGql';
import RenderNearUserList from './RenderNearUserList';

// global 객체, naver, MarkerClustering, N 객체를 따로 ts에서 사용할 수 있도록 정의
declare global {
  interface Window {
    naver: any;
  }
  const naver: any;
  const MarkerClustering: any;
  const N: any;
}

interface SearchingUserListProps {
  ableLocation: any;
  ableSkillSet: any;
  level: number;
}

export default function NaverAPIMap({
  ableLocation,
  ableSkillSet,
  level,
}: SearchingUserListProps) {
  const [currentLat, setCurrentLat] = useState<number>(37.42829747263545);
  const [currentLng, setCurrentLng] = useState<number>(126.76620435615891);
  const [updatePosition] = useMutation(UserGql.UPDATE_USER_POSITION);
  let mapInstance = useRef(null);
  // 현재 위치 받기
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setCurrentLat(position.coords.latitude);
        setCurrentLng(position.coords.longitude);
        const result = await updatePosition({
          variables: { position: [currentLng, currentLat] },
        });
        //if (result) {
        // console.log('updated position', result);
        //}
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
    // 지도 옵션 설정
    const mapOptions = {
      mapTypeId: naver.maps.MapTypeId.NORMAL,
      zoom: 13,
    };
    // 지도 초기화
    const map = new naver.maps.Map('map', mapOptions);
    mapInstance.current = map;
    // 드로우 모듈 사용
    //const drawingManager = new naver.maps.drawing.DrawingManager({ map: map });
    // 지도 이동하기
    const currentCenter = new naver.maps.LatLng(currentLat, currentLng);

    map.setCenter(currentCenter); // 중심 좌표 이동
    map.setZoom(13); // 줌 레벨 변경

    // 자기 위치 마커표시
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(currentLat, currentLng),
      map: map,
    });
  }, [currentLng, currentLat]);

  return (
    <>
      <S.MapWrap id="map"></S.MapWrap>
      {ableLocation?.length > 0 && ableSkillSet?.length > 0 && level ? (
        <RenderNearUserList
          map={mapInstance.current}
          ableLocation={ableLocation}
          ableSkillSet={ableSkillSet}
          level={level}
        />
      ) : (
        ''
      )}
    </>
  );
}
const S: any = {};

S.MapWrap = styled.div`
  width: 100%;
  height: 40rem;
  @media (max-width: 450px) {
    height: 20rem;
  }
`;
