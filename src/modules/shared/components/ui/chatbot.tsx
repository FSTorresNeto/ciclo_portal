import React, { useState } from "react";

type Message = {
	sender: "user" | "bot";
	text: string;
};

const script = [
	"Olá! 👋 Eu sou o assistente virtual.",
	"Como posso te ajudar hoje?",
	"Legal, obrigado por compartilhar! Vou registrar essa informação.",
	"Nos falamos em breve 🚀",
];

export default function ChatbotPopup() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [userInput, setUserInput] = useState("");
	const [step, setStep] = useState(0);

	const handleSend = () => {
		if (!userInput.trim()) return;

		// mensagem do usuário
		const userMessage: Message = { sender: "user", text: userInput };
		setMessages((prev) => [...prev, userMessage]);

		// resposta do script
		setTimeout(() => {
			if (step < script.length) {
				const botMessage: Message = { sender: "bot", text: script[step] ?? "..." };
				setMessages((prev) => [...prev, botMessage]);
				setStep((prev) => prev + 1);
			}
		}, 800);

		setUserInput("");
	};

	return (
		<div className="fixed right-4 bottom-4">
			{isOpen ? (
				<div className="flex h-96 w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
					{/* Header */}
					<div className="flex items-center justify-between bg-blue-600 p-3 text-white">
						<span>🤖 Chatbot</span>
						<button onClick={() => setIsOpen(false)}>✖</button>
					</div>

					{/* Messages */}
					<div className="flex-1 space-y-2 overflow-y-auto p-3">
						{messages.map((msg, i) => (
							<div
								key={i}
								className={`max-w-[75%] rounded-lg p-2 ${
									msg.sender === "bot" ? "bg-gray-200 text-left" : "ml-auto bg-blue-500 text-right text-white"
								}`}
							>
								{msg.text}
							</div>
						))}
					</div>

					{/* Input */}
					<div className="flex gap-2 border-t p-2">
						<input
							type="text"
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							className="flex-1 rounded-lg border px-2"
							placeholder="Digite sua mensagem..."
							onKeyDown={(e) => e.key === "Enter" && handleSend()}
						/>
						<button onClick={handleSend} className="rounded-lg bg-blue-600 px-3 text-white">
							➤
						</button>
					</div>
				</div>
			) : (
				<button onClick={() => setIsOpen(true)} className="rounded-full bg-blue-600 p-4 text-white shadow-lg">
					💬
				</button>
			)}
		</div>
	);
}
