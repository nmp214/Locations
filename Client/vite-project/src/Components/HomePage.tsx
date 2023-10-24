import { Paper } from "@mui/material";
import React from "react";


const HomePage: React.FC<any> = ({ children }) => {
  const url = 'https://firebasestorage.googleapis.com/v0/b/imglocations.appspot.com/o/images%2F%D7%9E%D7%A6%D7%9C%D7%9E%D7%94.jpg?alt=media&token=6e560377-d581-435e-84ab-881d352e91d2';
  return (
    <Paper
      sx={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >
      {children}
    </Paper>
  );
};

export default HomePage;
