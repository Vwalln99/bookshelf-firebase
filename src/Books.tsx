import { Grid, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import  AddPhotoAlternateIcon  from "@mui/icons-material/AddPhotoAlternate";
import useBooks from "./firebase/useBooks";

const typoStyle = {
    pt: 2,
    display: "flex",
    justifyContent: "space-between",
};

export default function BookCard(){
    const [books] = useBooks();
    return(
        <>
        {
            books && 
            books.map((book) => {
                return(
                    <Grid key={book.id} item xs={12} sm={6} md={4}>
                        <Paper
                        elevation={2}
                        sx={{padding: 2,}}
                        >
                            {book.imageUrl && (
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    style={{maxWidth: "100%"}}
                                />
                            )}
                            <Typography variant="h5" component="h3" sx={typoStyle}>
                                Title: <span>{book.title}</span>
                            </Typography>
                            <Typography variant="h5" component="h3" sx={typoStyle}>
                                Author: <span>{book.author}</span>
                            </Typography>
                            <Typography variant="h5" component="h3" sx={typoStyle}>
                                Pages: <span>{book.pages}</span>
                            </Typography>
                            <Typography variant="h5" component="h3" sx={typoStyle}>
                                Read: <span>{book.read ? "read" : "not read"}</span>
                            </Typography>
                            <div 
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: 30,
                                borderTop: "0.5px solid #333",
                            }}
                            >
                                <IconButton color="primary" component="label">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => e.preventDefault()}
                                    >
                                    </input>
                                    <AddPhotoAlternateIcon/>
                                </IconButton>
                                <IconButton 
                                color="primary" component="button"
                                onClick={(e) => e.preventDefault()}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton 
                                color="primary" component="button"
                                onClick={(e) => e.preventDefault()}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </div>
                        </Paper>
                    </Grid>
                );
            })}
        </>
    );
}
