'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });


  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID, // Replace with your agent ID
        dynamicVariables: {
          secret__access_token: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IlBIX01PViIsInN1YiI6MjYzNiwiY3VzdG9tZXJHcm91cElkcyI6W10sImlhdCI6MTc1NTAwMzI3MCwiZXhwIjoxNzU1MDE3NjcwLCJpc3MiOiJjcG1zIiwianRpIjoiQWNjZXNzVG9rZW4ifQ.Or4PxMgxQtTA8MQRsWInVKP3l8Ylw5_KaExGOJGJ75gs2HGbph83RvE_mJnNGjz_IjdI6bR3xLHVsFDbpr10xUrOwRdLxv92ItY3KliiWrEza0Hj8xEBePA63MZOA18jYJzOitXqymhzCDbX49iINHKkwkAL0YXo0aXbvB9_PfomNkHJocoI2IsRhN_zcVRAU-gss4V0ancsKWGHlKfdHbvA6iLkWiag-zSvOBx28FedAQ2HLZd_xGixC5G-x3TXc6ZCTkcBCN6XB61RdlKY-MczU1Op6-UEu_b8D7zGrQtvissNRxAppSCHM-nCoEM7SjiPGGCDnbEnVMa5v9mWRH1P_xA7jQZMzHL1Bcz2sfdqkAY8LNxNgK9Xe6Df5CsxR0emLvrQg_ecyYU0MpDnXEYHSb_nb0kWh7sJp3itthNcwPZ81KhGeWyMKbc7qbKWlRrisH97GUoKvuk5i-_X9M8CMRmLtDt8_bFtYy_W8IdwUPYzhhNVPrjsdAtANQA2BMn_KAxlIvUYh9GvpiaRj_bANAEOd2CrwjHJuvcXQG8j7MtprETzwnbxb6us2mBuriuoS1WYFR8MH3auvNE0TPEgZIlsTwj7TMQIflBv8ymckUVAy79H6RySfE9iDlGF8Govk_NfeYGlPhNITXEueIaeG4jy8vowB5Swnxg0A54',
          customer_name: "Sudeep",
          current_date: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Status Display */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
          <div className={`w-3 h-3 rounded-full ${
            conversation.status === 'connected' ? 'bg-green-500 animate-pulse' : 
            conversation.status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
            'bg-gray-400'
          }`}></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
            {conversation.status}
          </span>
        </div>
        
        {conversation.status === 'connected' && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className={`w-2 h-2 rounded-full ${
              conversation.isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-green-500'
            }`}></div>
            <span>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-md"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Start Conversation
          </div>
        </button>
        
        <button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-md"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
            </svg>
            Stop Conversation
          </div>
        </button>
      </div>

      {/* Visual Feedback */}
      {conversation.status === 'connected' && (
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            {conversation.isSpeaking && (
              <div className="absolute inset-0 w-20 h-20 bg-blue-400 rounded-full animate-ping opacity-75"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
