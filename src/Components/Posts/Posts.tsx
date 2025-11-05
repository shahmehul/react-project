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
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    

    useEffect( ()=> {
        try{
            setLoading(true);
            const fetchPosts = async ()=> {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                const posts = await response.json();
                console.log(posts);
                setPosts(posts);
                setLoading(false);
            }
            fetchPosts();
        } catch(err:any){
            setError('there was some error')
            setLoading(false);
        }finally{
            setLoading(false);
        }
        
        
    },[userId])

    if (loading) return (<> Loading ...</>)
    if (error) return (<> {error}</>)
    if (!posts.length) return (<> No Posts found.</>)

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