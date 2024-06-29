package com.Gautam.Task_SpringBoot.Repository;

import com.Gautam.Task_SpringBoot.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepos extends JpaRepository<Comment, Long> {

    List<Comment> findAllByTaskId(Long taskId);

}
