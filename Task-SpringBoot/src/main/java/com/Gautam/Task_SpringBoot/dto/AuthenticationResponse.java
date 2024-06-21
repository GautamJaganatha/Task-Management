package com.Gautam.Task_SpringBoot.dto;

import com.Gautam.Task_SpringBoot.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;

    private Long userId;

    private UserRole userRole;
}
