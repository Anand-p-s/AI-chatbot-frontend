import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { deleteAllChats, fetchAllChats, sendChatRequest } from "../helpers/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "model" | "user";
  parts: [{ text: string }];
};

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading chats", { id: "loadchats" });
      fetchAllChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("failed to load chats", { id: "loadchats" });
        });
    }

    if (!auth?.isLoggedIn) {
      return navigate("/login")
    }
  }, [auth]);

  const handleDelete = async () => {
    try {
      toast.loading("deleting chats", { id: "deletechats" });
      await deleteAllChats();
      setChatMessages([]);
      toast.success("chats successfully deleted", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("failed to delete chats", { id: "deletechats" });
    }
  };

  const handleSubmit = async () => {
    const message = inputRef.current?.value as string;
    if (inputRef.current?.value) inputRef.current.value = "";
    const newMessage: Message = { role: "user", parts: [{ text: message }] };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(message);
    setChatMessages([...chatData.chats]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "#171717",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              mt: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", p: 3, textAlign: "center" }}>
            Hi, {auth?.user?.name} you are talking to an AI chat-bot
          </Typography>
          <Button
            onClick={handleDelete}
            sx={{
              bgcolor: red[300],
              color: "white",
              width: "200px",
              mx: "auto",
              my: "auto",
              borderRadius: 5,
              ":hover": { bgcolor: red.A400 },
            }}
          >
            clear conversation
          </Button>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flex={{ md: 0.8, sm: 1, xs: 1 }}
        px={3}
        flexDirection={"column"}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "600",
            mx: "auto",
            mb: "5px",            
          }}
        >
          Model - gemini-1.5-flash
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
          height={"70vh"}
          overflow={"scroll"}
          sx={{ overflowX: "hidden", overflowY: "auto" }}
        >
          {chatMessages.map((chat, i) => (
            <ChatItem
              role={chat.role as "user" | "model"}
              content={chat.parts[0].text}
              key={i}
            />
          ))}
        </Box>
        <Box
          sx={{
            width: {lg:"60%",md: "90%", sm: "100%", xs: "100%"},
            height: "52px",
            borderRadius: 36,
            backgroundColor: "#2f2f2f",
            display: "flex",
            margin: "auto",
            alignItems: "center",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="enter your prompt here..."
            style={{
              backgroundColor: "transparent",
              width: "100%",
              padding: "40px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "18px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ color: "white", mr: "auto", padding: "30px" }}
          >
            <IoMdSend />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
