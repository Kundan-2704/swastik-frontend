// import { useEffect, useRef, useState } from "react";
// import { apiAIAgent } from "../services/apiAIAgent";
// import { useNavigate } from "react-router-dom";


// type Product = {
//   _id: string;
//   name: string;
//   price: number;
//   fabric: string;
//   color?: string;
//   images?: string[];
// };

// export const useVoiceAgent = () => {
//   const recognitionRef = useRef<any>(null);

//   const [listening, setListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [reply, setReply] = useState("");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();


//   // 🎤 INIT SPEECH RECOGNITION
//   useEffect(() => {
//     const SpeechRecognition =
//       (window as any).SpeechRecognition ||
//       (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in this browser");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onresult = (event: any) => {
//       const text = event.results[0][0].transcript;
//       setTranscript(text);
//       sendToAgent(text);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };

//     recognitionRef.current = recognition;
//   }, []);

//   // 🎤 START MIC
//   const startListening = () => {
//     setTranscript("");
//     setReply("");
//     setProducts([]);
//     setListening(true);
//     recognitionRef.current?.start();
//   };

//   // 🌐 SEND TO BACKEND
//   const sendToAgent = async (text: string) => {
//     try {
//       setLoading(true);

//       const res = await apiAIAgent.post("/api/ai-agent/ask", {
//         query: text,
//       });

//       setReply(res.data.reply || "");
//       setProducts(res.data.products || []);

//       speak(res.data.reply);
//     } catch (err) {
//       speak("Sorry, kuch problem aa gayi");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔊 TEXT → SPEECH
// //   const speak = (text: string) => {
// //     if (!text) return;
// //     const utterance = new SpeechSynthesisUtterance(text);
// //     utterance.lang = "en-IN";
// //     window.speechSynthesis.speak(utterance);
// //   };

// const speak = (text: string) => {
//   if (!text) return;

//   const synth = window.speechSynthesis;
//   let voices = synth.getVoices();

//   // 🔥 Safari / Chrome fix (voices async load hote hain)
//   if (!voices.length) {
//     synth.onvoiceschanged = () => {
//       voices = synth.getVoices();
//     };
//   }

//   const preferredVoice =
//     voices.find(v => v.lang === "en-IN") ||
//     voices.find(v => v.lang === "en-GB") ||
//     voices[0];

//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.voice = preferredVoice || null;
//   utterance.rate = 0.9;    // slower = calm / premium
//   utterance.pitch = 1.05;  // slight warmth
//   utterance.volume = 1;

//   synth.cancel(); // stop previous speech
//   synth.speak(utterance);
// };


//   return {
//     listening,
//     transcript,
//     reply,
//     products,
//     loading,
//     startListening,
//   };
// };












import { useEffect, useRef, useState } from "react";
import { apiAIAgent } from "../services/apiAIAgent";
import { useNavigate } from "react-router-dom";

/* 🔹 Product type – MongoDB ke exact fields */
type Product = {
  _id: string;
  title: string;
  sellingPrice: number;
  images?: string[];
};

export const useVoiceAgent = () => {
  const recognitionRef = useRef<any>(null);

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [greeted, setGreeted] = useState(false);
const hasGreetedRef = useRef(false);


  const navigate = useNavigate();

  /* 🎤 INIT SPEECH RECOGNITION */
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      sendToAgent(text);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

useEffect(() => {
  if (!hasGreetedRef.current) {
    speak(
      "Namaste. Main aapka Handloom Expert hoon. Aap bol kar sarees ke baare me pooch sakte hain."
    );
    hasGreetedRef.current = true;
  }
}, []);


  /* 🎤 START MIC */
  const startListening = () => {
    setTranscript("");
    setReply("");
    setProducts([]);
    setListening(true);
    recognitionRef.current?.start();
  };

  /* 🌐 SEND TO BACKEND + AUTO NAVIGATION */
  const sendToAgent = async (text: string) => {
    try {
      setLoading(true);

      const res = await apiAIAgent.post("/api/ai-agent/ask", {
        query: text,
      });

      const replyText = res.data.reply || "";
      const productList: Product[] = res.data.products || [];

      setReply(replyText);
      setProducts(productList);

      speak(replyText);

      /* 🚀 AUTO OPEN FIRST PRODUCT (FREE VERSION) */
      if (productList.length > 0) {
        const firstProductId = productList[0]._id;

        setTimeout(() => {
          navigate(`/products/${firstProductId}`);
        }, 2500); // voice ke baad natural delay
      }
    } catch (err) {
      speak("Sorry, kuch problem aa gayi");
    } finally {
      setLoading(false);
    }
  };

  /* 🔊 TEXT → SPEECH (Improved Free Voice) */
  const speak = (text: string) => {
    if (!text) return;

    const synth = window.speechSynthesis;
    let voices = synth.getVoices();

    if (!voices.length) {
      synth.onvoiceschanged = () => {
        voices = synth.getVoices();
      };
    }

    const preferredVoice =
      voices.find(v => v.lang === "en-IN") ||
      voices.find(v => v.lang === "en-GB") ||
      voices[0];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = preferredVoice || null;
    utterance.rate = 0.9;   // calm / premium
    utterance.pitch = 1.05; // slight warmth
    utterance.volume = 1;

    synth.cancel();
    synth.speak(utterance);
  };

  return {
    listening,
    transcript,
    reply,
    products,
    loading,
    startListening,
  };
};
