package com.example.api.dto;

import java.util.List;

import lombok.Data;

@Data
public class GroupChatRequest {
    private List<Long> userId;
    private String chat_name;
    private String chat_image;
}
