import { useState } from 'react';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const SimpleAIAssistant = ({ onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi! I\'m your SDG AI Assistant. I can help you learn about the 17 Sustainable Development Goals, find projects to get involved in, or answer any questions about sustainability. What would you like to know?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'What are the SDGs?',
    'How can I help with climate action?',
    'Tell me about SDG 4',
    'How do I get involved?'
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage
    };

    const currentInput = inputMessage;
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      console.log('Sending message to AI:', currentInput);
      const systemPrompt = 'You are an SDG (Sustainable Development Goals) expert assistant. Provide helpful, accurate information about the 17 SDGs, sustainability projects, and ways people can get involved. Keep responses conversational and actionable.';
      const aiResponse = await OpenRouterService.callAPI(currentInput, systemPrompt);
      console.log('AI Response received:', aiResponse);
      
      if (!aiResponse || aiResponse.trim() === '') {
        throw new Error('Empty response from AI');
      }
      
      // Clean up the response for better chat display
      const cleanedResponse = aiResponse
        .replace(/\*\*/g, '') // Remove bold markdown
        .replace(/\*/g, '') // Remove bullet points
        .replace(/#{1,6}\s/g, '') // Remove headers
        .replace(/\n\s*\n/g, '\n') // Remove extra line breaks
        .trim();
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: cleanedResponse || 'I received your message but had trouble generating a response. Could you try rephrasing your question?'
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Provide contextual fallback responses
      let fallbackContent = 'I apologize, but I\'m having trouble connecting right now.';
      
      if (currentInput.toLowerCase().includes('sdg')) {
        fallbackContent = 'The 17 Sustainable Development Goals (SDGs) are a universal call to action to end poverty, protect the planet, and ensure peace and prosperity for all by 2030. They include goals like No Poverty, Zero Hunger, Quality Education, and Climate Action.';
      } else if (currentInput.toLowerCase().includes('climate')) {
        fallbackContent = 'Climate Action (SDG 13) focuses on taking urgent action to combat climate change. You can help by reducing energy consumption, supporting renewable energy, and advocating for climate policies.';
      } else if (currentInput.toLowerCase().includes('education')) {
        fallbackContent = 'Quality Education (SDG 4) ensures inclusive and equitable quality education for all. You can volunteer as a tutor, support educational nonprofits, or advocate for educational access in your community.';
      }
      
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: fallbackContent
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };



  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        


        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-4">
            <Bot size={16} />
            <span className="text-sm font-medium">AI Assistant</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SDG AI Assistant
          </h1>
          
          <p className="text-lg text-gray-600">
            Get instant answers about Sustainable Development Goals and find ways to make an impact.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-lg border shadow-sm">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="border-t p-4">
            <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about SDGs..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            What can I help you with?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">SDG Information</h4>
              <ul className="space-y-1">
                <li>• Explain individual SDGs</li>
                <li>• SDG targets and indicators</li>
                <li>• Progress tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Getting Involved</h4>
              <ul className="space-y-1">
                <li>• Find local projects</li>
                <li>• Volunteer opportunities</li>
                <li>• Partnership suggestions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAIAssistant;