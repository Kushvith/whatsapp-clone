package com.example.api.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.api.dto.SendMessageRequest;
import com.example.api.expection.MessageException;
import com.example.api.expection.UserExpection;
import com.example.api.expection.chatExpection;
import com.example.api.model.Chat;
import com.example.api.model.Message;
import com.example.api.model.User;
import com.example.api.repository.MessageRepository;
import com.example.api.service.ChatService;
import com.example.api.service.MessageService;
import com.example.api.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final UserService userService;
    private final ChatService chatService;
    private final MessageRepository messageRepository;
    @Override
    public Message sendMessage(SendMessageRequest req,Long userId) throws UserExpection, chatExpection {
       User user = userService.findByUserId(userId);
    //    System.out.println(Long.valueOf(req.getSenderId()));
       Chat chat = chatService.findChatById(req.getChatId());
       Message message = new Message();
       message.setChat(chat);
       message.setContent(req.getContent());
       message.setTimeStamp(LocalDateTime.now());
       message.setUser(user);
       return messageRepository.save(message);
    }

    @Override
    public List<Message> getChatMessages(Long chatId,User reqUser) throws chatExpection, UserExpection {
        Chat chat = chatService.findChatById(chatId);
        if(!chat.getUsers().contains(reqUser)){
            throw new UserExpection("you are not related to this chat");
        }
        List<Message> messages = messageRepository.findByChatId(chatId);
        return messages;
    }

    @Override
    public Message findMessageById(Long messageId) throws MessageException {
        Optional<Message> opt = messageRepository.findById(messageId);
        if(opt.isPresent()){
            return opt.get();
        }
        throw new MessageException("message Not found");
    }

    @Override
    public void deleteMessage(Long messageId,User reqUser) throws MessageException {
       Message message = findMessageById(messageId);
       if(message.getUser().equals(reqUser)){
        messageRepository.delete(message);
       }
       throw new MessageException("Message Not found");
    }

}
