import React, { useRef, useCallback, useEffect, FC } from 'react';
import styled, { css } from 'styled-components';
import useInput from '../../lib/hooks/useInput';
import palette from '../../lib/pallete';

interface UploadAvatarProps {
  avatar: string;
  setAvatar: () => void;
}

export default function UploadAvatar({ avatar, setAvatar }) {
  const imageInput = useRef(null);

  const onChangeImage = useCallback(
    (e) => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
        // 'image'는 서버에서도 같은 네이밍을 씀 / 키-벨류 / ajax에서 사용
      });
      console.log(imageFormData.getAll('image'));
      setAvatar(avatar);
    },
    [avatar],
  );

  const onClickImageUpload = useCallback(
    (e) => {
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
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImage}
        />
        {avatar && (
          <Thumbnail avatar={`${process.env.REACT_APP_SERVER_URL}/${avatar}`} />
        )}
        <span>Upload</span>
      </ImageWrap>
    </>
  );
}

const ImageWrap = styled.div`
  border: 1px dashed ${palette.gray6};
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
