package com.Gautam.Task_SpringBoot.services.employee;

import com.Gautam.Task_SpringBoot.Repository.CommentRepos;
import com.Gautam.Task_SpringBoot.Repository.TaskRepository;
import com.Gautam.Task_SpringBoot.dto.CommentDto;
import com.Gautam.Task_SpringBoot.dto.TaskDto;
import com.Gautam.Task_SpringBoot.entity.Comment;
import com.Gautam.Task_SpringBoot.entity.Task;
import com.Gautam.Task_SpringBoot.entity.User;
import com.Gautam.Task_SpringBoot.enums.TaskStatus;
import com.Gautam.Task_SpringBoot.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    private final TaskRepository taskRepository;

    private final JwtUtil jwtUtil;

    private final CommentRepos commentRepos;

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

    @Override
    public TaskDto updateTask(Long id, String status) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()){
            Task task = optionalTask.get();
            task.setTaskStatus(mapStringTaskStatus(status));
            return taskRepository.save(task).getTaskDto();
        }
        throw new EntityNotFoundException("Task with id was not found");

    }

    @Override
    public TaskDto getTAskById(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.map(Task::getTaskDto).orElse(null);
    }

    @Override
    public CommentDto createComment(Long taskId, String content) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        User user = jwtUtil.getLoggedInUser();
        if (optionalTask.isPresent() && user!=null){
            Comment comment1 = new Comment();
            comment1.setContent(content);
            comment1.setCreatedAt(new Date());
            comment1.setTask(optionalTask.get());
            comment1.setUser(user);

            return commentRepos.save(comment1).getCommentDto();

        }
        throw new EntityNotFoundException("User Not Found Exception. ");
    }

    @Override
    public List<CommentDto> getCommentsByTaskId(Long taskId) {
        return commentRepos.findAllByTaskId(taskId)
                .stream()
                .map(Comment::getCommentDto)
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
