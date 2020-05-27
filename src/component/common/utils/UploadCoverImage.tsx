import React, { useRef, useCallback, useEffect, FC } from 'react';
import styled from 'styled-components';
import useInput from '../../../lib/hooks/useInput';
import palette from '../../../lib/pallete';
import { useMutation } from '@apollo/react-hooks';
import { useWrite } from '../../../utils/write/WriteProvide';

export default function UploadCoverImage() {
  const { state, dispatch } = useWrite();
  const { cover_img } = state;
  //const [avatarUpload] = useMutation(PostGql.Upload_Cover_Image);
  const imageInput = useRef(null);

  const readURL = (file: File) => {
    const reader = new FileReader();

    reader.onload = function(e) {
      dispatch({ type: 'ChangeCoverImg', data: e.target.result });
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
      console.log('avatar', cover_img);
    },
    [
      cover_img,
      //    , avatarUpload
    ],
  );

  const onClickImageUpload = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      imageInput.current!.click();
    },
    [cover_img],
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
        {cover_img && <Thumbnail avatar={cover_img} />}
        <span>Upload</span>
      </ImageWrap>
    </>
  );
}

const ImageWrap = styled.div`
  border: 1px dashed ${palette.gray6};
  box-sizing: border-box;
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
