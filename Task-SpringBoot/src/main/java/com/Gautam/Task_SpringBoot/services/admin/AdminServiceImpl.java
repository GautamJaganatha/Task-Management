package com.Gautam.Task_SpringBoot.services.admin;

import com.Gautam.Task_SpringBoot.Repository.TaskRepository;
import com.Gautam.Task_SpringBoot.Repository.UserRepository;
import com.Gautam.Task_SpringBoot.dto.TaskDto;
import com.Gautam.Task_SpringBoot.dto.UserDto;
import com.Gautam.Task_SpringBoot.entity.Task;
import com.Gautam.Task_SpringBoot.entity.User;
import com.Gautam.Task_SpringBoot.enums.TaskStatus;
import com.Gautam.Task_SpringBoot.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.CharArrayReader;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final UserRepository userRepository;

    private final TaskRepository taskRepository;

    public List<UserDto> getUsers(){
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole()== UserRole.EMPLOYEE)
                .map(User::getUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Optional<User> optionalUser = userRepository.findById(taskDto.getEmployeeId());
        if (optionalUser.isPresent()){
            Task task = new Task();
            task.setTitle(taskDto.getTitle());
            task.setDescription(taskDto.getDescription());
            task.setDueDate(taskDto.getDueDate());
            task.setTaskStatus(TaskStatus.INPROGRESS);
            task.setPriority(taskDto.getPriority());
            task.setUser(optionalUser.get());
            return taskRepository.save(task).getTaskDto();
        }
        return null;
    }

    @Override
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Task::getDueDate).reversed())
                .map(Task::getTaskDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public TaskDto getTAskById(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.map(Task::getTaskDto).orElse(null);
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        Optional<User> optionalUser = userRepository.findById(taskDto.getEmployeeId());
        if (optionalTask.isPresent() && optionalUser.isPresent()){
            Task existingTask = optionalTask.get();
            existingTask.setTitle(taskDto.getTitle());
            existingTask.setDescription(taskDto.getDescription());
            existingTask.setPriority(taskDto.getPriority());
            existingTask.setDueDate(taskDto.getDueDate());
            existingTask.setTaskStatus(mapStringTaskStatus(String.valueOf(taskDto.getTaskStatus())));
            existingTask.setUser(optionalUser.get());
            return taskRepository.save(existingTask).getTaskDto();
        }
        return null;
    }

    @Override
    public List<TaskDto> searchTaskByTitle(String title) {
       return taskRepository.findAllByTitleContaining(title)
               .stream()
               .sorted(Comparator.comparing(Task::getDueDate).reversed())
               .map(Task::getTaskDto)
               .collect(Collectors.toList());
    }

    private TaskStatus mapStringTaskStatus(String status){
        return switch (status){
            case "PENDING" -> TaskStatus.PENDING;
            case "INPROGRESS" -> TaskStatus.INPROGRESS;
            case "COMPLETED" -> TaskStatus.COMPLETED;
            case "DEFERRED" -> TaskStatus.DEFERRED;
            default -> TaskStatus.CANCELED;
        };
    }


}
