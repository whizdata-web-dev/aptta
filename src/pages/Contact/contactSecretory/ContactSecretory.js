import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function ContactSecretory({
  activeId,
  contactData,
  handleChange,
}) {
  return (
    <List
      className='secretoryList'
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", md: "500px" },
        bgcolor: "background.paper",
        margin: "0 1rem 0 0",
        overflowY: "auto",
        border: "2px solid #f6f5f7",
      }}
    >
      {contactData.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <ListItem
              alignItems='flex-start'
              onClick={() => handleChange(item)}
              sx={{ borderLeft: activeId === item.id ? "2px solid #252525" : "" }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ backgroundColor: "#ff6d00" }}
                  alt={item.contactPerson}
                  src='/static/images/avatar/1.jpg'
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.locationName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline", fontWeight: "bold" }}
                      component='span'
                      variant='body1'
                      color='text.primary'
                    >
                      {item.contactPerson}
                    </Typography>
                    <br />
                    <Typography
                      sx={{ display: "inline" }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      Phone&nbsp;-&nbsp;
                    </Typography>
                    {item.contactMobile}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider
              variant='inset'
              component='li'
              sx={{ display: item === 9 ? "none" : "block" }}
            />
          </React.Fragment>
        );
      })}
    </List>
  );
}
