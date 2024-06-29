package com.Gautam.Task_SpringBoot.dto;

import com.Gautam.Task_SpringBoot.entity.Task;
import com.Gautam.Task_SpringBoot.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Data
public class CommentDto {


    private Long id;

    private String content;

    private Date createdAt;


    private Long taskId;

    private Long userId;

    private String postedBy;
}
