import { TypeAnimation } from "react-type-animation";

const TypeAnim = () => {
    return (
      <TypeAnimation
        sequence={[         
          "Welcome to AI Chat Bot",
          1000,
          "Built with Gemini 🤖",
          2000,
        ]}
        wrapper="span"
        speed={50}
        style={{
          fontSize: "60px",
          display: "inline-block",
          textShadow: "1px 1px 20px #000",
        }}
        repeat={Infinity}
      />
    );
}
 
export default TypeAnim;