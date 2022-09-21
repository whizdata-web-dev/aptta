import { useState } from "react";
import { Box } from "@mui/material";
import ContactSecretory from "./contactSecretory/ContactSecretory";
import Map from "./contactMap/Map";

import { contactData } from "../../assets/utils/ContactData";

export default function Contact() {
  const [activeId, setActiveId] = useState(1);
  const [coordinates, setCoordinates] = useState({
    lat: 16.513961,
    lng: 80.612571,
  });

  const handleChange = (event) => {
    setActiveId(event.id);
    setCoordinates({
      lat: event.latitude,
      lng: event.longitude,
    });
  };

  return (
    <Box
      sx={{
        padding: { md: "5rem 1rem 1rem" },
        background: "#f6f5f7",
      }}
    >
      <Box
        className='relative w-full rounded h-600-px'
        sx={{ display: { xs: "block", md: "flex" } }}
      >
        <Box className='w-full px-4'>
          <Box className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
            <Map coordinates={coordinates} />
          </Box>
        </Box>
        <ContactSecretory
          activeId={activeId}
          contactData={contactData}
          handleChange={handleChange}
        />
      </Box>
    </Box>
  );
}
