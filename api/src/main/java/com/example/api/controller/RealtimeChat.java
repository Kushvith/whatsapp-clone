package com.example.api.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import com.example.api.model.Message;

import lombok.AllArgsConstructor;
@AllArgsConstructor
public class RealtimeChat {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/message")
    @SendTo("group/Public")
    public Message recieveMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSend("/group/"+message.getChat().getId().toString(),message);
        return message;
    }
}
