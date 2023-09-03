import { useState, useEffect } from "react";
import TerminalGame from './components/TerminalGame/TerminalGame';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import FormAuth from "./components/FormAuth/FormAuth";

const firebaseConfig = {
  apiKey: "AIzaSyBUULCn0ex2z_cLSbMXqtIGx6GB36aFQNo",
  authDomain: "a-miami-story.firebaseapp.com",
  projectId: "a-miami-story",
  storageBucket: "a-miami-story.appspot.com",
  messagingSenderId: "41590873540",
  appId: "1:41590873540:web:2b9fbcb9dd4bbe407e1891",
  measurementId: "G-6M88K6538Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [users, setUsers] = useState([]);
  
  async function getData() {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usersData = usersSnapshot.docs.map(doc => doc.data());
    console.log("Fetched users data:", usersData); // Add this line
    setUsers(usersData);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1>A Miami Story</h1>
      {/* <FormAuth /> */}
      <TerminalGame users={users} />
    </div>
  );
}


export default App;
