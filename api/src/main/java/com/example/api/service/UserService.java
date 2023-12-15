package com.example.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.api.dto.UpdateUserReq;
import com.example.api.expection.UserExpection;
import com.example.api.model.User;

@Service
public interface UserService {
    public User findByUserId(Long id) throws UserExpection;
    public User findUserProfile(String jwt) throws UserExpection;
    public User updateUser(Long id,UpdateUserReq req) throws UserExpection;
    public List<User> searchUser(String query);
}
