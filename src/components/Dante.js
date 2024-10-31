import { useEffect } from 'react';
import '../styles/Dante.css'
const Chatbot2 = () => {
  useEffect(() => {
    // Inject the chatbot script dynamically when the component mounts
    const script = document.createElement('script');
    script.src = "https://dante-ai.com/bubble-embed.js";
    document.body.appendChild(script);

    // Set the chatbot configuration
    window.danteEmbed = "https://dante-ai.com/embed/?kb_id=a9edb115-03ca-450e-a380-86a11d60b03f&token=c9b8fc27-56cc-4c49-ba4f-a77395ea8417&modeltype=gpt-4-omnimodel-mini&mode=undefined&logo=ZmFsc2U%3D&bubble=true&bubbleopen=false";
  }, []);

  return null; // No need to return anything since it's a script-based widget
};

export default Chatbot2;
