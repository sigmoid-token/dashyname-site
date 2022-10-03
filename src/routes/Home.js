import { dbService } from "fbase";
import { addDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [name, setName] = useState("");
    const [names, setNames] = useState([]);
    useEffect(() => {
        const q = query(collection(dbService, "names"), orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const nameArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNames(nameArr);
        });
    }, []);
    const onSubmit = async (event)  => {
        event.preventDefault();
        await addDoc(collection(dbService, "names"), {
            name,
            createdAt: Date.now(),
            creatorId: userObj.uid,});
        setName("");
    };
    const onChange = (event) => {
        const {target:{value}, } = event;
        setName(value);
    };
    return (
        <div>
            <form>
                <input value={name} onChange={onChange} type="text" placeholder="Type in your name: " maxLength="120" />
                <input type="file" accept="image/*" />
                <input type="submit" onSubmit={onSubmit} value="Brag" />
            </form>
            <div>
                {names.map((name) => (
                    <div key={name.id} nameObj={name} isOwner={name.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
}
export default Home;