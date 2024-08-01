import axios from "axios";
import { useState, useEffect } from "react";

import { Container, Pagination, TextField, Stack, Link } from "@mui/material";
const BASE_URL = "http://hn.algolia.com/api/v1/search?";

function App() {
  // полученные посты
  const [posts, setPosts] = useState([]);
  // наш запрос
  const [query, setQuery] = useState("react");
  // текущая страница
  const [page, setPage] = useState(1);
  // всего страниц
  const [pageQty, setPageQty] = useState(0);

  useEffect(() => {
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(({ data }) => {
      console.log(data);
      setPosts(data.hits);
      setPageQty(data.nbPages);

      if (data.nbPages < page) setPage(1);
    });
  }, [query, page]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <TextField
        fullWidth
        label="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></TextField>

      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            showFirstButton
            showLastButton
            count={pageQty}
            page={page}
            onChange={(_, num) => setPage(num)}
            sx={{
              marginTop: 3,
              marginBottom: 3,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        )}

        {posts.map((post) => (
          <Link key={post.objectID} href={post.url}>
            {post.title || post.story_title}
          </Link>
        ))}
      </Stack>
    </Container>
  );
}

export default App;
