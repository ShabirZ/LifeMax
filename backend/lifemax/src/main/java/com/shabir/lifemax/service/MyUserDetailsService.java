package com.shabir.lifemax.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.shabir.lifemax.model.Users;
import com.shabir.lifemax.repository.UserRepository;
import com.shabir.lifemax.model.UserPrincipal;
import java.util.UUID;
@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepo.findByEmail(username);
        if (user == null) {
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("user not found");
        }
        
        return new UserPrincipal(user);
    }


    public UserDetails loadUserByUid(UUID uid) {
        Users user = userRepo.findByUid(uid);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with UID: " + uid);
        }
        return new UserPrincipal(user);
    }
}