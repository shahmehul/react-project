import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './Posts.css';

interface Post {
    body: string,
    id: number,
    title: string,
    userId: number
}

function Posts(){
    const [posts, setPosts] = useState<Post[]>([])
    const { userId } = useParams();
    console.log(userId)

    useEffect( ()=> {
        const fetchPosts = async ()=> {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            const posts = await response.json();
            console.log(posts);
            setPosts(posts);
            
        }
        fetchPosts();
    },[userId])
    return (<>
        <h1>Posts</h1>
        {
            posts.map((post,id)=>(
                <div key={id} className="post-container">
                    <p className="title"> {post.title} </p>
                    <div className="post"> {post.body} </div>
                </div>
            ))
        }
    </>)
}

export default Posts;