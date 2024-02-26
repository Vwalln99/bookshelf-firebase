import { Grid, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import  AddPhotoAlternateIcon  from "@mui/icons-material/AddPhotoAlternate";
import useBooks, { TBook } from "./firebase/useBooks";
import { ChangeEvent } from "react";
import { auth } from "./firebase/firebaseInit";

const typoStyle = {
    pt: 2,
    display: "flex",
    justifyContent: "space-between",
};

export default function BookCard(){
    const [books, ,deleteBook, addImage, editBook] = useBooks();
    return(
        <>
        {
            books && 
            (books as TBook[])
            .filter((book) =>book.uid === auth.currentUser?.uid)
            .map((book) => {
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
                                        onChange={(e) => 
                                            (addImage as (
                                                e: ChangeEvent<HTMLInputElement>,
                                                book:TBook
                                            )=> void
                                    )(e, book)}
                                    >
                                    </input>
                                    <AddPhotoAlternateIcon/>
                                </IconButton>
                                <IconButton 
                                color="primary" component="button"
                                onClick={() => (deleteBook as (book:TBook) => void)(book)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton 
                                color="primary" component="button"
                                onClick={() => (editBook as (book:TBook)=> void)(book)}
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
