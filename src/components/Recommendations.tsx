import React, { useEffect, useRef, useState } from 'react';
import { } from 'lucide-react';
import { Input } from './ui/input';
import { useGetChatResponseQuery, useSendNewChatMutation } from '@/app/api-slices/usersApiSlice';

const Recommendations: React.FC<{ data: any }> = ({ data }) => {
  const [promptText, setPromptText] = useState("")
  const [promptResult, setPromptResult] = useState<{message: string}[]>([])

  const [sendPrompt] = useSendNewChatMutation();
  const { data: chatgptdata, refetch } = useGetChatResponseQuery();

  const prevDataRef = useRef<typeof chatgptdata>();
  
  
  useEffect(() => {
    // Only update if chatgptdata exists and is different from the previous data
    if (chatgptdata && 
        chatgptdata.length > 0 && 
        JSON.stringify(chatgptdata) !== JSON.stringify(prevDataRef.current)) {
      
      // Process the data to extract and clean the message
      const processedData = chatgptdata.map(item => {
        let messageText = item.message;
        
        // If the message is a JSON string with a "response" field, parse and extract it
        if (typeof messageText === 'string' && messageText.trim().startsWith('{') && messageText.includes('"response"')) {
          try {
            const parsed = JSON.parse(messageText);
            if (parsed.response) {
              messageText = parsed.response;
            }
          } catch (e) {
            console.log("Failed to parse JSON in message, using original");
          }
        }
        
        // Trim any whitespace or newlines
        messageText = messageText.trim();
        
        return { message: messageText };
      });
      
      // Update state with only the new messages
      setPromptResult(prev => {
        // If we already have this message, don't add it again
        const lastMessage = prev[prev.length - 1]?.message;
        const newMessage = processedData[0]?.message;
        
        if (lastMessage === newMessage) {
          return prev; // Return unchanged if it's a duplicate
        }
        
        return [...prev, ...processedData];
      });
      
      // Update ref with current data for future comparison
      prevDataRef.current = chatgptdata;
    }
  }, [chatgptdata]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;

      setPromptText(value)
  }

  async function handleSubmit() {
    if (!promptText.trim()) return;
    await sendPrompt(promptText)
    setPromptText("")
    await refetch()
  }
  
  return (
    <div className="bg-white justify-between min-h-[50vh] max-h-[80vh] rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold">AI Recommendations</h2>
      </div>
      <div className='flex flex-col space-y-4 overflow-auto min-h-[30vh] max-h-[50vh] w-full mb-4'>
        {promptResult.map((item, index) => (
          <div key={index} className="border-2 shadow-lg rounded-lg max-h-[20vh] overflow-auto p-3">
            <div className="whitespace-pre-line">{item.message}</div>
          </div>
        ))}
      </div>
      <div className='flex w-full justify-between h-[20%]'>
        <Input onChange={handleInputChange} type="string" placeholder="Enter your new Prompt..." className='w-[80%] border-2 border-gray-400'/>
        <button onClick={handleSubmit} className='w-[15%] py-1 bg-green-500 rounded-lg'>
          Enter
        </button>
      </div>
    </div>
  );
};

export default Recommendations;