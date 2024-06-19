package com.Gautam.Task_SpringBoot.services.auth;

import com.Gautam.Task_SpringBoot.Repository.UserRepository;
import com.Gautam.Task_SpringBoot.entity.User;
import com.Gautam.Task_SpringBoot.enums.UserRole;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;


    @PostConstruct
    public void createAdmin(){
        Optional<User> optionalUser = userRepository.findByRole(UserRole.ADMIN);
        if (optionalUser.isEmpty()) {
            User user = new User();
            user.setEmail("Admin@admin.com");
            user.setName("Admin");
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            user.setRole(UserRole.ADMIN);
            userRepository.save(user);

            System.out.println("Admin account created successfully");
        }
        else {
            System.out.println("Admin account already exists");
        }


    }
}
