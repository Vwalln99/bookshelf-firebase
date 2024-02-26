import { useState, useEffect, ChangeEvent } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth, storage } from "./firebaseInit";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export type TBook = {
  id: string;
  title: string;
  author: string;
  pages: number;
  read: boolean;
  createdAt: Date;
  imageUrl?: string;
  uid?: string;
  storageUrl?: string;
};

export default function useBooks() {
  const [books, setBooks] = useState<TBook[]>([]);
  const addBook = async (book: TBook) => {
    const { uid } = auth.currentUser!;
    const docRef = await collection(db, "books");
    await addDoc(docRef, {
      ...book,
      uid,
      createdAt: new Date(),
      imageUrl: "",
    });
  };
  const deleteBook = async (book: TBook) => {
    await deleteDoc(doc(db, "books", book.id));
    if (book.imageUrl) {
      const imageRef = ref(storage, book.storageUrl);
      await deleteObject(imageRef);
    }
  };

  const editBook = async (book: TBook) => {
    const docRef = doc(db, "books", book.id);
    await updateDoc(docRef, book);
  };
  const addImage = async (
    event: ChangeEvent<HTMLInputElement>,
    book: TBook
  ) => {
    event.preventDefault();
    const LOADING_IMAGE_URL = "https://www.google.com/images/spin-32.gif?a";
    const file = (event.target as HTMLInputElement).files![0];
    const { uid } = auth.currentUser!;
    try {
      const filepath = `${uid}/${book.id}/${file.name}`;
      const newImageRef = ref(storage, filepath);
      const upLoadTask = await uploadBytesResumable(newImageRef, file);
      const publicImgUrl = await getDownloadURL(upLoadTask.ref);
      const docRef = doc(db, "books", book.id);
      await setDoc(docRef, {
        ...book,
        imageURL: LOADING_IMAGE_URL,
        storageUrl: upLoadTask.metadata.fullPath,
      });
      await updateDoc(docRef, {
        imageURL: publicImgUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const q = query(collection(db, "books"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      setBooks(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TBook))
      );
    });
  }, []);
  return [books, addBook, deleteBook, addImage, editBook];
}
