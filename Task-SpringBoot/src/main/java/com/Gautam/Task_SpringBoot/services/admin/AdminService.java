package com.Gautam.Task_SpringBoot.services.admin;

import com.Gautam.Task_SpringBoot.dto.TaskDto;
import com.Gautam.Task_SpringBoot.dto.UserDto;

import java.util.List;

public interface AdminService {

    List<UserDto> getUsers();

    TaskDto createTask(TaskDto taskDto);

    List<TaskDto> getAllTasks();

    void deleteTask(Long id);

    TaskDto getTAskById(Long id);

    TaskDto updateTask(Long id, TaskDto taskDto);

    List<TaskDto> searchTaskByTitle(String title);
}
