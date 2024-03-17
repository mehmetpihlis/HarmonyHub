import React from 'react'
import PostCard from './PostCard'

const PostsList = ({posts, handleDelete}) => {
  return (
    <div className='container'>
      <div className='row d-flex justify-content-center align-items-center'>
        {
            posts.map((post) => <PostCard 
                post={post} 
                handleDelete={handleDelete}
                key={post._id} 
            />)
        }
      </div>
    </div>
  )
}

export default PostsList
