package com.example.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.dto.ApiResponse;
import com.example.api.dto.AuthResponse;
import com.example.api.dto.GroupChatRequest;
import com.example.api.dto.SingleReques;
import com.example.api.expection.UserExpection;
import com.example.api.expection.chatExpection;
import com.example.api.model.Chat;
import com.example.api.model.User;
import com.example.api.service.ChatService;
import com.example.api.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final UserService userService;
    @PostMapping("/single")
    private ResponseEntity<Chat> createChatHandler(@RequestBody SingleReques singleReques,@RequestHeader("Authorization") String jwt) throws UserExpection{
        User  user = userService.findUserProfile(jwt);
        Chat chat = chatService.createChat(user, singleReques.getId());
        return new ResponseEntity<>(chat,HttpStatus.OK);
    }
    @PostMapping("/group")
    private ResponseEntity<Chat> createGroupHandler(@RequestBody GroupChatRequest groupChatRequest,@RequestHeader("Authorization") String jwt) throws UserExpection, chatExpection{
        User reqUser = userService.findUserProfile(jwt);
        Chat chat = chatService.createGroupChat(groupChatRequest, reqUser);
        return new ResponseEntity<>(chat,HttpStatus.OK);
    }
    @GetMapping("/{chatId}")
    private ResponseEntity<Chat> findChatByIdHandler(@PathVariable Long chatId) throws chatExpection, UserExpection{
        Chat chat = chatService.findChatById(chatId);
        return new ResponseEntity<>(chat,HttpStatus.ACCEPTED);
    }
     @GetMapping("/user")
    private ResponseEntity<List<Chat>> findUserChatHandler(@RequestHeader("Authorization")String jwt) throws chatExpection, UserExpection{
        User user = userService.findUserProfile(jwt);
        List<Chat> chat = chatService.findChatByUserId(user.getId());
        return new ResponseEntity<>(chat,HttpStatus.ACCEPTED);
    }
      @PostMapping("/{chatId}/add/{userId}")
    private ResponseEntity<Chat> addUserToChat(@PathVariable Long chatId,@PathVariable Long userId, @RequestHeader("Authorization")String jwt) throws chatExpection, UserExpection{
        User requser = userService.findUserProfile(jwt);
        Chat chat = chatService.addUserToCart(userId, chatId, requser);
        return new ResponseEntity<>(chat,HttpStatus.ACCEPTED);
    }
    @PostMapping("/{chatId}/remove/{userId}")
    private ResponseEntity<ApiResponse> removeUserToChat(@PathVariable Long chatId,@PathVariable Long userId, @RequestHeader("Authorization")String jwt) throws chatExpection, UserExpection{
        User requser = userService.findUserProfile(jwt);
       chatService.removeFromGroup(chatId, userId, requser);
        ApiResponse api = new ApiResponse("User removed", true);
        return new ResponseEntity<>(api,HttpStatus.ACCEPTED);
    }
}
