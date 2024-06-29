package com.Gautam.Task_SpringBoot.services.employee;

import com.Gautam.Task_SpringBoot.dto.TaskDto;

import java.util.List;

public interface EmployeeService {




    List<TaskDto> getTaskByUserId();

   TaskDto updateTask(Long id, String status);





}
