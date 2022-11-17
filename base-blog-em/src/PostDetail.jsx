import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
  console.log(postId);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { id } = post;
  const { data, isLoading, isError, error } = useQuery(["comment", id], () =>
    fetchComments(id)
  );
  const deleteMutation = useMutation((id) => deletePost(id));
  const updateMutation = useMutation((id) => updatePost(id));

  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Error</h3>
        <p>{error.toStirng()}</p>
      </>
    );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && <p style={{ color: "red" }}>Error</p>}
      {deleteMutation.isLoading && <p style={{ color: "blue" }}>Loading ...</p>}
      {deleteMutation.isSuccess && <p style={{ color: "green" }}>Success</p>}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isError && <p style={{ color: "red" }}>Error</p>}
      {updateMutation.isLoading && (
        <p style={{ color: "yellow" }}>Loading ...</p>
      )}
      {updateMutation.isSuccess && <p style={{ color: "green" }}>Success</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
