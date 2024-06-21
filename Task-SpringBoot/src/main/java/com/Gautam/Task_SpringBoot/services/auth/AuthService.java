package com.Gautam.Task_SpringBoot.services.auth;

import com.Gautam.Task_SpringBoot.dto.SignupRequest;
import com.Gautam.Task_SpringBoot.dto.UserDto;

public interface AuthService {

    UserDto SignupRequest(SignupRequest signupRequest);

    boolean hasUserEmail(String email);
}
