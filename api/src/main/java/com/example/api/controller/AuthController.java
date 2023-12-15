package com.example.api.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.api.config.JwtProvider;
import com.example.api.dto.AuthResponse;
import com.example.api.dto.LoginDto;
import com.example.api.expection.UserExpection;
import com.example.api.model.User;
import com.example.api.repository.UserRepository;
import com.example.api.service.UserDetailImpl;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final UserDetailImpl userDetailImpl;
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user){
        String email = user.getEmail();
        String password = user.getPassword();
        Optional<User> isUser = userRepository.findByEmail(email);
        if(!isUser.isPresent()){
            User createdUser = new User();
            createdUser.setEmail(email);
            createdUser.setFull_name(user.getFull_name());
            createdUser.setProfile_picture(user.getProfile_picture());
            createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(createdUser);
        }
        Authentication auth = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwt = jwtProvider.generateToken(email);
        AuthResponse authResponse = new AuthResponse(jwt,true);
        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.ACCEPTED);
    }
    public ResponseEntity<AuthResponse> LoginHandler(@RequestBody LoginDto loginDto) throws UserExpection{
        Authentication auth = authenticate(loginDto.getEmail(), loginDto.getPassword());
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwt = jwtProvider.generateToken(loginDto.getEmail());
        AuthResponse authResponse = new AuthResponse(jwt, true);
        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.ACCEPTED);
    }
    public Authentication authenticate(String username,String password) throws UserExpection
    {
        UserDetails userdetail = userDetailImpl.loadUserByUsername(username);
        if(userdetail == null){
            throw new UserExpection("invalid username");
        }
        if(!passwordEncoder.matches(password, userdetail.getPassword())){
            throw new UserExpection("invalid Password");
        }
        return new UsernamePasswordAuthenticationToken(userdetail.getUsername(),null,userdetail.getAuthorities());
    }
}
