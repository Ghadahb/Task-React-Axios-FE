import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Switch } from "react-router";
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );

      setRooms([...rooms, response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  // to do : call BE to create a room

  const deleteRoom = async (roomId) => {
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`
      );
      let tempRoom = rooms.filter((room) => room.id !== roomId);
      setRooms(tempRoom);
    } catch (error) {
      console.log(error);
    }
  };
  // to do : call BE to delete a room

  const updateRoom = async (roomId, data) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`,
        data
      );
      const updatedRooms = rooms.map((room) =>
        room.id === roomId ? response.data : room
      );
      setRooms(updatedRooms);
    } catch (error) {
      console.log(error);
    }
  };

  const createMessage = async (roomId, msg) => {
    try {
      const response = await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`,
        msg
      );
      fetchRooms();
    } catch (error) {
      console.log(error);
    }
  };

  // to do : call BE to delete a room
  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} createMessage={createMessage} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList
                rooms={rooms}
                createRoom={createRoom}
                deleteRoom={deleteRoom}
                updateRoom={updateRoom}
              />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
