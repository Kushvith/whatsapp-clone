package com.example.api.service;

import java.util.Collection;
import java.util.Optional;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.api.model.User;
import com.example.api.repository.UserRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class UserDetailImpl implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userOptional = userRepository.findByEmail(username)
                        .orElseThrow(()->new UsernameNotFoundException("username not found"));
        return new org.springframework.security.core.userdetails.User(
            userOptional.getEmail(),userOptional.getPassword(),true,true,true,true,getAutorites("user")
        );
        
    }
    private Collection<? extends GrantedAuthority> getAutorites(String role){
        return List.of(new SimpleGrantedAuthority(role));
    }

}
