import react, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import postGql from '../../lib/gql/postGql';
import PersonalBlogHeader from './PersonalBlogHeader';
import PersonalBlogBody from './PersonalBlogBody';

interface PersonalBlogProps {
  userId: string;
  page: number;
}

const PersonalBlog = ({ userId, page }: PersonalBlogProps) => {
  const [posts, setPosts] = useState(null);
  console.log('posts', posts);

  const { data, error } = useQuery(postGql.GET_ALL_POSTS_BY_USER, {
    variables: {
      userId,
      page: 1,
    },
  });

  if (error) {
    console.log('get users error', error);
  }
  useEffect(() => {
    if (data) {
      setPosts(data.getAllPostsByUser);
    }
  }, [data, posts]);
  return (
    <>
      {posts && (
        <>
          <PersonalBlogHeader userName={posts.name} />
          <PersonalBlogBody page={page} posts={posts.posts} userId={userId} />
        </>
      )}
    </>
  );
};

export default PersonalBlog;
