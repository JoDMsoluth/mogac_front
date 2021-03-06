import React, { useRef, useCallback, useEffect, FC } from 'react';
import styled, { css } from 'styled-components';
import useInput from '../../../lib/hooks/useInput';
import palette from '../../../lib/pallete';
import { useMutation } from '@apollo/react-hooks';
import UserGql from '../../../lib/gql/userGql';
import { useUser } from '../../../utils/user/UserProvide';

export default function UploadAvatar() {
  const { state, dispatch } = useUser();
  const { image_url } = state;
  const [avatarUpload] = useMutation(UserGql.UPLOAD_PROFILE_IMAGE);

  const imageInput = useRef(null);

  const readURL = (file: File) => {
    const reader = new FileReader();

    reader.onload = function(e) {
      if (file.size > 1024 * 400)
        return alert('400KB 이하의 파일만 업로드 가능합니다.');
      if (!file.type.includes('image'))
        return alert('이미지 파일만 업로드 가능합니다.');
      dispatch({ type: 'ChangeImageUrl', data: e.target.result });
    };
    return reader.readAsDataURL(file); // convert base64 to string
  };

  const onChangeImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        validity,
        files: [file],
      } = e.target;
      if (validity.valid) {
        console.log('file data ', file, validity);
        // s3 upload
        // const result = (await avatarUpload({ variables: { file } })) as any;
        readURL(file);
      }
      console.log('avatar', image_url);
    },
    [image_url, avatarUpload],
  );

  const onClickImageUpload = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      imageInput.current!.click();
    },
    [image_url],
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
        {image_url && <Thumbnail avatar={image_url} />}
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
