import react, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/pallete';

interface PostRightPanelProps {}

export default function PostRightPanel({}: PostRightPanelProps) {
  const imageInput = useRef(null);
  const coverImg = useRef(null);

  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
      // 'image'는 서버에서도 같은 네이밍을 씀 / 키-벨류 / ajax에서 사용
    });
    console.log(imageFormData.getAll('image'));
  }, []);
  const onClickImageUpload = useCallback(
    (e) => {
      imageInput.current!.click();
    },
    [coverImg],
  );

  return (
    <>
      <S.RightPanelWrap>
        <S.ImageWrap onClick={onClickImageUpload}>
          <input
            id="image"
            type="file"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImage}
          />
          {coverImg && <Thumbnail />}
          <span>Upload</span>
        </S.ImageWrap>
        <input type="text" name="series" value="series" placeholder="Series" />
        <input
          type="text"
          name="category"
          value="category"
          placeholder="Category"
        />
        <input type="text" name="tags" value="tags" placeholder="Tags" />
      </S.RightPanelWrap>
    </>
  );
}

const S: any = {};

S.RightPanelWrap = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0 1rem 1rem 0.5rem;
`;

S.ImageWrap = styled.div`
  border: 1px dashed ${palette.gray6};
  margin-right: 1rem;
  width: 100%;
  height: 5rem;
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

const Thumbnail = styled.div`
  width: 100%;
  height: 100%;
  background-position: 50% 50%;
  background-size: cover;
`;
