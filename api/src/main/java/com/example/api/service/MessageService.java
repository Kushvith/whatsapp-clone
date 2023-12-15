package com.example.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.api.dto.SendMessageRequest;
import com.example.api.expection.MessageException;
import com.example.api.expection.UserExpection;
import com.example.api.expection.chatExpection;
import com.example.api.model.Message;
import com.example.api.model.User;

@Service
public interface MessageService {
    public Message sendMessage(SendMessageRequest req) throws UserExpection,chatExpection;
    public List<Message> getChatMessages(Long chatId,User reqUser) throws chatExpection, UserExpection;
    public Message findMessageById(Long messageId) throws MessageException;
    public void deleteMessage(Long messageId,User reqUser) throws MessageException;

}
