package com.Gautam.Task_SpringBoot.controller.auth.Admin;

import com.Gautam.Task_SpringBoot.dto.TaskDto;
import com.Gautam.Task_SpringBoot.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

import java.util.List;

@RestController
@RequestMapping("/api/admin/")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;


    @GetMapping("getUsers")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(adminService.getUsers());
    }

    @PostMapping("addTask")
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto){
        TaskDto creatTaskDto = adminService.createTask(taskDto);
        if (creatTaskDto == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(creatTaskDto);
    }


    @GetMapping("/getAllTask")
    public ResponseEntity<?> getAllTasks(){
        return ResponseEntity.ok(adminService.getAllTasks());
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
        adminService.deleteTask(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/getTaskById/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id){
        return ResponseEntity.ok(adminService.getTAskById(id));
    }


    @PutMapping("updateTask/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @RequestBody TaskDto taskDto){
        TaskDto updatedTAsk = adminService.updateTask(id,taskDto);
        if (updatedTAsk==null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updatedTAsk);
    }

    @GetMapping("task/searchByTitle/{title}")
    public ResponseEntity<List<TaskDto>> searchTaskByTitle(@PathVariable String title){
        return ResponseEntity.ok(adminService.searchTaskByTitle(title));
    }
}
