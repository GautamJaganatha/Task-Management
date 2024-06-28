package com.Gautam.Task_SpringBoot.services.employee;

import com.Gautam.Task_SpringBoot.Repository.TaskRepository;
import com.Gautam.Task_SpringBoot.dto.TaskDto;
import com.Gautam.Task_SpringBoot.entity.Task;
import com.Gautam.Task_SpringBoot.entity.User;
import com.Gautam.Task_SpringBoot.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    private final TaskRepository taskRepository;

    private final JwtUtil jwtUtil;

    public List<TaskDto> getTaskByUserId(){
        User user = jwtUtil.getLoggedInUser();
        if (user != null){
           return taskRepository.findAllByUserId(user.getId() )
                    .stream()
                    .sorted(Comparator.comparing(Task::getDueDate).reversed())
                    .map(Task::getTaskDto)
                    .collect(Collectors.toList());
        }
        throw new EntityNotFoundException("User not Found In Databases");
    }
}
