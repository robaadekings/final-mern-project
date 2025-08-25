import { useEffect, useRef, useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

function AIChatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', text: 'Hi! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, open]);

    const send = async () => {
        const text = input.trim();
        if (!text) return;
        setInput('');
        const userMsg = { id: Date.now(), role: 'user', text };
        setMessages((prev) => [...prev, userMsg]);
        // Mock AI reply to avoid backend coupling
        setTimeout(() => {
            const reply = {
                id: Date.now() + 1,
                role: 'assistant',
                text: 'Thanks! I noted that. For product help, try searching by brand or category.'
            };
            setMessages((prev) => [...prev, reply]);
        }, 700);
    };

    return (
        <div className="fixed right-4 bottom-20 md:bottom-6 z-[55]">
            {!open && (
                <button
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition"
                    onClick={() => setOpen(true)}
                    aria-label="Open Assistant"
                >
                    <ChatBubbleLeftRightIcon className="w-6 h-6" /> Chat
                </button>
            )}
            {open && (
                <div className="w-[90vw] max-w-sm h-96 bg-white rounded-2xl shadow-2xl border border-pink-200 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                        <div className="font-semibold">Assistant</div>
                        <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/10" aria-label="Close">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-2 bg-gradient-to-b from-rose-50/40 to-indigo-50/40">
                        {messages.map(m => (
                            <div key={m.id} className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${m.role === 'assistant' ? 'bg-white text-gray-800 shadow self-start' : 'bg-indigo-600 text-white self-end ml-auto'}`}>
                                {m.text}
                            </div>
                        ))}
                    </div>
                    <div className="p-2 border-t border-pink-100 flex items-center gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                            placeholder="Type a message..."
                            className="flex-1 border border-pink-200 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                        />
                        <button onClick={send} className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow" aria-label="Send">
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AIChatbot;


