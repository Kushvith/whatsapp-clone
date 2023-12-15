package com.example.api.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.example.api.dto.GroupChatRequest;
import com.example.api.expection.UserExpection;
import com.example.api.expection.chatExpection;
import com.example.api.model.Chat;
import com.example.api.model.User;

@Service
public interface ChatService {
    public Chat createChat(User reqUser,Long userid2) throws UserExpection;
    public Chat findChatById(Long chatId) throws chatExpection;
    public List<Chat> findChatByUserId(Long id) throws UserExpection;
    public Chat createGroupChat(GroupChatRequest req,User userId) throws UserExpection,chatExpection;
    public Chat addUserToCart(Long userId,Long chatId,User reqUser) throws UserExpection,chatExpection;
    public void removeGroupChat(Long chatId,Long reqUserId) throws UserExpection,chatExpection;
    public Chat removeFromGroup(Long chatId,Long UserId,User reqUserId) throws UserExpection,chatExpection;
    public Chat renameChat(Long chatId,String groupname,User reqUser) throws chatExpection;
    public void deleteChat(Long chatId,Long userId) throws UserExpection,chatExpection;
}
