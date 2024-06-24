package com.Gautam.Task_SpringBoot.controller.auth;

import com.Gautam.Task_SpringBoot.Repository.UserRepository;
import com.Gautam.Task_SpringBoot.dto.AuthenticationRequest;
import com.Gautam.Task_SpringBoot.dto.AuthenticationResponse;
import com.Gautam.Task_SpringBoot.dto.SignupRequest;
import com.Gautam.Task_SpringBoot.dto.UserDto;
import com.Gautam.Task_SpringBoot.entity.User;
import com.Gautam.Task_SpringBoot.enums.UserRole;
import com.Gautam.Task_SpringBoot.services.auth.AuthService;
import com.Gautam.Task_SpringBoot.services.jwt.UserService;
import com.Gautam.Task_SpringBoot.utils.JwtUtil;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    @PostMapping("/Signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest){
        if (authService.hasUserEmail(signupRequest.getEmail()))
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User already exists with this email");
        UserDto userDto = authService.SignupRequest(signupRequest);
        if (userDto == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not created");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }


    @PostMapping("/Login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest authenticationRequest){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        }
        catch (BadCredentialsException e){
            throw new BadCredentialsException("Incorrect username or password");
        }

        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(optionalUser.get().getEmail());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if (optionalUser.isPresent()){
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getRole());
        }

        return authenticationResponse;
    }


    private static final String HEADER_STRING = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";

//
//    @PostMapping("/authenticate")
//    public void createAuthentication(@RequestBody AuthenticationRequest request, HttpServletResponse response)throws IOException,
//            JSONException {
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
//        }catch (BadCredentialsException e){
//            throw new BadCredentialsException("Incorrect Username");
//        }
//        Optional<User> optionalUser = userRepository.findFirstByEmail(request.getEmail());
//
//        final String jwt = jwtUtil.generateToken(optionalUser.get().getEmail());
//
//        if (optionalUser.isPresent()){
//            response.getWriter().write(new JSONObject()
//                    .put("userId", optionalUser.get().getId())
//                    .put("role", optionalUser.get().getRole())
//                    .put("jwt",jwt)
//                    .toString()
//            );
//        }
//        response.addHeader("Access-Control-Expose-Headers","Authorization");
//        response.addHeader("Access-Control-Allow","Authorization, X-PINGOTHER, Origin,"+
//                "X-Requested-Width, Content-Type, Accept, X-Custom-header");
//        response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
//    }
}
