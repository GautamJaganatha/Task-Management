package com.Gautam.Task_SpringBoot.dto;

import com.Gautam.Task_SpringBoot.enums.UserRole;
import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
}
