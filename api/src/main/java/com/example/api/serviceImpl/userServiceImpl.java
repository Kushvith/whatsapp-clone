package com.example.api.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.api.config.JwtProvider;
import com.example.api.dto.UpdateUserReq;
import com.example.api.expection.UserExpection;
import com.example.api.model.User;
import com.example.api.repository.UserRepository;
import com.example.api.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class userServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    @Override
    public User findByUserId(Long id) throws UserExpection {
        return userRepository.findById(id).orElseThrow(()-> new UserExpection("User not found"));

    }

    @Override
    public User findUserProfile(String jwt) throws UserExpection {
       String email = jwtProvider.getEmailFromjwt(jwt);
       return userRepository.findByEmail(email).orElseThrow(()->new UserExpection("email not found"));
    }

    @Override
    public User updateUser(Long id, UpdateUserReq req) throws UserExpection {
       User user = findByUserId(id);
       if(req.getFull_name() != null){
        user.setFull_name(req.getFull_name());
       }
       if(req.getProfile_picture() !=null){
        user.setProfile_picture(req.getProfile_picture());
       }
       return userRepository.save(user);
    }

    @Override
    public List<User> searchUser(String query) {
        List<User> users = userRepository.searchUsers(query);
        return users;
    }
}
