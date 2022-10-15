import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Button, Link} from "@mui/material";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import Grid from "@mui/material/Unstable_Grid2";
import NavBar from "../NavBar";

const links = [
    {name: "Home", url: "/"},
    {name: "Product", url: "/product"},
    {name: "Product Gallery", url: "/products"},
    {name: "ShoppingCart", url: "/cart"},
    {name: "Checkout", url: "/checkout"},
];

export default function Header() {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                {/*<Toolbar>*/}
                <Grid container>
                    <Grid item xs={0.5} md={0.5}>
                        <NavBar />
                    </Grid>
                    <Grid item xs={1} md={1} display={{xs: "none", md: "block"}}>
                        <Link href="/" underline="none" color="white">
                            <Button variant="secondary">Placeholder</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={8} sx={{flex: 1}}>
                        <SearchBar />
                    </Grid>
                    <Grid item xs={1}>
                        <UserMenu/>
                    </Grid>
                </Grid>
                {/*</Toolbar>*/}
            </AppBar>


            <Toolbar
                component="nav"
                variant="dense"
                sx={{justifyContent: "center", overflowX: "auto"}}
            >
                {links.map((link, idx) => {
                    return (
                        <Link
                            color="inherit"
                            noWrap
                            key={idx}
                            variant="body1"
                            href={link.url}
                            sx={{p: 1, flexShrink: 0}}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </Toolbar>
        </Box>
    );
}
