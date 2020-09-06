import react, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import UserGql from '../../../lib/gql/userGql';
import { makeAbleSkillSetLevel } from '../../../lib/utils/skillLevelFormat';
const userAvatar = require('../../../static/images/avatar/1.jpg');

interface RenderNearUserListProps {
  map: any;
  ableLocation: any;
  ableSkillSet: any;
  level: number;
  currentLat: number;
  currentLng: number;
}
export default function RenderNearUserList({
  map,
  ableLocation,
  ableSkillSet,
  level,
  currentLat,
  currentLng,
}) {
  console.log('make', makeAbleSkillSetLevel(ableSkillSet, level));
  const { error, loading, data } = useQuery(
    UserGql.GET_NEAR_USERS_BY_MATCHING,
    {
      variables: {
        ableLocation,
        ableSkillSet: makeAbleSkillSetLevel(ableSkillSet, level),
        x_pos: currentLng,
        y_pos: currentLat,
      },
    },
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('check email error', error);
    return <div></div>;
  }
  if (data) {
    console.log('data', data);
    console.log('map', map);
    data.getNearUsersByMatching.map((user) => {
      var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(user.y_pos, user.x_pos),
        map: map,
        icon: {
          url: userAvatar,
          size: new naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
        },
      });
      const split = user.ableSkillSet[0].split(' ');
      const skill = split[split.length - 1];
      var contentString = [
        `<div style="width: 12rem; height: 6rem; display: flex;flex-direction: column;justify-content: space-evenly;padding: 0.1rem;">`,
        `<div style="display: flex;">`,
        `<img src="${userAvatar}"`,
        `width="50"`,
        `height="50"`,
        `style="margin-left: 0.2rem;"`,
        `/>`,
        `<div style="margin-left: 1rem;">`,
        `<div>${user.name}</div>`,
        `<div>${skill} level</div>`,
        `</div>`,
        `</div>`,
        `<div style="display: flex;justify-content: space-evenly;">`,
        `<button>블로그</button>`,
        `<button>쪽지</button>`,
        `<button>팀초대</button>`,
        `</div>`,
        `</div>`,
      ].join('');

      var infowindow = new naver.maps.InfoWindow({
        content: contentString,
      });

      naver.maps.Event.addListener(marker, 'click', function(e) {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      });
    });
    map.refresh(true);
  }

  return <></>;
}
