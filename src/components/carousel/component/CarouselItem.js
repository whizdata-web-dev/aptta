import { Card, CardMedia, Typography } from "@mui/material";
import TwitterPost from "../../../assets/img/twitterPost.jpg";

const CarouselItem = () => {
  return (
    <Card
      sx={{
        borderRadius: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: '320px',
        maxWidth: "388px",
      }}
    >
      <CardMedia
        component='img'
        height='194'
        width='100%'
        image={TwitterPost}
        alt='Post Image'
      />
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ marginBlock: "1rem" }}
      >
        Card Description
      </Typography>
    </Card>
  );
};

export default CarouselItem;
