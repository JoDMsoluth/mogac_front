import React, { useRef, useCallback, useEffect, FC } from 'react';
import styled, { css } from 'styled-components';
import useInput from '../../lib/hooks/useInput';
import palette from '../../lib/pallete';
import { useMutation } from '@apollo/react-hooks';
import UserGql from '../../lib/userGql';

interface UploadAvatarProps {
  avatar: string;
  setAvatar: () => void;
}

export default function UploadAvatar({ avatar, setAvatar }) {
  const [avatarUpload] = useMutation(UserGql.UPLOAD_PROFILE_IMAGE);

  const imageInput = useRef(null);

  const onChangeImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        validity,
        files: [file],
      } = e.target;
      if (validity.valid) {
        console.log('file data ', file, validity);
        const result = await avatarUpload({ variables: { file } });
        console.log('muation data ', result);
      }
      setAvatar(file);
      console.log('avatar', avatar);

      // const imageFormData = new FormData();
      // [].forEach.call(e.target.files, (f) => {
      //   imageFormData.append('image', f);
      //   // 'image'는 서버에서도 같은 네이밍을 씀 / 키-벨류 / ajax에서 사용
      // });
      // console.log(imageFormData.getAll('image'));
      // setAvatar(e.target.files);
      // console.log('avatar', avatar);
    },
    [avatar, avatarUpload],
  );

  const onClickImageUpload = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      imageInput.current!.click();
    },
    [avatar],
  );

  return (
    <>
      <ImageWrap onClick={onClickImageUpload}>
        <input
          id="image"
          type="file"
          required
          hidden
          ref={imageInput}
          onChange={onChangeImage}
        />
        {avatar && <Thumbnail avatar={avatar} />}
        <span>Upload</span>
      </ImageWrap>
    </>
  );
}

const ImageWrap = styled.div`
  border: 1px dashed ${palette.gray6};
  border-radius: 5px;
  margin-right: 1rem;
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
  & > span {
    position: absolute;
    top: 150%;
    right: 50%;
    transform: translateX(50%);
  }
  &:hover {
    border: 2px dashed ${palette.gray7};
    color: ${palette.gray7};
    cursor: pointer;
  }
  &:hover > span {
    top: 50%;
    right: 50%;
    transform: translate(50%, -52%);
    transition: all 0.3s ease-in;
  }
`;

interface ThumbnailProps {
  avatar: string;
}
const Thumbnail = styled.div<ThumbnailProps>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.avatar});
  background-position: 50% 50%;
  background-size: cover;
` as FC<ThumbnailProps>;
