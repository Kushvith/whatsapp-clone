package com.example.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.dto.ApiResponse;
import com.example.api.dto.SendMessageRequest;
import com.example.api.expection.MessageException;
import com.example.api.expection.UserExpection;
import com.example.api.expection.chatExpection;
import com.example.api.model.Message;
import com.example.api.model.User;
import com.example.api.service.MessageService;
import com.example.api.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/messages")
@AllArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final UserService userService;
    @PostMapping("/create")
    public ResponseEntity<Message> createMessage(@RequestBody SendMessageRequest sentMessageRequest,@RequestHeader("Authorization")String jwt) throws UserExpection, chatExpection{
        User user = userService.findUserProfile(jwt);
        // sentMessageRequest.setUserId(user.getId());
        return new ResponseEntity<>(messageService.sendMessage(sentMessageRequest,user.getId()),HttpStatus.ACCEPTED);
    }
    @GetMapping("/chat/{chatId}")
    public ResponseEntity<List<Message>> getChatsMessageHandler(@PathVariable Long chatId,@RequestHeader("Authorization")String jwt) throws UserExpection, chatExpection{
        User user = userService.findUserProfile(jwt);
        List<Message> messages = messageService.getChatMessages(chatId, user);
        return new ResponseEntity<>(messages,HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/{messageId}")
    public ResponseEntity<ApiResponse> deleteMessage(@PathVariable Long messageId,@RequestHeader("Authorization")String jwt) throws UserExpection, MessageException{
        User user = userService.findUserProfile(jwt);
        messageService.deleteMessage(messageId, user);
        ApiResponse api = new ApiResponse("message deleted...", true);
        return new ResponseEntity<>(api,HttpStatus.ACCEPTED);
    }
}