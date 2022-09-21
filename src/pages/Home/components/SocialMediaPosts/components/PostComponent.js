import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import TwitterPost from "../../../../../assets/img/twitterPost.jpg";

export default function PostComponent() {
  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardMedia
        component='img'
        height='194'
        image={TwitterPost}
        alt='Post Image'
      />
      <CardHeader
        avatar={
          <Avatar
            alt='Twitter'
            src='https://toppng.com/uploads/preview/line-clipart-computer-icons-social-media-facebook-small-transparent-background-twitter-ico-11562914414jbo8db7bj4.png'
          />
        }
        title='Post Title'
      />

      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ float: "right" }}>
        <Typography variant='body2' color='text.secondary'>
          September 14, 2016
        </Typography>
      </CardActions>
    </Card>
  );
}
