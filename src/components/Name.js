import { async } from "@firebase/util";
import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Name = ({ nameObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(nameObj.text);
    const NameTextRef = doc(dbService, "names", $(nameObj.id));
    const onDeleteClick = async () => {
        const ok = window.confirm("Sure you want to delete your name?");
        if (ok) {
            await deleteDoc(NameTextRef);
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const {target:{value}, } = event;
        setNewName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(NameTextRef, {
            text: newName,
        });
    };
    return (
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="Edit your name" value={newName} onChange={onChange} required />
                            <input type="submit" value="Update" />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{nameObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete</button>
                                <button onClick={toggleEditing}>Change</button>
                            </>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Name;