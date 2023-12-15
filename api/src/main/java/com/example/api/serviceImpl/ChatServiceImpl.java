package com.example.api.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.api.dto.GroupChatRequest;
import com.example.api.expection.UserExpection;
import com.example.api.expection.chatExpection;
import com.example.api.model.Chat;
import com.example.api.model.User;
import com.example.api.repository.ChatRepository;
import com.example.api.service.ChatService;
import com.example.api.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final UserService userService;
    @Override
    public Chat createChat(User reqUser, Long userid2) throws UserExpection {
       User user = userService.findByUserId(userid2);
       Chat isChatExists = chatRepository.findSingleChatByUserId(reqUser, user);
       if(isChatExists !=null){
        return isChatExists;
       }
       Chat chat = new Chat();
       chat.setCreatedBy(reqUser);
       chat.setGroup(false);
       chat.getUsers().add(user);
       return chat;
    }

    @Override
    public Chat findChatById(Long id) throws chatExpection {
       Optional<Chat> chat = chatRepository.findById(id);
       if(chat.isPresent()){
        return chat.get();
       }
       throw new chatExpection("chat not found");
    }

    @Override
    public List<Chat> findChatByUserId(Long id) throws UserExpection {
       User user = userService.findByUserId(id);
       List<Chat> chats = chatRepository.findChatByUserId(user.getId());
       return chats;
    }

    @Override
    public Chat createGroupChat(GroupChatRequest req, User user) throws UserExpection, chatExpection {
        Chat group = new Chat();
        group.setGroup(true);
        group.setChat_image(req.getChat_image());
        group.setChat_name(req.getChat_name());
        group.setCreatedBy(user);
        for(Long userId:req.getUserId()){
            User groupUser = userService.findByUserId(userId);
            group.getUsers().add(groupUser);
        }
        return group;
    }

    @Override
    public Chat addUserToCart(Long userId, Long chatId,User reqUser) throws UserExpection, chatExpection {
       Chat chat = chatRepository.findById(chatId).orElseThrow(()-> new chatExpection("Chat not found"));
       User user = userService.findByUserId(userId);
       if(chat !=null){
        if(chat.getAdmins().contains(reqUser)){
            chat.getUsers().add(user);

        }
        throw new chatExpection("Your not admin to add user");
       }
    return chatRepository.save(chat);

    }

    @Override
    public void removeGroupChat(Long chatId, Long reqUserId) throws UserExpection, chatExpection {
        Optional<Chat> chat = chatRepository.findById(chatId);
        User user = userService.findByUserId(reqUserId);
        if(chat.get().getAdmins().contains(user)){
            chatRepository.deleteById(chatId);;
        }
    }

    @Override
    public Chat removeFromGroup(Long chatId, Long UserId, User reqUser) throws UserExpection, chatExpection {
       Optional<Chat> opt = chatRepository.findById(chatId);
       User user = userService.findByUserId(UserId);
       if(opt.isPresent()){
            Chat chat = opt.get();
            if(chat.getAdmins().contains(reqUser)){
                chat.getUsers().remove(user);
                return chatRepository.save(chat);
            }
            else if(chat.getUsers().contains(reqUser)){
                chat.getUsers().remove(user);
                return chatRepository.save(chat);
           }
           throw new chatExpection("your not admin or user to group");
       }
       throw new chatExpection("chat not found");
    }


    @Override
    public Chat renameChat(Long chatId, String groupname, User reqUser) throws chatExpection {
       Optional<Chat> opt = chatRepository.findById(chatId);
       if(opt.isPresent()){
        Chat chat = opt.get();
        if(chat.getUsers().contains(reqUser)){
            chat.setChat_name(groupname);
           return chatRepository.save(chat);
        }
        throw new chatExpection("you are not in group to change group name");
       }
       throw new chatExpection("chat not found");
    }

    @Override
    public void deleteChat(Long chatId, Long userId) throws UserExpection, chatExpection {
       Optional<Chat> opt = chatRepository.findById(chatId);
       if(opt.isPresent()){
        Chat chat = opt.get();
        chatRepository.deleteById(chat.getId());
       } 
       
    }

}
