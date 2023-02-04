export async function getAllPostsUrl() {
  const data = await fetch("http://localhost:3000/api/post", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  const mappedData = data.posts.map((post) => {
    return {
      params: {
        id: post.url,
      },
    };
  });

  console.log(mappedData);

  return mappedData;
}

export async function getPostData(id, publicUse) {
  const data = await fetch(`http://localhost:3000/api/post/${id}?option=url`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        publicUse == false ? `Bearer ${process.env.AUTH_TOKEN}` : undefined,
    },
  }).then((response) => response.json());

  return data;
}
