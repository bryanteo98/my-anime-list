import { Card, Grid, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router";
import type { AnimeSeasonData } from "~/hooks/animeApi";

export default function AnimeGrid({
  data,
  loading,
}: {
  data: AnimeSeasonData[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <Grid container spacing={2} component="div">
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 5,
              lg: 4,
              xl: 3,
            }}
            component="div"
            className="flex flex-col items-center"
            key={index}
          >
            <Skeleton
              variant="rectangular"
              width={225}
              height={320}
              sx={{ bgcolor: "gray" }}
            />
            <Skeleton variant="text" width={225} sx={{ bgcolor: "gray" }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Grid
        container
        spacing={2}
        component="div"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: 300 }}
      >
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 5,
            lg: 4,
            xl: 3,
          }}
          className="flex flex-col items-center"
        >
          <Typography className="text-white text-center" variant="h5">
            No results found
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} component="div">
      {data.map((anime) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 5,
            lg: 4,
            xl: 3,
          }}
          component="div"
          className="flex flex-col items-center"
          key={anime.mal_id}
        >
          <Link to={`anime/${anime.mal_id}`}>
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                maxWidth: 225,
                aspectRatio: "225 / 320",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
                margin: "0 auto",
              }}
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 320,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
            </Card>
            <h5
              className="pt-2 text-white text-center break-words"
              style={{
                width: 225,
                margin: "0 auto",
              }}
            >
              {anime.title}
            </h5>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
