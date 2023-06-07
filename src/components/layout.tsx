import { Box } from "@mui/material";
import NavBar from "./appbar";

export default function Layout({ children }: any) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
