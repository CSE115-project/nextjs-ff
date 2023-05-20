import Head from 'next/head';
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";


export default function friendProfile() {

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <Stack direction="row" alignItems="center" spacing={0}>
                <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
                    Friend profile
                </Typography>
            </Stack>

        </div>
    );
}