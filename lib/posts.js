export async function getAllPostsIds() {
  const data = await fetch("http://localhost:3000/api/post", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  }).then((response) => response.json());

  const mappedData = data.posts.map((post) => {
    return {
      params: {
        id: post._id,
      },
    };
  });

  console.log(mappedData);

  return mappedData;
}

export async function getPostData(id, publicUse) {
  const data = await fetch(`http://localhost:3000/api/post/${id}?option=_id`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        publicUse == false ? `Bearer ${process.env.AUTH_TOKEN}` : undefined,
    },
  }).then((response) => response.json());

  return data;
}

export function filterByPublished(posts) {
  return posts.filter(function (post) {
    console.log(post);
    return post.posted === true;
  });
}

export function filterByDraft(posts) {
  return posts.filter(function (post) {
    return post.posted === false;
  });
}

export async function post(title, content, cookies, id) {
  const dataForBody = {
    title: title,
    content: content,
    edited: false,
    posted: true,
  };

  const options = {
    url:
      id !== undefined
        ? `http://localhost:3000/api/post/${id}`
        : "http://localhost:3000/api/post/",
    method: id !== undefined ? "PUT" : "POST",
  };

  const data = await fetch(options.url, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify(dataForBody),
  }).then((response) => response.json());

  return data;
}

export async function saveDraft(title, content, cookies, id) {
  const dataForBody = {
    title: title,
    content: content,
    edited: false,
    posted: false,
  };

  let options = {
    url:
      id !== undefined
        ? `http://localhost:3000/api/post/${id}`
        : "http://localhost:3000/api/post",
    method: id !== undefined ? "PUT" : "POST",
  };

  const data = await fetch(options.url, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify(dataForBody),
  }).then((response) => response.json());

  return data;
}

export async function revertToPosted(title, content, id, cookies) {
  const dataForBody = {
    title: title,
    content: content,
    edited: false,
    posted: true,
  };

  const data = await fetch(`http://localost:3000/api/post/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify(dataForBody),
  }).then((response) => response.json());

  return data;
}

export async function deletePost(id, cookies) {
  const data = await fetch(`http://localhost:3000/api/post/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
  }).then((response) => response.json());

  return data;
}

export async function editPost(title, content, object, cookies) {
  const dataForBody = {
    title: title,
    content: content,
    edited: true,
    posted: object.publish,
  };

  const data = await fetch(`http://localhost:3000/api/post/${object._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify(dataForBody),
  }).then((response) => response.json());

  return data;
}

export async function postComment(comment, id) {
  const dataForBody = {
    comment: comment,
  };

  const data = await fetch(`http://localhost:3000/api/comment/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForBody),
  }).then((response) => response.json());

  return data;
}
