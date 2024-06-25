package com.Gautam.Task_SpringBoot.Repository;

import com.Gautam.Task_SpringBoot.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
