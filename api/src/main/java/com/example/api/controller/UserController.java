package com.example.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.api.dto.ApiResponse;
import com.example.api.dto.UpdateUserReq;
import com.example.api.expection.UserExpection;
import com.example.api.model.User;
import com.example.api.service.UserService;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization")String jwt) throws UserExpection{
        User user = userService.findUserProfile(jwt);
        return new ResponseEntity<User>(user,HttpStatus.ACCEPTED);
    }
    @GetMapping("/{query}")
    public ResponseEntity<List<User>> searchUserHandler(@PathVariable String query){
        List<User> users = userService.searchUser(query);
        return new ResponseEntity<>(users,HttpStatus.ACCEPTED);
    }
    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserReq req,@RequestHeader("Authorization")String jwt) throws UserExpection{
        User user = userService.findUserProfile(jwt);
        userService.updateUser(user.getId(), req);
        ApiResponse res = new ApiResponse("user updated successfully",true);
        return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
    }
}
