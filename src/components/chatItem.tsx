import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const extractCodeFromMsg = (message: string) => {
  if (message.includes("```")) {
    const messageBlocks = message.split("```");
    return messageBlocks;
  }
};

const extractBlocksFromMsg = (message: string) => {
  if (message.includes("**")) {
    return message.split("**");
  }
};

const isCodeBlock = (str: string) => {
  if (
    (str.includes(";") ||
      str.includes("//") ||
      str.includes("+") ||
      str.includes("=") ||
      str.includes("#") ||
      str.includes("[") ||
      str.includes("]") ||
      str.includes("{") ||
      str.includes("}")) &&
    !str.includes("**")
  ) {
    return true;
  }
  return false;
};

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "model";
}) => {
  const auth = useAuth();
  const messageBlocksWithCode = extractCodeFromMsg(content);
  const messageBlocks = extractBlocksFromMsg(content);

  return role === "model" ? (
    <Box display={"flex"} p={2} gap={2} my={1} width={"100%"}>
      <Avatar sx={{ ml: 0, bgcolor: "transparent" }}>
        <img
          src="google-gemini-icon.png"
          alt="ai-logo"
          style={{ width: "42px" }}
        />
      </Avatar>
      {!messageBlocksWithCode && !messageBlocks && (
        <Typography sx={{ fontSize: "18px" }}>{content}</Typography>
      )}

      {messageBlocks && !messageBlocksWithCode && messageBlocks.length && (
        <Box display={"flex"} flexDirection={"column"}>
          {messageBlocks.map((msgBlock) => (
            <Typography sx={{ fontSize: "18px", display: "flex", my: 1 }}>
              {msgBlock}
            </Typography>
          ))}
        </Box>
      )}

      <Box
        display={"flex"}
        flexDirection={"column"}
        sx={{ overflow: "scroll", overflowX: "auto", overflowY: "hidden" }}
      >
        {messageBlocksWithCode &&
          messageBlocksWithCode.length &&
          messageBlocksWithCode.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                style={coldarkDark}
                language="javascript"
                customStyle={{ width: "500px" }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Box display={"flex"} flexDirection={"column"}>
                {extractBlocksFromMsg(block)?.map((msgBlock) => (
                  <Typography sx={{ fontSize: "18px", display: "flex", my: 1 }}>
                    {msgBlock}
                  </Typography>
                ))}
              </Box>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      display={"flex"}
      alignItems={"center"}
      p={2}
      gap={2}
      sx={{ width: "fit-content", borderRadius: "40px" }}
    >
      <Avatar sx={{ ml: 0, bgcolor: "white", color: "black" }}>
        {auth?.user?.name[0]}
      </Avatar>
      <Typography
        sx={{
          fontSize: "18px",
          bgcolor: "#2f2f2f",
          paddingX: "30px",
          paddingY: "10px",
          borderRadius: "30px",
        }}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default ChatItem;
