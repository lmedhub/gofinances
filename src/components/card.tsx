import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface CardComponentProps {
  backgroundColor?: string;
  title?: string;
  icon?: any;
  text?: string;
  textColor?: string;
  iconColor?: string;
}

function CardComponent({
  backgroundColor,
  title,
  icon,
  text,
  textColor,
  iconColor,
}: CardComponentProps) {
  return (
    <Card
      sx={{
        backgroundColor: backgroundColor || "white",
        color: textColor || "black",
      }}
    >
      <CardContent sx={{ padding: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          {title && <Typography>{title}</Typography>}
          {icon && <div style={{ color: iconColor || "inherit" }}>{icon}</div>}
        </Box>
        {text && <Typography variant="h4">{text}</Typography>}
      </CardContent>
    </Card>
  );
}

export default CardComponent;
